import { supabase } from "@/utils/supabase";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";

export default function App() {
	/* 	useEffect(() => {
		async function test() {
			const { data, error } = await supabase.from("employe").select("*");
			console.log(data, error);
		}
		test();
	}, []); */

	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="text-xl font-bold text-blue-500">
				Welcome to Nativewind!
			</Text>
		</View>
	);
}
