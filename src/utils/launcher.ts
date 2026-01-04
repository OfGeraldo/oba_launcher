import { Linking, Alert, Platform } from 'react-native';

export const openDialer = (phone?: string) => {
  let url = 'tel:';
  if (phone) {
    url = `tel:${phone}`;
  }

  Linking.openURL(url).catch(() => {
    Alert.alert('Erro', 'Não foi possível abrir o telefone.');
  });
};

export const openWhatsApp = (phone?: string) => {
  const number = phone?.replace(/\D/g, '');
  const url = number
    ? `whatsapp://send?phone=${number}`
    : 'whatsapp://app';

  Linking.openURL(url).catch(() => {
    Alert.alert(
      'Erro',
      'Não foi possível abrir o WhatsApp. Verifique se ele está instalado.'
    );
  });
};

export const openYoutube = () => {
  const url = 'https://www.youtube.com/';
  Linking.openURL(url).catch(() => {
    Alert.alert('Erro', 'Não foi possível abrir o YouTube.');
  });
};

export const openSettings = () => {
  const url =
    Platform.OS === 'android'
      ? 'android.settings.SETTINGS'
      : 'app-settings:';

  // Em Android é melhor usar Intent nativa, mas como atalho simples:
  Linking.openSettings().catch(() => {
    Alert.alert('Erro', 'Não foi possível abrir as configurações.');
  });
};
