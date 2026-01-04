// src/screens/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfcfcf',
  },
  separator: {
    height: 2,
    backgroundColor: '#000',
  },
  missedCallsBar: {
    height: 56,
    borderTopWidth: 2,
    borderColor: '#000',
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  missedCallsText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default homeScreenStyles;
