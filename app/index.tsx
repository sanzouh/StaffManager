import { Text, View, FlatList, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Badge, Card, Button, Avatar, Input } from "@/components/ui";
import EmployeCard from "@/components/shared/EmployeCard";
import { useEmployesContext } from "@/context/EmployesContext";
import { COLORS } from "@/constants/theme";

// Données fictives qui respectent le type EmployeWithObs
const mockEmploye = {
	numemp: 1,
	nom: "Sophia Lemaire",
	salaire: 3200,
	observation: "moyen" as const,
};

export default function Page() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	// On consomme le contexte global — pas besoin de refetch ici
	// _layout.tsx s'en est déjà occupé au démarrage
	const { withObs, removeEmploye, stats, loading } = useEmployesContext();

	return (
		<View>
			<FlatList
				data={withObs}
				keyExtractor={(item) => item.numemp.toString()}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 100, // espace pour la tab bar flottante
					paddingTop: insets.top + 16, // respect du notch
				}}
				// ── Header de la liste ─────────────────────────────────
				ListHeaderComponent={() => (
					<View>
						{/* Titre + bouton ajouter */}
						<View className="flex-row items-end justify-between mb-6">
							<View>
								<Text
									className="text-3xl font-bold"
									style={{ color: COLORS.textPrimary, letterSpacing: -1 }}
								>
									Employés
								</Text>
								<Text
									className="text-sm mt-1"
									style={{ color: COLORS.textSecondary }}
								>
									Gérez votre équipe
								</Text>
							</View>

							<Button
								label="+ Ajouter"
								onPress={() => router.push("/add")}
								variant="primary"
							/>
						</View>

						{/* Cartes stats : total, min, max */}
						<View className="flex-row gap-2 mb-6">
							{[
								{
									label: "Total",
									value: stats.total,
									color: COLORS.accentGreen,
								},
								{ label: "Min", value: stats.min, color: COLORS.accentYellow },
								{ label: "Max", value: stats.max, color: COLORS.accentRed },
							].map((stat) => (
								<Card key={stat.label} className="flex-1 p-3">
									{/* Dot coloré pour identifier visuellement la stat */}
									<View
										className="w-2 h-2 rounded-full mb-2"
										style={{ backgroundColor: stat.color }}
									/>
									<Text
										className="text-xs uppercase tracking-wider mb-1"
										style={{ color: COLORS.textMuted }}
									>
										{stat.label}
									</Text>
									<Text
										className="text-sm font-bold"
										style={{ color: stat.color }}
									>
										{stat.value.toLocaleString("fr-FR", {
											style: "currency",
											currency: "EUR",
											maximumFractionDigits: 0,
										})}
									</Text>
								</Card>
							))}
						</View>

						{/* Compteur employés */}
						<Text
							className="text-xs uppercase tracking-wider mb-3"
							style={{ color: COLORS.textMuted }}
						>
							{withObs.length} employé{withObs.length !== 1 ? "s" : ""}
						</Text>
					</View>
				)}
				// ── Chaque carte employé ───────────────────────────────
				renderItem={({ item }) => (
					<EmployeCard
						employe={item}
						onEdit={() => router.push(`/employe/${item.numemp}`)}
						onDelete={() => removeEmploye(item.numemp)}
					/>
				)}
				// ── État vide ──────────────────────────────────────────
				ListEmptyComponent={() => (
					<View className="items-center pt-20 gap-3">
						<Text style={{ fontSize: 40 }}>👥</Text>
						<Text
							className="text-lg font-semibold"
							style={{ color: COLORS.textPrimary }}
						>
							{loading ? "Chargement..." : "Aucun employé"}
						</Text>
						<Text
							className="text-sm text-center"
							style={{ color: COLORS.textMuted }}
						>
							{loading ? "" : "Commencez par en ajouter un"}
						</Text>
					</View>
				)}
			/>
		</View>
	);
}
