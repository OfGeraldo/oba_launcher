import { StyleSheet } from 'react-native';

const homeGridStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 4,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  dividerVertical: {
    width: 2,
    backgroundColor: '#000',
  },
});

export default homeGridStyles;
