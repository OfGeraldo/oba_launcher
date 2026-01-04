import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './HomeTile.styles';

type Props = {
  label: string;
  backgroundColor: string;
  onPress: () => void;
  children?: React.ReactNode;
};

const HomeTile: React.FC<Props> = ({ label, backgroundColor, onPress, children }) => (
  <TouchableOpacity style={[styles.tile, { backgroundColor }]} onPress={onPress}>
    <View style={styles.content}>
      {children}
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default HomeTile;
