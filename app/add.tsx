import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useEmployesContext } from "@/context/EmployesContext";
import { Input, Button, Card } from "@/components/ui";
import { COLORS } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Add() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { addEmploye } = useEmployesContext();

	// 1. États des champs
	const [nom, setNom] = useState("");
	const [numemp, setNumemp] = useState("");
	const [salaire, setSalaire] = useState("");

	// 2. États des erreurs
	const [errors, setErrors] = useState({
		nom: "",
		numemp: "",
		salaire: "",
	});

	// 3. État loading
	const [loading, setLoading] = useState(false);

	// 4. Fonction validate
	const validate = (): boolean => {
		const newErrors = { nom: "", numemp: "", salaire: "" };
		let isValid = true;

		if (!nom.trim()) {
			newErrors.nom = "Le champ nom est requis";
			isValid = false;
		}
		if (!numemp.trim()) {
			newErrors.numemp = "Le champ numemp est requis";
			isValid = false;
		}
		if (!salaire.trim()) {
			newErrors.salaire = "Le champ salaire est requis";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	// 5. Fonction handleSubmit
	const handleSubmit = async () => {
		// On stoppe si la validation échoue
		if (!validate()) return;

		setLoading(true);

		await addEmploye({
			nom: nom.trim(),
			numemp: parseInt(numemp),
			salaire: parseFloat(salaire),
		});

		setLoading(false);

		// Retour à la liste après succès
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
				{/* Bouton retour + titre */}
				<Button
					label="← Retour"
					onPress={() => router.back()}
					variant="ghost"
					style={{ marginBottom: 16 }}
				/>
				<Text
					className="text-3xl font-bold mb-6"
					style={{ color: COLORS.textPrimary, letterSpacing: -1 }}
				>
					Nouvel employé
				</Text>

				{/* Formulaire dans une Card */}
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
						label="Numéro employé"
						value={numemp}
						onChangeText={setNumemp}
						placeholder="5"
						keyboardType="numeric"
						error={errors.numemp}
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
				{/* Bouton submit */}
				<Button
					label="Ajouter l'employé"
					onPress={handleSubmit}
					loading={loading}
					fullWidth
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
