import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts } from 'theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.neonViolet,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    bottom: 20,
    fontFamily: Fonts.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: Fonts.semibold,
    marginBottom: 10,
    fontSize: 16,
  },
  planContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    minHeight: 300,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
  },
  planSelect: {
    backgroundColor: Colors.neonViolet,
  },
  planSelectTxt: {
    color: 'white',
  },
  label: {
    color: 'black',
    marginBottom: 10,
  },
  edit: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 10,
    paddingRight: 20,
  },
  button: {
    borderRadius: 12,
    backgroundColor: Colors.warning,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
