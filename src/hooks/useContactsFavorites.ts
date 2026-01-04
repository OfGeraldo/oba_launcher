// src/hooks/useContactsFavorites.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from 'react-native-contacts';

export type FavoriteContact = Pick<Contact, 'recordID' | 'displayName' | 'thumbnailPath' | 'phoneNumbers'>;

const FAVORITES_KEY = '@ObaLauncher:favorites';

export const useContactsFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteContact[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleFavorite = async (contact: Contact) => {
    const currentIds = favorites.map((f) => f.recordID);
    const isFavorite = currentIds.includes(contact.recordID);

    let newFavorites: FavoriteContact[];

    if (isFavorite) {
      newFavorites = favorites.filter((f) => f.recordID !== contact.recordID);
    } else {
      const favoriteContact: FavoriteContact = {
        recordID: contact.recordID,
        displayName: contact.displayName || '',
        thumbnailPath: contact.thumbnailPath,
        phoneNumbers: contact.phoneNumbers || [],
      };
      newFavorites = [favoriteContact, ...favorites];
    }

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(FAVORITES_KEY);
        if (saved) {
          const parsed: FavoriteContact[] = JSON.parse(saved);
          setFavorites(parsed);
        }
      } catch (e) {
        console.warn('Erro ao carregar favoritos', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite: (contact: Contact) => favorites.some((f) => f.recordID === contact.recordID),
  };
};
