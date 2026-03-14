import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
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
		</>
	);
}
