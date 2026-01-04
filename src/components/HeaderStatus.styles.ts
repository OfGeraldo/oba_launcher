import { StyleSheet } from 'react-native';

const headerStatusStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#dcdcdc',
    paddingHorizontal: 8,
    paddingVertical: 6,
    paddingTop: 28,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBody: {
    width: 80,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  batteryFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  batteryCap: {
    width: 6,
    height: 12,
    marginLeft: -2,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 1,
    backgroundColor: '#ffffff',
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  signalBar: {
    width: 10,
    marginHorizontal: 1,
    borderRadius: 5,        // cantos arredondados
  },
  signalBarActive: {
    backgroundColor: '#000',
  },
  signalBarInactive: {
    backgroundColor: '#dddddd',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dateArea: {
    flex: 2,
  },
  timeArea: {
    flex: 1,
    alignItems: 'flex-end',
  },
  weekdayText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default headerStatusStyles;
