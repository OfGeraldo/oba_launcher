import { StyleSheet } from 'react-native';

const homeTileStyles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 4,
    height: 120,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default homeTileStyles;
