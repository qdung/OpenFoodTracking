import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts } from 'theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontFamily: Fonts.bold,
    fontSize: 36,
    bottom: 50,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: 'white',
    fontFamily: Fonts.regular,
    backgroundColor: Colors.main,
    flex: 1,
    height: 48,
    shadowColor: Colors.neonViolet,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    height: 36,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
    marginTop: 30,
    width: '35%',
    borderRadius: 20,
    shadowColor: Colors.neonViolet,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  loginLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  error: {
    color: Colors.warning,
  },
  divider: {
    height: 2,
    width: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 20,
  },
});
