import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
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
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 10,
    width: '100%',
  },
  textInput: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  toggle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleItem: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    padding: 10,
  },
  toggleItemActive: {
    backgroundColor: 'black',
  },
  toggleItemFirst: {
    marginRight: 5,
  },
  toggleItemLast: {
    marginLeft: 5,
  },
  toggleItemText: {
    color: 'black',
  },
  toggleItemTextActive: {
    color: 'white',
  },
});
