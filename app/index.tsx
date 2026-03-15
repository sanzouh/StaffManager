import { Badge, Card, Button, Avatar, Input } from "@/components/ui";
import { Text, View, ScrollView } from "react-native";
import EmployeCard from "@/components/shared/EmployeCard";

// Données fictives qui respectent le type EmployeWithObs
const mockEmploye = {
	numemp: 1,
	nom: "Sophia Lemaire",
	salaire: 3200,
	observation: "moyen" as const,
};

export default function Page() {
	return (
		<>
			<Badge observation="grand" />

			<Avatar nom="Drago Malfoy" size={40} />

			<Button
				label="Se connecter"
				onPress={() => {
					console.log("Hello");
				}}
			/>

			<Input label="Veuillez entrer votre nom" />

			<Card>
				<Text>Carte simple</Text>
			</Card>

			<Card className="mt-4 p-6">
				<Text className="text-lg font-semibold">
					Carte avec plus de padding
				</Text>
				<Text className="text-xs text-gray-400 mt-1">Et un sous-titre</Text>
			</Card>

			<ScrollView className="flex-1 p-4" style={{ backgroundColor: "#E8EDE6" }}>
				<EmployeCard
					employe={mockEmploye}
					onEdit={() => console.log("edit")}
					onDelete={() => console.log("delete")}
				/>
			</ScrollView>
		</>
	);
}
