// src/components/PlantCard.tsx
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card } from './Card';
import { ThemedText } from './ThemedText';

interface PlantCardProps {
  imageUrl: string;
  name: string;
  description: string;
  cardColor: string;
  textColor: string;
}

export function PlanteCard({ imageUrl, name, description, cardColor, textColor }: PlantCardProps) {
  return (
    <Card style={[styles.card, { backgroundColor: cardColor }]}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <ThemedText style={[styles.plantName, { color: textColor }]}>{name}</ThemedText>
      <ThemedText style={[styles.description, { color: textColor }]}>{description}</ThemedText>
    </Card>
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

