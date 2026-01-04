// src/screens/FavoritesManagerScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useContactsFavorites, FavoriteContact } from '../hooks/useContactsFavorites';
import { usePhoneContacts } from '../hooks/usePhoneContacts';
import styles from './FavoritesManagerScreen.styles';

type Props = { onBack: () => void };

const FavoritesManagerScreen: React.FC<Props> = ({ onBack }) => {
  const { favorites, toggleFavorite } = useContactsFavorites();
  const { contacts } = usePhoneContacts();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(
    (c) =>
      c.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !favorites.some((f) => f.recordID === c.recordID),
  );

  const addFavorite = (contact: any) => {
    toggleFavorite(contact);
    setShowAddModal(false);
    setSearchTerm('');
  };

  const removeFavorite = (contact: FavoriteContact) => {
    Alert.alert(
      'Remover Favorito',
      `Remover "${contact.displayName}" dos favoritos?`,
      [
        { text: 'Cancelar' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => toggleFavorite(contact),
        },
      ],
    );
  };

  const renderFavorite = ({ item }: any) => {
    const name = item.displayName || 'Sem nome';
    const phone = item.phoneNumbers?.[0]?.number || 'Sem telefone';
    const photoUri = item.thumbnailPath;

    return (
      <View style={styles.card}>
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
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>

        <View style={styles.rightActions}>
          {/* <TouchableOpacity
            style={styles.callButton}
            onPress={() => openDialer(phone)}
          >
            <Text style={styles.callText}>LIGAR</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item)}
          >
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gerenciar Favoritos</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Text style={styles.addText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum favorito ainda</Text>
          <TouchableOpacity
            style={styles.addEmptyButton}
            onPress={() => setShowAddModal(true)}
          >
            <Text style={styles.addEmptyText}>+ Adicionar primeiro favorito</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.recordID}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Modal para adicionar novo favorito */}
      <Modal visible={showAddModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.backText}>{'‹'}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Adicionar Favorito</Text>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar contatos..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <FlatList
            data={filteredContacts}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.addContactRow}
                onPress={() => addFavorite(item)}
              >
                <View style={styles.addContactLeft}>
                  {item.hasThumbnail ? (
                    <Image source={{ uri: item.thumbnailPath }} style={styles.addAvatar} />
                  ) : (
                    <View style={styles.addAvatarPlaceholder}>
                      <Text style={styles.addAvatarInitial}>
                        {item.displayName?.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.addContactInfo}>
                  <Text style={styles.addContactName}>{item.displayName}</Text>
                  <Text style={styles.addContactPhone}>
                    {item.phoneNumbers?.[0]?.number}
                  </Text>
                </View>
                <Text style={styles.addStar}>★</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.recordID}
            style={styles.addList}
          />
        </View>
      </Modal>
    </View>
  );
};

export default FavoritesManagerScreen;
