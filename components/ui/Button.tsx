import {
	Text,
	ActivityIndicator,
	TouchableOpacity,
	ViewStyle,
} from "react-native";
import { COLORS } from "@/constants/theme";

const VARIANTS = {
	primary: { bg: "#1A1A1A", text: "#FFFFFF", border: false },
	secondary: { bg: "#F5C842", text: "#1A1A1A", border: false },
	ghost: { bg: "transparent", text: "#1A1A1A", border: true },
	danger: { bg: COLORS.obsMediocre.bg, text: COLORS.accentRed, border: false },
};

type ButtonProps = {
	label: string;
	onPress: () => void;
	variant?: "primary" | "secondary" | "ghost" | "danger";
	loading?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	style?: ViewStyle;
};

export default function Button({
	label,
	onPress,
	variant = "primary",
	loading = false,
	disabled = false,
	fullWidth = false,
	style,
}: ButtonProps) {
	const config = VARIANTS[variant];

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={loading || disabled}
			activeOpacity={0.75}
			className="rounded-2xl px-6 py-4 items-center justify-center"
			style={{
				backgroundColor: config.bg,
				borderWidth: config.border ? 1.5 : 0,
				borderColor: config.border ? COLORS.border : undefined,
				alignSelf: fullWidth ? "stretch" : "flex-start",
				opacity: disabled || loading ? 0.45 : 1,
				...style,
			}}
		>
			{loading ? (
				<ActivityIndicator color={config.text} />
			) : (
				<Text className="text-sm font-semibold" style={{ color: config.text }}>
					{label}
				</Text>
			)}
		</TouchableOpacity>
	);
}
