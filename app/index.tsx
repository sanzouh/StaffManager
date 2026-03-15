import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Text, View } from "react-native";

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
		</>
	);
}
