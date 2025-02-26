import { type ViewProps, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = ViewProps;

export function RootView({ style, ...rest }: Props) {
    const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
    return (
        <SafeAreaView
            style={[styles.container, style, { backgroundColor }]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1, 
    },
});
