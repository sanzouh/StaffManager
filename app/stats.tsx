import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEmployesContext } from "@/context/EmployesContext";
import { Card, BarChart, DonutChart } from "@/components/ui";
import { COLORS } from "@/constants/theme";

// ── Types locaux ──────────────────────────────────────────────────
type ChartType = "donut" | "bar";

// Chaque employé = une slice avec son salaire
// On génère une couleur par index
const SLICE_COLORS = [
	COLORS.accentGreen,
	COLORS.accentYellow,
	COLORS.accentRed,
	"#A78BFA", // violet
	"#60A5FA", // bleu
];

// ── Écran principal ───────────────────────────────────────────────
export default function Stats() {
	const insets = useSafeAreaInsets();
	const { withObs, stats } = useEmployesContext();
	const [chartType, setChartType] = useState<ChartType>("donut");

	// Camembert — répartition par observation
	const donutSlices = [
		{
			label: "Médiocre",
			value: withObs.filter((e) => e.observation === "médiocre").length,
			color: COLORS.accentRed,
		},
		{
			label: "Moyen",
			value: withObs.filter((e) => e.observation === "moyen").length,
			color: COLORS.accentYellow,
		},
		{
			label: "Grand",
			value: withObs.filter((e) => e.observation === "grand").length,
			color: COLORS.accentGreen,
		},
	].filter((s) => s.value > 0); // on cache les catégories vides

	// On trouve l'employé correspondant au min et au max
	const employeMin = withObs.find((e) => e.salaire === stats.min);
	const employeMax = withObs.find((e) => e.salaire === stats.max);

	// Histogramme — Max / Moy / Min uniquement
	// Total exclu car non comparable aux salaires individuels
	const barItems = [
		{
			label: `Max (${employeMax?.nom.split(" ")[0] ?? ""})`,
			value: stats.max,
			color: COLORS.accentGreen, // vert = grand
		},
		{
			label: "Moyenne",
			value: stats.count ? Math.round(stats.total / stats.count) : 0,
			color: COLORS.accentYellow, // jaune = moyen
		},
		{
			label: `Min (${employeMin?.nom.split(" ")[0] ?? ""})`,
			value: stats.min,
			color: COLORS.accentRed, // rouge = médiocre
		},
	];

	// Détail des stats pour les cards en bas
	const summaryItems = [
		{ label: "Salaire maximum", value: stats.max, color: COLORS.accentGreen },
		{
			label: "Salaire moyen",
			value: stats.count ? Math.round(stats.total / stats.count) : 0,
			color: COLORS.accentYellow,
		},
		{ label: "Salaire minimum", value: stats.min, color: COLORS.accentRed },
	];

	return (
		<ScrollView
			className="flex-1"
			style={{ backgroundColor: COLORS.bgSage }}
			contentContainerStyle={{
				paddingHorizontal: 16,
				paddingTop: insets.top + 16,
				paddingBottom: 100,
			}}
			showsVerticalScrollIndicator={false}
		>
			{/* Titre */}
			<Text
				className="text-3xl font-bold mb-1"
				style={{ color: COLORS.textPrimary, letterSpacing: -1 }}
			>
				Statistiques
			</Text>
			<Text className="text-sm mb-6" style={{ color: COLORS.textSecondary }}>
				Vue d'ensemble des salaires
			</Text>

			<Card className="mb-4">
				<Text
					className="text-xs uppercase tracking-wider mb-1"
					style={{ color: COLORS.textMuted }}
				>
					Masse salariale totale
				</Text>
				<Text
					className="text-3xl font-bold"
					style={{ color: COLORS.textPrimary, letterSpacing: -1 }}
				>
					{stats.total.toLocaleString("fr-FR", {
						style: "currency",
						currency: "EUR",
						maximumFractionDigits: 0,
					})}
				</Text>
				<Text className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
					{stats.count} employé{stats.count !== 1 ? "s" : ""}
				</Text>
			</Card>

			{/* Toggle bar/donut */}
			<View
				className="flex-row bg-white rounded-2xl p-1 gap-1 mb-4"
				style={{ borderWidth: 0.5, borderColor: COLORS.border }}
			>
				{(["donut", "bar"] as ChartType[]).map((type) => (
					<TouchableOpacity
						key={type}
						onPress={() => setChartType(type)}
						activeOpacity={0.8}
						className="flex-1 py-2.5 rounded-xl items-center"
						style={{
							backgroundColor:
								chartType === type ? COLORS.textPrimary : "transparent",
						}}
					>
						<Text
							className="text-xs font-semibold"
							style={{ color: chartType === type ? "#fff" : COLORS.textMuted }}
						>
							{type === "donut" ? "◎ Camembert" : "▐ Histogramme"}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* Card chart */}
			<Card className="mb-4 items-center">
				<Text
					className="text-xs uppercase tracking-wider mb-4 self-start"
					style={{ color: COLORS.textMuted }}
				>
					{chartType === "donut"
						? "Répartition par niveau"
						: "Comparaison salaires"}
				</Text>

				{chartType === "donut" ? (
					<DonutChart
						slices={donutSlices}
						// Centre : nombre total d'employés
						centerLabel={stats.count.toString()}
						centerSub="employés"
					/>
				) : (
					<BarChart bars={barItems} />
				)}
			</Card>

			{/* Cards détail */}
			<Text
				className="text-xs uppercase tracking-wider mb-3"
				style={{ color: COLORS.textMuted }}
			>
				Détail
			</Text>

			{summaryItems.map((item) => (
				<Card key={item.label} className="mb-2">
					<View className="flex-row items-center gap-3">
						{/* Dot coloré */}
						<View
							className="w-2.5 h-2.5 rounded-full"
							style={{ backgroundColor: item.color }}
						/>
						<Text
							className="flex-1 text-sm"
							style={{ color: COLORS.textSecondary }}
						>
							{item.label}
						</Text>
						<Text className="text-base font-bold" style={{ color: item.color }}>
							{item.value.toLocaleString("fr-FR", {
								style: "currency",
								currency: "EUR",
								maximumFractionDigits: 0,
							})}
						</Text>
					</View>
				</Card>
			))}

			{/* Card nombre d'employés */}
			<Card>
				<View className="flex-row items-center gap-3">
					<View
						className="w-2.5 h-2.5 rounded-full"
						style={{ backgroundColor: COLORS.textPrimary }}
					/>
					<Text
						className="flex-1 text-sm"
						style={{ color: COLORS.textSecondary }}
					>
						Nombre d'employés
					</Text>
					<Text
						className="text-base font-bold"
						style={{ color: COLORS.textPrimary }}
					>
						{stats.count}
					</Text>
				</View>
			</Card>
		</ScrollView>
	);
}
