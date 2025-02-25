import { useThemeShadows } from "@/hooks/useThemeShadows";
import { View, type ViewProps, type ViewStyle } from "react-native";

type Props = ViewProps;

export function Card({ style, ...rest }: Props) {
     const shadowStyle = useThemeShadows();

    return <View
        style={[style, styles , shadowStyle]}
        {...rest}
    />
}

const styles = {
  padding: 10,
} satisfies ViewStyle