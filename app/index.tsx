import React from 'react';
import { StyleSheet, FlatList, Image, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetchQuery } from '@/hooks/useFetchQuery';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useOrientation } from '@/hooks/useOrientation';
import { Colors } from '@/constants/Colors';
import * as ScreenOrientation from 'expo-screen-orientation';
import { PlanteCard } from '@/components/PlanteCard';

export default function Index() {
  const { data: plantes, isLoading } = useFetchQuery("/plantes");
  const { orientation } = useOrientation();

  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const cardColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.loaderContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  const numColumns =
  orientation?.value === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
  orientation?.value === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ? 4
    : orientation?.value === ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientation?.value === ScreenOrientation.Orientation.PORTRAIT_DOWN
    ? 2
    : 3;

  const key = `grid-${numColumns}`;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <FlatList
        data={plantes}
        numColumns={numColumns}
        key={key} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlanteCard
            imageUrl={item.imageUrl}
            name={item.name}
            description={item.description}
            cardColor={cardColor}
            textColor={textColor}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});