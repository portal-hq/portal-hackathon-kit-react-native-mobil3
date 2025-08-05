import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
  },
  formControl: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  formGroup: {
    marginTop: 10,
  },
  formLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 5,
    textTransform: 'uppercase',
    color: '#FFF', // White text for labels
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.95)', // Semi-transparent dark modal bg
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100,
  },
  safeArea: {
    paddingHorizontal: 20,
    backgroundColor: '#000', // Dark safe area
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // White title
  },
  section: {
    marginTop: 10,
    width: '100%',
  },
  textInput: {
    backgroundColor: '#333',
    borderRadius: 5,
    color: '#FFF',
    padding: 10,
  },
  toggle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleItem: {
    backgroundColor: '#333', // Dark gray toggle
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    padding: 10,
  },
  toggleItemActive: {
    backgroundColor: '#007BFF', // Blue active, like in docs
  },
  toggleItemFirst: {
    marginRight: 5,
  },
  toggleItemLast: {
    marginLeft: 5,
  },
  toggleItemText: {
    color: '#FFF', // White text
  },
  toggleItemTextActive: {
    color: '#FFF', // White in active
  },
});
