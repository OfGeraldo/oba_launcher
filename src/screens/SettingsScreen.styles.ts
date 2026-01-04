// src/screens/SettingsScreen.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    elevation: 3,
    justifyContent: 'space-between',
  },
  backText: { fontSize: 36, fontWeight: 'bold', padding: 12 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },

  section: { marginTop: 16, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  settingTitle: { fontSize: 18, fontWeight: '600' },
  settingValue: { fontSize: 16, color: '#666' },
  arrow: { fontSize: 28, fontWeight: 'bold', color: '#999' },
});

export default styles;
