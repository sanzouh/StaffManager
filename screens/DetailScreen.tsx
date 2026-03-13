import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";
import { View, Text, Button } from "react-native";

type Props = NativeStackScreenProps<RootStackParams, "Detail">;

export default function DetailScreen({ route, navigation }: Props) {
	const { id, nom } = route.params;

	return (
		<View>
			<Text>
				Employé #{id} — {nom}
			</Text>
			<Button title="← Retour" onPress={() => navigation.goBack()} />
		</View>
	);
}
