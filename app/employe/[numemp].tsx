import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { Input, Button, Card } from "@/components/ui";
import { COLORS } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEmployesContext } from "@/context/EmployesContext";

export default function EditEmploye() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	// Récupère le paramètre dynamique de l'URL
	// /employe/42 → numemp = "42"
	const { numemp } = useLocalSearchParams<{ numemp: string }>();

	const { getById, updateEmploye } = useEmployesContext();

	// 1. États des champs — vides au départ, remplis par useEffect
	const [nom, setNom] = useState("");
	const [salaire, setSalaire] = useState("");

	const [errors, setErrors] = useState({
		nom: "",
		salaire: "",
	});

	const [loading, setLoading] = useState(false);

	// 4. Pré-remplissage des champs
	// useEffect se déclenche quand numemp est disponible
	// On cherche l'employé dans le contexte (pas de requête Supabase)
	// car on a déjà toutes les données en mémoire
	useEffect(() => {
		if (!numemp) return;

		const employe = getById(parseInt(numemp));

		if (!employe) {
			// L'employé n'existe pas → retour à la liste
			router.back();
			return;
		}

		// Pré-remplissage avec les données existantes
		setNom(employe.nom);
		setSalaire(employe.salaire.toString());
	}, [numemp]); // se re-déclenche si numemp change

	const validate = (): boolean => {
		const newErrors = { nom: "", salaire: "" };
		let isValid = true;

		if (!nom.trim()) {
			newErrors.nom = "Le nom est requis";
			isValid = false;
		}

		const salaireNum = parseFloat(salaire);
		if (!salaire || isNaN(salaireNum) || salaireNum < 0) {
			newErrors.salaire = "Entrez un salaire valide (≥ 0)";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async () => {
		if (!validate()) return;

		setLoading(true);
		await updateEmploye(parseInt(numemp), {
			nom: nom.trim(),
			salaire: parseFloat(salaire),
		});
		setLoading(false);

		router.back();
	};

	return (
		<KeyboardAvoidingView
			className="flex-1"
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingTop: insets.top + 16,
					paddingBottom: 40,
				}}
				style={{ backgroundColor: COLORS.bgSage }}
			>
				{/* Bouton retour */}
				<Button
					label="← Retour"
					onPress={() => router.back()}
					variant="ghost"
					style={{ marginBottom: 16 }}
				/>

				{/* Titre avec le nom de l'employé */}
				<Text
					className="text-3xl font-bold mb-6"
					style={{ color: COLORS.textPrimary, letterSpacing: -1 }}
				>
					Modifier{"\n"}
					<Text style={{ color: COLORS.accentGreen }}>{nom}</Text>
				</Text>

				{/* Numemp affiché en lecture seule — on ne le modifie pas */}
				<Card className="mb-4 p-4">
					<Text
						className="text-xs uppercase tracking-wider mb-1"
						style={{ color: COLORS.textMuted }}
					>
						Numéro employé
					</Text>
					<Text
						className="text-sm font-semibold"
						style={{ color: COLORS.textSecondary }}
					>
						#{numemp} — non modifiable
					</Text>
				</Card>

				{/* Formulaire */}
				<Card className="mb-4">
					<Input
						label="Nom complet"
						value={nom}
						onChangeText={setNom}
						placeholder="Jean Dupont"
						autoCapitalize="words"
						error={errors.nom}
					/>
					<Input
						label="Salaire (€)"
						value={salaire}
						onChangeText={setSalaire}
						placeholder="2 500"
						keyboardType="numeric"
						error={errors.salaire}
						hint="Médiocre < 1000 · Moyen 1000–5000 · Grand > 5000"
					/>
				</Card>

				{/* Actions */}
				<Button
					label="Enregistrer les modifications"
					onPress={handleSubmit}
					loading={loading}
					fullWidth
				/>
				<Button
					label="Annuler"
					onPress={() => router.back()}
					variant="ghost"
					fullWidth
					style={{ marginTop: 8 }}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
