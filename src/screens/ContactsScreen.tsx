// src/screens/ContactsScreen.tsx - COMPLETO
import React, { useMemo, useRef } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SectionListRef,
} from 'react-native';
import { usePhoneContacts } from '../hooks/usePhoneContacts';
import { useContactsFavorites } from '../hooks/useContactsFavorites';
import { openDialer } from '../utils/actions';
import { buildContactSections } from '../utils/contactsSections';
import styles from './ContactsScreen.styles';

type Props = { onBack: () => void };

const ContactsScreen: React.FC<Props> = ({ onBack }) => {
  const { contacts, loading: contactsLoading } = usePhoneContacts();
  const { favorites, toggleFavorite, isFavorite } = useContactsFavorites();
  const listRef = useRef<SectionListRef<any>>(null);

  const sections = useMemo(() => {
    // FAVORITOS NO TOPO
    const favoriteSection = {
      title: '⭐ FAVORITOS',
      data: favorites as any[],
    };

    // Contatos normais (sem favoritos)
    const normalContacts = contacts.filter((c) => !isFavorite(c));
    const normalSections = buildContactSections(normalContacts);

    return [favoriteSection, ...normalSections];
  }, [contacts, favorites, isFavorite]);

  const scrollToLetter = (letter: string) => {
    // pula a seção de favoritos para ir direto às letras
    const index = sections.findIndex((s, i) => i > 0 && s.title === letter);
    if (index >= 0 && listRef.current) {
      listRef.current.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        viewPosition: 0,
      });
    }
  };

  const renderContactCard = (contact: any, isFavoriteCard = false) => {
    const name = contact.displayName || 'Sem nome';
    const phone = contact.phoneNumbers?.[0]?.number || 'Sem telefone';
    const photoUri = contact.hasThumbnail ? contact.thumbnailPath : undefined;

    return (
      <View style={[styles.card, isFavoriteCard && styles.favoriteCard]}>
        <View style={styles.left}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.center}>
          <Text style={[styles.name, isFavoriteCard && styles.favoriteName]}>
            {name}
          </Text>
          {/* <Text style={styles.relation}>Contato</Text> */}
          <Text style={styles.phone}>{phone}</Text>
        </View>

        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => openDialer(phone)}
          >
            <Text style={styles.callText}>LIGAR</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[
              styles.favoriteToggle,
              isFavoriteCard ? styles.favoriteActive : styles.favoriteInactive,
            ]}
            onPress={() => toggleFavorite(contact)}
          >
            <Text style={styles.favoriteStar}>⭐</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  const renderItem = ({ item, section }: any) =>
    renderContactCard(item, section.title === '⭐ FAVORITOS');

  const renderSectionHeader = ({ section }: any) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const letters = sections
    .slice(1) // remove favoritos do índice lateral
    .map((s) => s.title);

  if (contactsLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contatos</Text>
        <View style={{ width: 80 }} />
      </View>

      <View style={{ flex: 1, flexDirection: 'row',}}>
        <SectionList
          ref={listRef}
          sections={sections}
          keyExtractor={(item, index) => item.recordID + String(index)}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              if (listRef.current) {
                listRef.current.scrollToLocation({
                  sectionIndex: info.sectionIndex,
                  itemIndex: info.highestMeasuredFrameIndex,
                  viewPosition: 0,
                });
              }
            }, 300);
          }}
        />

        {/* Índice lateral (sem a seção de favoritos) */}
        <View style={styles.alphaIndexContainer}>
          {letters.map((letter) => (
            <TouchableOpacity
              key={letter}
              onPress={() => scrollToLetter(letter)}
            >
              <Text style={styles.alphaIndexLetter}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ContactsScreen;
