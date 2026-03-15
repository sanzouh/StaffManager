import { View } from "react-native";
import { SHADOW } from "@/constants/theme";

type CardProps = {
	children: React.ReactNode;
	className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
	return (
		<View
			className={`bg-white rounded-2xl p-4 border border-gray-100 ${className}`}
			style={SHADOW.card}
		>
			{children}
		</View>
	);
}
