// hooks/useEmployes.ts
import { useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import type {
	Employe,
	EmployeInsert,
	EmployeUpdate,
	EmployeWithObs,
	Observation,
} from "@/types/employe";

// --- Fonction utilitaire pure (hors du hook) ---
export const getObservation = (salaire: number): Observation => {
	// médiocre si < 1000, moyen entre 1000 et 5000, grand si > 5000
	if (salaire < 1000) return "médiocre";
	if (salaire <= 5000) return "moyen";
	return "grand";
};

export const useEmployes = () => {
	// 1. État de la liste
	const [employes, setEmployes] = useState<Employe[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null); //Pour gérer les erreurs

	// 2. Fetch tous les employés
	const fetchEmployes = useCallback(async () => {
		// à toi : setLoading, appel supabase select, setEmployes, gérer l'erreur
		setLoading(true);
		setError(null); // ← reset l'erreur précédente

		const { data, error } = await supabase.from("employe").select("*");

		if (error) {
			setError(error.message);
		} else {
			setEmployes(data ?? []); //si ce qui est à gauche est null ou undefined, utilise ce qui est à droite
		}

		setLoading(false);
	}, []);

	// 3. Ajouter un employé
	const addEmploye = useCallback(
		async (data: EmployeInsert) => {
			// à toi : insert dans supabase puis refetch
			const { error } = await supabase.from("employe").insert(data);

			error ? setError(error.message) : await fetchEmployes();
		},
		[fetchEmployes],
	);

	// 4. Modifier un employé
	const updateEmploye = useCallback(
		async (numemp: number, data: EmployeUpdate) => {
			const { error } = await supabase
				.from("employe")
				.update(data)
				.eq("numemp", numemp);

			if (error) setError(error.message);
			else await fetchEmployes();
		},
		[fetchEmployes],
	);

	// 5. Supprimer un employé
	const removeEmploye = useCallback(
		async (numemp: number) => {
			const { error } = await supabase
				.from("employe")
				.delete()
				.eq("numemp", numemp);

			if (error) setError(error.message);
			else await fetchEmployes();
		},
		[fetchEmployes],
	);

	// 6. Calculs stats (useMemo car valeur dérivée de employes)
	const stats = useMemo(
		() => ({
			total: employes.reduce((sum, e) => sum + e.salaire, 0),
			min: employes.length ? Math.min(...employes.map((e) => e.salaire)) : 0,
			max: employes.length ? Math.max(...employes.map((e) => e.salaire)) : 0,
			count: employes.length,
		}),
		[employes],
	);

	// 7. Liste enrichie avec observation
	const withObs: EmployeWithObs[] = useMemo(() => {
		return employes.map((e) => ({
			...e,
			observation: getObservation(e.salaire),
		}));
	}, [employes]);

	return {
		employes,
		withObs,
		loading,
		error,
		fetchEmployes,
		addEmploye,
		updateEmploye,
		removeEmploye,
		stats,
	};
};
