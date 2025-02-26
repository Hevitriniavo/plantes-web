import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import Feather from "react-native-vector-icons/Feather"; 
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";

export default function TopScreen() {
  const router = useRouter();
  const bgColor = useThemeColor({}, "background");
  const brColor = useThemeColor(
    { light: Colors.dark.background, dark: Colors.light.background },
    "background"
  );
  const theme = useColorScheme();

  return (
    <BlurView intensity={50} tint={theme == "light" ? 'light': 'dark'} style={[styles.container, { backgroundColor: bgColor, borderBottomColor: brColor }]}>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/")}>
        <Feather name="home" size={28} color={brColor} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: brColor }]}>Meilleure plante</Text>

      <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/settings")}>
        <Feather name="settings" size={28} color={brColor} />
      </TouchableOpacity>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 10,
  },
});
