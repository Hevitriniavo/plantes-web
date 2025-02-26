import { StyleSheet, ViewStyle, type ViewProps } from 'react-native';
import React from 'react';
import { ThemedView } from './ThemedView';

type Props = ViewProps & {
  gap?: number; 
};

export default function Row({ style, gap = 8, ...rest }: Props) {
  return (
    <ThemedView
      style={[styles.row, { gap }, style]} 
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    alignItems: 'center',  
    width: '100%',        
  },
});
