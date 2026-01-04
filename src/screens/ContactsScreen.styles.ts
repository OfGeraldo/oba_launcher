// src/screens/ContactsScreen.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
    justifyContent: 'space-between',
  },
  backText: {
    fontSize: 50,        // maior
    fontWeight: 'bold',
    padding: 10,         // área de toque maior
    minWidth: 40,        // largura mínima
    textAlign: 'center',
    color: '#000000',
  },
  backButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  headerTitle: { fontSize: 50, fontWeight: 'bold' },
  addText: { fontSize: 16, fontWeight: '600' },
  listContent: { padding: 12 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  left: { marginRight: 12 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: { fontSize: 24, fontWeight: 'bold' },

  center: { flex: 1 },
  name: { fontSize: 20, fontWeight: 'bold' },
  relation: { fontSize: 14, color: '#777', marginTop: 2 },
  phone: { fontSize: 16, marginTop: 4 },

  callButton: {
    backgroundColor: '#1e88e5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  callText: { 
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  alphaIndexContainer: {
    position: 'relative',
    left: -5,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  alphaIndexLetter: {
    fontSize: 24,
    paddingVertical: 1,
    paddingHorizontal: 4,
    color: '#080808',
  },
  sectionHeader: {
    paddingVertical: 4,
  },
  sectionHeaderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#080808',
  },
  favoriteCard: {
    backgroundColor: '#fff8e1',
    marginHorizontal: 0,
    marginBottom: 8,
    padding: 16,
  },
  favoriteName: {
    fontSize: 24,
    fontWeight: '800',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  favoriteActive: {
    backgroundColor: '#ff9800',
  },
  favoriteInactive: {
    backgroundColor: '#e0e0e0',
  },
  favoriteStar: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
