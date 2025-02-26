import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyListMessageProps {
  searchValue: string;
  textColor: string;
}

const EmptyListMessage: React.FC<EmptyListMessageProps> = ({
  searchValue,
  textColor
}) => {
  return (
    <View style={styles.emptyListStyle}>
      <Text style={[styles.emptyTextStyle, { color: textColor }]}>
        Aucun résultat trouvé pour "{searchValue}"
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTextStyle: {
    fontSize: 16,
    textAlign: 'center',
  }
});

export default EmptyListMessage;