// src/components/HomeGrid.tsx
import React from 'react';
import { View } from 'react-native';
import HomeTile from './HomeTile';
import styles from './HomeGrid.styles';
import {
  openDialer,
  openCamera,
  openGallery,
  openSamsungHome,
} from '../utils/actions';
import { ScreenName } from '../../App';

type Props = {
  onNavigate: (screen: ScreenName) => void;
};

const HomeGrid: React.FC<Props> = ({ onNavigate }) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <HomeTile
          label="Ligações"
          iconName="phone" // Ícone de telefone
          backgroundColor="#97cef9"
          onPress={() => openDialer()}
        />
        <HomeTile
          label="Câmera"
          iconName="photo-camera" // Ícone de câmera
          backgroundColor="#f5f5f5"
          onPress={openCamera}
        />
        <HomeTile
          label="Configurações"
          iconName="settings" // Ícone de engrenagem
          backgroundColor="#dcdcdc"
          onPress={() => onNavigate('settings')}
        />
      </View>

      <View style={styles.dividerVertical} />

      <View style={{ flex: 1 }}>
        <HomeTile
          label="Contatos"
          iconName="person" // Ícone de agenda
          backgroundColor="#b1ff94"
          onPress={() => onNavigate('contacts')}
        />
        <HomeTile
          label="Galeria"
          iconName="photo-library" // Ícone de fotos
          backgroundColor="#f5f5f5"
          onPress={openGallery}
        />
        <HomeTile
          label="Aplicativos"
          iconName="home"
          backgroundColor="#f5f5f5"
          onPress={ openSamsungHome }
        />
      </View>
    </View>
  </View>
);

export default HomeGrid;
