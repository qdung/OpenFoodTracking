import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts } from 'theme';
import { scaleWidth } from 'utils';

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
  addBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingRight: 20,
    paddingTop: 5,
  },
  txtDate: {
    fontFamily: Fonts.medium,
    marginBottom: 15,
    fontSize: 16,
  },
  foodContainer: {
    borderRadius: 12,
    borderColor: Colors.neonViolet,
    backgroundColor: 'white',
    borderWidth: 2,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    width: scaleWidth(75),
    color: 'black',
    fontFamily: Fonts.medium,
    fontSize: 17,
    marginBottom: 5,
  },
  desciption: {
    width: scaleWidth(75),
    color: 'black',
    fontFamily: Fonts.italic,
    fontSize: 13,
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  highlight: {
    textDecorationLine: 'underline',
    color: Colors.highlight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
