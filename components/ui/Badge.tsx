import { View, Text, StyleSheet } from "react-native";
import { Observation } from "@/types/employe";
import { COLORS, RADIUS } from "@/constants/theme";

const OBS_CONFIG = {
	médiocre: { bg: COLORS.obsMediocre.bg, text: COLORS.obsMediocre.text },
	moyen: { bg: COLORS.obsMoyen.bg, text: COLORS.obsMoyen.text },
	grand: { bg: COLORS.obsGrand.bg, text: COLORS.obsGrand.text },
};

type ObsBadgeProps = {
	observation: Observation;
};

export default function Badge({ observation }: ObsBadgeProps) {
	const config = OBS_CONFIG[observation];
	return (
		<View
			className="self-start rounded-full px-3 py-1"
			style={{ backgroundColor: config.bg }}
		>
			<Text
				className="text-xs font-semibold capitalize"
				style={{ color: config.text }}
			>
				{observation}
			</Text>
		</View>
	);
}

/* const styles = StyleSheet.create({
	badge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: RADIUS.full,
		alignSelf: "flex-start",
	},
	text: {
		fontSize: 11,
		fontWeight: "600",
		textTransform: "capitalize",
	},
}); */
