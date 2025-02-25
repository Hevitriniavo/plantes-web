import { ViewStyle } from "react-native";

export const Shadows: Record<"light" | "dark", ViewStyle> = {
    light: {
        shadowOpacity: 0.2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2
    },
    dark: {
        shadowOpacity: 0.3,
        shadowColor: "#FFF",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 4
    }
};
