// src/screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { ScreenName } from '../../App';
import styles from './SettingsScreen.styles';
import {
  openLauncherSettings,
} from '../utils/actions';

type Props = {
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
};

const SettingsScreen: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [notifications, setNotifications] = React.useState(true);
  const [tamanhoTexto, setTamanhoTexto] = React.useState('normal');

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geral</Text>
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => onNavigate('favoritesManager')}
        >
          <Text style={styles.settingTitle}>Gerenciar Favoritos</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Notificações</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: '#1e88e5' }}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Tamanho do Texto</Text>
          <Text style={styles.settingValue}>{tamanhoTexto}</Text>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}  onPress={openLauncherSettings}>Tela Inicial Padrão</Text>
          <Text style={styles.arrow} onPress={openLauncherSettings}>›</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Versão do App</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingTitle}>Feito por 👨‍💻</Text>
          <Text style={styles.settingValue}>Geraldo Junior 😎</Text>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
