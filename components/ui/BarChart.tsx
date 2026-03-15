// ── Composant BarChart ────────────────────────────────────────────
// Séparé du rendu principal pour la lisibilité
import { COLORS } from "@/constants/theme";
import { View, Text } from "react-native";

type BarItem = {
	label: string;
	value: number;
	color: string;
};

type BarChartProps = {
	bars: BarItem[];
};

export default function BarChart({ bars }: BarChartProps) {
	// Le Max parmi toutes les barres = référence 100%
	// La barre la plus haute sera toujours pleine
	const maxVal = Math.max(...bars.map((b) => b.value)) || 1;

	return (
		<View className="w-full gap-3">
			{bars.map((bar) => {
				// Pourcentage de remplissage relatif au max
				const pct = (bar.value / maxVal) * 100;

				return (
					<View key={bar.label}>
						{/* Ligne label + valeur */}
						<View className="flex-row justify-between items-center mb-1.5">
							<Text
								className="text-xs uppercase tracking-wider font-medium"
								style={{ color: COLORS.textMuted }}
							>
								{bar.label}
							</Text>
							<Text className="text-xs font-bold" style={{ color: bar.color }}>
								{bar.value.toLocaleString("fr-FR", {
									style: "currency",
									currency: "EUR",
									maximumFractionDigits: 0,
								})}
							</Text>
						</View>

						{/* Barre horizontale */}
						<View
							className="w-full rounded-full overflow-hidden"
							style={{ height: 8, backgroundColor: COLORS.bgSage }}
						>
							<View
								className="h-full rounded-full"
								style={{
									width: `${pct}%`,
									backgroundColor: bar.color,
									minWidth: 8, // toujours visible même si valeur très faible
								}}
							/>
						</View>
					</View>
				);
			})}
		</View>
	);
}
