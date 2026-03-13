import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

// 2. Props typées automatiquement depuis RootStackParams
type Props = NativeStackScreenProps<RootStackParams, "Liste">;

const employes = [
	{ id: 1, nom: "Dupont", salaire: 800 },
	{ id: 2, nom: "Martin", salaire: 3000 },
	{ id: 3, nom: "Bernard", salaire: 6000 },
];

export default function ListScreen({ navigation }: Props) {
	return (
		<FlatList
			data={employes}
			keyExtractor={(e) => e.id.toString()}
			renderItem={({ item }) => (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("Detail", {
							id: item.id,
							nom: item.nom,
						})
					}
				>
					<Text>
						{item.nom} — {item.salaire} DA
					</Text>
				</TouchableOpacity>
			)}
		/>
	);
}
