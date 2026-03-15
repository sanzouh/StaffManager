// ── Composant DonutChart ──────────────────────────────────────────
// SVG natif via react-native-svg
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { COLORS } from "@/constants/theme";
import { View, Text } from "react-native";

type DonutSlice = {
	label: string; // nom de l'employé
	value: number; // salaire de l'employé
	color: string;
};

type DonutChartProps = {
	slices: DonutSlice[];
	centerLabel: string; // texte principal au centre
	centerSub: string; // texte secondaire au centre
};

export default function DonutChart({
	slices,
	centerLabel,
	centerSub,
}: DonutChartProps) {
	const SIZE = 180;
	const STROKE = 26;
	const RADIUS = (SIZE - STROKE) / 2;
	const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
	const cx = SIZE / 2;
	const cy = SIZE / 2;

	// Total pour calculer la part de chaque slice
	const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;

	// Calcul des offsets pour chaque slice
	// strokeDashoffset décale le début du trait sur le cercle
	let cumulativePct = 0;

	return (
		<View className="items-center">
			<Svg width={SIZE} height={SIZE}>
				{/* Track de fond */}
				<Circle
					cx={cx}
					cy={cy}
					r={RADIUS}
					fill="none"
					stroke={COLORS.bgSage}
					strokeWidth={STROKE}
				/>

				{slices.map((slice, i) => {
					// Part de CE salarié dans le total
					const pct = slice.value / total;
					const dashLength = pct * CIRCUMFERENCE;
					// -90° pour partir du haut (par défaut SVG part à droite)
					const offset =
						CIRCUMFERENCE * (1 - cumulativePct) + CIRCUMFERENCE * 0.25;
					cumulativePct += pct;

					return (
						<Circle
							key={i}
							cx={cx}
							cy={cy}
							r={RADIUS}
							fill="none"
							stroke={slice.color}
							strokeWidth={STROKE}
							strokeDasharray={`${dashLength} ${CIRCUMFERENCE - dashLength}`}
							strokeDashoffset={offset}
							strokeLinecap="round"
						/>
					);
				})}

				{/* Texte central */}
				<SvgText
					x={cx}
					y={cy - 8}
					textAnchor="middle"
					fontSize={16}
					fontWeight="bold"
					fill={COLORS.textPrimary}
				>
					{centerLabel}
				</SvgText>
				<SvgText
					x={cx}
					y={cy + 10}
					textAnchor="middle"
					fontSize={10}
					fill={COLORS.textMuted}
				>
					{centerSub}
				</SvgText>
			</Svg>

			{/* Légende */}
			<View className="flex-row flex-wrap justify-center gap-3 mt-3">
				{slices.map((slice) => (
					<View key={slice.label} className="flex-row items-center gap-1.5">
						<View
							className="w-2 h-2 rounded-full"
							style={{ backgroundColor: slice.color }}
						/>
						<Text className="text-xs" style={{ color: COLORS.textSecondary }}>
							{slice.label} ({slice.value})
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}
