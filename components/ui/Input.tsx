import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { COLORS } from "@/constants/theme";

type InputProps = {
	label: string;
	error?: string;
	hint?: string;
} & React.ComponentProps<typeof TextInput>; // ← hérite de TOUS les props natifs de TextInput
// (value, onChangeText, placeholder, keyboardType, etc.)
// pour ne pas les réécrire un par un

export default function Input({ label, error, hint, ...props }: InputProps) {
	const [focused, setFocused] = useState(false);

	return (
		<View className="mb-4">
			<Text
				className="text-xs font-semibold mb-2"
				style={{ color: COLORS.textSecondary }}
			>
				{label}
			</Text>

			<TextInput
				{...props} // ← spread de tous les props natifs (value, onChangeText...)
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				placeholderTextColor={COLORS.textMuted}
				className="rounded-2xl px-4 py-3 text-sm font-medium"
				style={{
					backgroundColor: COLORS.bgWhite,
					color: COLORS.textPrimary,
					borderWidth: 1.5,
					// couleur de bordure : rouge si erreur, vert si focus, gris sinon
					borderColor: error
						? COLORS.accentRed
						: focused
							? COLORS.accentGreen
							: COLORS.border,
				}}
			/>

			{/* Erreur ou hint — l'un ou l'autre, jamais les deux */}
			{error ? (
				<Text
					className="text-xs mt-1 font-medium"
					style={{ color: COLORS.accentRed }}
				>
					{error}
				</Text>
			) : hint ? (
				<Text className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
					{hint}
				</Text>
			) : null}
		</View>
	);
}
