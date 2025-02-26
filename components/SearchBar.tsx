import { ThemedView } from './ThemedView';
import { TextInput, StyleSheet } from 'react-native';
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

type Props = {
    value: string;
    onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
    const bgColor = useThemeColor({}, "background");
    const color = useThemeColor({ light: Colors.dark.background, dark: Colors.light.background }, "text");
    const theme = useColorScheme();
    const isDarkMode = theme === 'dark';

    const containerStyle = [
        styles.container,
        {
            backgroundColor: bgColor,
            borderColor: color
        }
    ];

    const inputStyle = [
        styles.input,
        {
            color: color,
        }
    ];

    const placeholderTextColor = isDarkMode ? '#aaa' : '#666';

    return (
        <ThemedView style={containerStyle}>
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Recherche..."
                placeholderTextColor={placeholderTextColor}
                style={inputStyle}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 15,
        borderWidth: 1,
        marginVertical: 4,
        width: '100%',
    },
    input: {
        flex: 1,
        fontSize: 14,
        padding: 15
    },
});
