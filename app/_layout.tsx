import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import "@/global.css";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<Stack>
				<Stack.Screen name="index" options={{ title: "Employés" }} />
			</Stack>
		</SafeAreaProvider>
	);
}
