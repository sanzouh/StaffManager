import { supabase } from "@/utils/supabase";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	useEffect(() => {
		async function test() {
			const { data, error } = await supabase.from("employe").select("*");
			console.log(data, error);
		}
		test();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Hello !</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
