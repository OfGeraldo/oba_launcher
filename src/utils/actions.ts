import { Linking, Alert, NativeModules, Platform } from 'react-native';

const { SystemActionsModule } = NativeModules;

const handleError = (msg: string) => {
  Alert.alert('Erro', msg);
};

export const openDialer = (phone?: string) => {
  const url = phone ? `tel:${phone}` : 'tel:';
  Linking.openURL(url).catch(() =>
    handleError('Não foi possível abrir o telefone.')
  );
};

export const openContacts = () => {
  // muitos aparelhos aceitam esse esquema; se não funcionar, você pode criar
  // um módulo nativo para abrir o app de contatos.
  Linking.openURL('content://contacts/people').catch(() =>
    handleError('Não foi possível abrir os contatos.')
  );
};

export const openCamera = () => {
  Linking.openURL('content://media/internal/images/media').catch(() =>
    handleError('Não foi possível abrir a câmera.')
  );
};

export const openGallery = () => {
  Linking.openURL('content://media/internal/images/media').catch(() =>
    handleError('Não foi possível abrir a galeria.')
  );
};

export const openCalendar = () => {
  // atalho comum para o calendário
  Linking.openURL('content://com.android.calendar/time/').catch(() =>
    handleError('Não foi possível abrir o calendário.')
  );
};

export const openSamsungHome = () => {
  if (Platform.OS === 'android') {
    console.log("openSamsungLauncher");
    SystemActionsModule.openSamsungLauncher();
  }
};

export const openLauncherSettings = () => {
  if (Platform.OS === 'android') {
    console.log("openLauncherSettings");
    SystemActionsModule.openDefaultAppsSettings();
  }
};