export const COLORS = {
	// Backgrounds
	bgSage: "#E8EDE6",
	bgWhite: "#FFFFFF",
	bgCard: "#FFFFFF",

	// Text
	textPrimary: "#1A1A1A",
	textSecondary: "#6B7280",
	textMuted: "#9CA3AF",

	// Accents
	accentGreen: "#7A9E6E",
	accentYellow: "#F5C842",
	accentRed: "#E05A4E",

	// Observation badges
	obsGrand: { bg: "#DFF0D8", text: "#4A7C3F" },
	obsMoyen: { bg: "#FEF9C3", text: "#92701A" },
	obsMediocre: { bg: "#FDE8E8", text: "#B91C1C" },

	// Borders
	border: "#E5E7EB",
	borderLight: "#F3F4F6",
} as const;

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
	xxl: 32,
	xxxl: 48,
} as const;

export const RADIUS = {
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 28,
	full: 9999,
} as const;

export const SHADOW = {
	card: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.06,
		shadowRadius: 12,
		elevation: 3,
	},
	soft: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.04,
		shadowRadius: 6,
		elevation: 2,
	},
} as const;

export const SALAIRE_MAX = 5000;
