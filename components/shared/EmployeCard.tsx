import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/theme";
import { EmployeWithObs } from "@/types/employe";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import { SALAIRE_MAX } from "@/constants/theme";

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
	// Progress bar normalisée sur 5 000 € (salaire max attendu)
	const progress = Math.min(employe.salaire / SALAIRE_MAX, 1);

	const progressColor =
		employe.observation === "grand"
			? COLORS.accentGreen
			: employe.observation === "moyen"
				? COLORS.accentYellow
				: COLORS.accentRed;

	return (
		<Card className="mb-3 p-0 overflow-hidden">
			{/* Bande colorée en haut selon l'observation */}
			<View className="h-1 w-full" style={{ backgroundColor: progressColor }} />

			<View className="p-4">
				{/* Header */}
				<View className="flex-row items-center justify-between mb-4">
					<View className="flex-row items-center gap-3">
						<Avatar nom={employe.nom} size={42} />
						<View>
							<Text
								className="text-sm font-semibold"
								style={{ color: COLORS.textPrimary }}
							>
								{employe.nom}
							</Text>
							<Text
								className="text-xs mt-0.5"
								style={{ color: COLORS.textMuted }}
							>
								{employe.numemp}
							</Text>
						</View>
					</View>

					{/* Actions */}
					<View className="flex-row gap-2">
						<TouchableOpacity
							onPress={onEdit}
							activeOpacity={0.7}
							className="w-8 h-8 rounded-xl items-center justify-center"
							style={{ backgroundColor: "#F3F4F6" }}
						>
							<Text style={{ color: COLORS.textSecondary, fontSize: 14 }}>
								✎
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onDelete}
							activeOpacity={0.7}
							className="w-8 h-8 rounded-xl items-center justify-center"
							style={{ backgroundColor: COLORS.obsMediocre.bg }}
						>
							<Text style={{ color: COLORS.accentRed, fontSize: 14 }}>✕</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Divider */}
				<View
					className="h-px mb-4"
					style={{ backgroundColor: COLORS.borderLight }}
				/>

				{/* Stats row */}
				<View className="flex-row justify-between mb-4">
					{[
						{
							label: "Salaire",
							value: `${employe.salaire.toLocaleString("fr-FR", {
								style: "currency",
								currency: "EUR",
							})}`,
						},
						{ label: "Numéro", value: employe.numemp.toString() },
					].map((item) => (
						<View key={item.label}>
							<Text
								className="text-xs uppercase tracking-wider mb-1"
								style={{ color: COLORS.textMuted }}
							>
								{item.label}
							</Text>
							<Text
								className="text-sm font-semibold"
								style={{ color: COLORS.textPrimary }}
							>
								{item.value}
							</Text>
						</View>
					))}

					{/* Badge aligné à droite */}
					<View>
						<Text
							className="text-xs uppercase tracking-wider mb-1"
							style={{ color: COLORS.textMuted }}
						>
							Niveau
						</Text>
						<Badge observation={employe.observation} />
					</View>
				</View>

				{/* Progress bar */}
				<View>
					<View className="flex-row justify-between mb-1.5">
						<Text className="text-xs" style={{ color: COLORS.textMuted }}>
							Niveau salarial
						</Text>
						<Text
							className="text-xs font-semibold"
							style={{ color: progressColor }}
						>
							{Math.round(progress * 100)}%
						</Text>
					</View>
					<View
						className="h-1.5 rounded-full overflow-hidden"
						style={{ backgroundColor: COLORS.borderLight }}
					>
						<View
							className="h-full rounded-full"
							style={{
								width: `${progress * 100}%`,
								backgroundColor: progressColor,
							}}
						/>
					</View>
				</View>
			</View>
		</Card>
	);
}
