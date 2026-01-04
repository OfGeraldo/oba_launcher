// src/components/HomeGrid.tsx
import React from 'react';
import { View } from 'react-native';
import HomeTile from './HomeTile';
import styles from './HomeGrid.styles';
import {
  openDialer,
  openCamera,
  openGallery,
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
          backgroundColor="#f5f5f5"
          onPress={() => openDialer()}
        />
        <HomeTile
          label="Câmera"
          backgroundColor="#f5f5f5"
          onPress={openCamera}
        />
        <HomeTile
          label="Configurações"
          backgroundColor="#dcdcdc"
          onPress={() => onNavigate('settings')}
        />
      </View>

      {/* <View style={styles.dividerVertical} /> */}

      <View style={{ flex: 1 }}>
        <HomeTile
          label="Contatos"
          backgroundColor="#f5f5f5"
          onPress={() => onNavigate('contacts')}
        />
        <HomeTile
          label="Galeria"
          backgroundColor="#f5f5f5"
          onPress={openGallery}
        />
        <HomeTile
          label=""
          backgroundColor="#dcdcdc"
          onPress={() => {
            // reserva para uma futura tela, ex: 'settings'
          }}
        />
      </View>
    </View>
  </View>
);

export default HomeGrid;
