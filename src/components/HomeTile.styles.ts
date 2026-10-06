import { StyleSheet } from 'react-native';

const homeTileStyles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 4,
    height: 140, // Um pouco maior para caber ícone + texto
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    elevation: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  icon: {
    marginBottom: 8, // Espaço entre ícone e texto
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});

export default homeTileStyles;
