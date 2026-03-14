import { View, Text } from "react-native";

const AVATAR_COLORS = [
	{ bg: "#DFF0D8", text: "#4A7C3F" },
	{ bg: "#FEF9C3", text: "#92701A" },
	{ bg: "#E0EAF8", text: "#2E5AA8" },
	{ bg: "#FDE8E8", text: "#B91C1C" },
	{ bg: "#F3E8FF", text: "#7C3AED" },
];

const getInitials = (nom: string): string => {
	// "Sophia Lemaire" → "SL"
	const initials = nom
		.split(" ") // → ["Sophia", "Lemaire"]
		.map((n) => n[0]) // → ["S", "L"]  (première lettre de chaque mot)
		.join("") // → "SL"
		.toUpperCase() // → "SL" (sécurité si minuscules)
		.slice(0, 2); // → "SL" (max 2 lettres, cas "Jean Marie Dupont")
	return initials;
};

const getAvatarColor = (nom: string) => {
	const index = nom.charCodeAt(0) % AVATAR_COLORS.length;
	return AVATAR_COLORS[index];
};

type AvatarProps = {
	nom: string;
	size?: number;
};

export default function Avatar({ nom, size = 44 }: AvatarProps) {
	const color = getAvatarColor(nom);
	const fontSize = size * 0.35;

	return (
		<View
			className="items-center justify-center rounded-xl"
			style={{
				backgroundColor: color.bg,
				width: size,
				height: size,
			}}
		>
			<Text className="semibold" style={{ color: color.text, fontSize }}>
				{getInitials(nom)}
			</Text>
		</View>
	);
}
