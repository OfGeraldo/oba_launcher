// src/utils/contactsSections.ts
import { Contact } from 'react-native-contacts';

export type ContactSection = {
  title: string;      // letra
  data: Contact[];    // contatos dessa letra
};

export const buildContactSections = (contacts: Contact[]): ContactSection[] => {
  const map: Record<string, Contact[]> = {};

  contacts.forEach((c) => {
    const name = c.displayName || '';
    const first = name.trim().charAt(0).toUpperCase();
    const letter = /[A-ZÁÂÃÉÊÍÓÔÕÚÇ]/.test(first) ? first : '#';

    if (!map[letter]) map[letter] = [];
    map[letter].push(c);
  });

  const sections = Object.keys(map)
    .sort()
    .map((letter) => ({
      title: letter,
      data: map[letter].sort((a, b) =>
        (a.displayName || '').localeCompare(b.displayName || ''),
      ),
    }));

  return sections;
};
