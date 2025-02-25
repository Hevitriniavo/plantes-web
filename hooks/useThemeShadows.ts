import { useColorScheme } from "react-native";
import { Shadows } from "@/constants/Shadows";

interface ShadowProps {
  shadowOpacity?: number;
  shadowOffset?: { width: number; height: number };
  shadowRadius?: number;
  elevation?: number;
}

export const useThemeShadows = (props: ShadowProps = {}) => {
  const theme = useColorScheme() ?? "light";
  const shadowStyle = theme === "dark" ? Shadows.dark : Shadows.light;

  return {
    ...shadowStyle,
    ...props,
  };
};
