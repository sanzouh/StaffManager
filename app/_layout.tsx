import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, Tabs } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useEmployes } from "@/hooks/useEmployes";
import { EmployesContext } from "@/context/EmployesContext";
import { COLORS } from "@/constants/theme";
import "@/global.css";

function CustomTabBar({ state, navigation }: any) {
	const insets = useSafeAreaInsets();
	const tabs = [
		{ name: "index", icon: "☰", label: "Employés" },
		{ name: "stats", icon: "◎", label: "Stats" },
	];

	return (
		<View
			style={{ paddingBottom: insets.bottom, backgroundColor: "transparent" }}
			className="absolute bottom-4 left-4 right-4"
		>
			<View
				className="flex-row bg-white rounded-3xl p-1.5 gap-1.5"
				style={{
					shadowColor: "#000",
					shadowOpacity: 0.08,
					shadowRadius: 16,
					elevation: 8,
				}}
			>
				{tabs.map((tab, i) => {
					const isFocused = state.index === i;
					return (
						<TouchableOpacity
							key={tab.name}
							onPress={() => navigation.navigate(tab.name)}
							activeOpacity={0.8}
							className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-2xl"
							style={{
								backgroundColor: isFocused ? COLORS.textPrimary : "transparent",
							}}
						>
							<Text
								style={{
									color: isFocused ? "#fff" : COLORS.textMuted,
									fontSize: 15,
								}}
							>
								{tab.icon}
							</Text>
							<Text
								className="text-sm font-semibold"
								style={{ color: isFocused ? "#fff" : COLORS.textMuted }}
							>
								{tab.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

export default function RootLayout() {
	const store = useEmployes();

	// Charger les employés au démarrage
	useEffect(() => {
		store.fetchEmployes();
	}, []);

	return (
		// Tout ce qui est à l'intérieur du Provider peut accéder à store via useEmployesContext()
		<EmployesContext.Provider value={store}>
			<Tabs
				tabBar={(props) => <CustomTabBar {...props} />}
				screenOptions={{ headerShown: false }}
			>
				<Tabs.Screen name="index" />
				<Tabs.Screen name="stats" />
			</Tabs>
		</EmployesContext.Provider>
	);
}
