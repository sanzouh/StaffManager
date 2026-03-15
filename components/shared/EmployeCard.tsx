import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/theme";
import { EmployeWithObs } from "@/types/employe";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";

type EmployeCardProps = {
	employe: EmployeWithObs;
	onEdit: () => void;
	onDelete: () => void;
};

export default function EmployeCard({
	employe,
	onEdit,
	onDelete,
}: EmployeCardProps) {
	// Progress bar normalisée sur 10 000 DA (salaire max attendu)
	const progress = Math.min(employe.salaire / 10000, 1);

	const progressColor =
		employe.observation === "grand"
			? COLORS.accentGreen
			: employe.observation === "moyen"
				? COLORS.accentYellow
				: COLORS.accentRed;

	return (
		<Card className="mb-3">
			{/* Header : avatar + infos + actions */}
			<View className="flex-row items-center mb-3">
				<Avatar nom={employe.nom} size={46} />

				<View className="flex-1 ml-3">
					<Text
						className="text-sm font-semibold"
						style={{ color: COLORS.textPrimary }}
					>
						{employe.nom}
					</Text>
					<Text className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>
						{employe.numemp}
					</Text>
				</View>

				{/* Boutons edit / delete */}
				<View className="flex-row gap-2">
					<TouchableOpacity
						onPress={onEdit}
						activeOpacity={0.7}
						className="w-8 h-8 rounded-xl items-center justify-center"
						style={{ backgroundColor: COLORS.bgSage }}
					>
						<Text style={{ color: COLORS.textSecondary }}>✎</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={onDelete}
						activeOpacity={0.7}
						className="w-8 h-8 rounded-xl items-center justify-center"
						style={{ backgroundColor: COLORS.obsMediocre.bg }}
					>
						<Text style={{ color: COLORS.accentRed }}>✕</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Meta : salaire + observation */}
			<View className="flex-row gap-6 mb-3">
				<View>
					<Text
						className="text-xs uppercase"
						style={{ color: COLORS.textMuted }}
					>
						Salaire
					</Text>
					<Text
						className="text-sm font-semibold mt-0.5"
						style={{ color: COLORS.textPrimary }}
					>
						{employe.salaire.toLocaleString("fr-FR")} DA
					</Text>
				</View>

				<View>
					<Text
						className="text-xs uppercase"
						style={{ color: COLORS.textMuted }}
					>
						Observation
					</Text>
					<View className="mt-0.5">
						<Badge observation={employe.observation} />
					</View>
				</View>
			</View>

			{/* Progress bar */}
			<View className="flex-row items-center gap-2">
				<View
					className="flex-1 h-1.5 rounded-full overflow-hidden"
					style={{ backgroundColor: COLORS.bgSage }}
				>
					<View
						className="h-full rounded-full"
						style={{
							width: `${progress * 100}%`,
							backgroundColor: progressColor,
						}}
					/>
				</View>
				<Text
					className="text-xs w-8 text-right"
					style={{ color: COLORS.textMuted }}
				>
					{Math.round(progress * 100)}%
				</Text>
			</View>
		</Card>
	);
}
