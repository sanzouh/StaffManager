import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "./screens/ListScreen";
import DetailScreen from "./screens/DetailScreen";
import "./global.css";

export type RootStackParams = {
	Liste: undefined; // pas de params
	Detail: { id: number; nom: string }; // params attendus
};

const Stack = createNativeStackNavigator<RootStackParams>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Liste">
				<Stack.Screen name="Liste" component={ListScreen} />
				<Stack.Screen name="Detail" component={DetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
