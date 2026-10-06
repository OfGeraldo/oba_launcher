import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Usando Material Icons
import styles from './HomeTile.styles';

type Props = {
  label: string;
  iconName?: string; // Nome do ícone (opcional)
  backgroundColor: string;
  onPress: () => void;
};

const HomeTile: React.FC<Props> = ({ label, iconName, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity style={[styles.tile, { backgroundColor }]} onPress={onPress}>
      <View style={styles.content}>
        {/* Se tiver ícone, mostra ele grande */}
        {iconName && (
          <Icon name={iconName} size={90} color="#000" style={styles.icon} />
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};


export default HomeTile;
