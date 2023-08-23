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
  pagagraph: {
    textAlign: 'justify',
    marginBottom: 10,
    fontSize: 15,
    lineHeight: 22,
    // fontFamily: Fonts.regular,
  },
});
