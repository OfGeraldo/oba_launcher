// src/hooks/usePhoneContacts.ts
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';

export const usePhoneContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setLoading(false);
            return;
          }
        }
        const all = await Contacts.getAll(); // lista completa do aparelho
        // ordena alfabeticamente
        all.sort((a, b) =>
          (a.displayName || '').localeCompare(b.displayName || ''),
        );
        setContacts(all);
      } catch (e) {
        console.warn('Erro ao carregar contatos', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { contacts, loading };
};
