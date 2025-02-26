import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { Card } from './Card';
import { ThemedText } from './ThemedText';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { truncate } from '@/utils';

interface PlantCardProps {
  imageUrl: string;
  name: string;
  description: string;
  cardColor: string;
  textColor: string;
  id: number
}

export function PlanteCard({ imageUrl, name, description, cardColor, id, textColor }: PlantCardProps) {
  const backgroundColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'background');
  return (
    <Link href={{
      pathname: "/plantes/[id]", params: {
        id
      }
    }} asChild>
      <Pressable android_ripple={{ color: backgroundColor, foreground: true }} style={styles.card}>
        <Card style={[{ backgroundColor: cardColor }]}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <ThemedText style={[styles.plantName, { color: textColor }]}>{name}</ThemedText>
          <ThemedText style={[styles.description, { color: textColor }]}>{truncate(description, 35)}</ThemedText>
        </Card>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 90,
    borderRadius: 8,
  },
  plantName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 10,
  },
});

