import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts } from 'theme';
import { height, scaleHeight } from 'utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.main,
    borderWidth: 1,
    borderColor: Colors.neonViolet,
  },
  title: {
    fontFamily: Fonts.semibold,
    fontSize: 22,
    alignSelf: 'center',
    top: Platform.OS === 'android' ? -28 : -25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    marginTop: 15,
  },
  txt: {
    textTransform: 'capitalize',
    marginBottom: 10,
    fontSize: 12.5,
  },
  txtLabel: {
    textTransform: 'capitalize',
    fontSize: 12.5,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  nutriScore: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 20,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
  },
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
  card: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    marginBottom: 20,
  },
  cardIngredient: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    marginBottom: 20,
    width: '100%',
    height: scaleHeight(70),
  },
  select: {
    textDecorationLine: 'underline',
    color: Colors.highlight,
  },
});
