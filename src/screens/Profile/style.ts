import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts } from 'theme';
import { scaleWidth, width } from 'utils';

const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 120;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.main,
    borderWidth: 1,
    borderColor: Colors.neonViolet,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    bottom: Platform.OS === 'ios' ? 20 : 25,
    fontFamily: Fonts.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderRadius: 16,
    color: 'white',
    fontFamily: Fonts.medium,
  },
  inputActive: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.main,
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
  inputDeactive: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    marginVertical: 5,
  },
  subtitle: {
    fontFamily: Fonts.semibold,
    marginBottom: 5,
    fontSize: 16,
  },
  submit: {
    position: 'absolute',
    right: 5,
    top: 0,
    padding: 5,
  },
  button: {
    borderRadius: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: Fonts.medium,
    backgroundColor: 'black',
    height: 48,
    flex: 1,
    marginBottom: 10,
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
  avatar: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: IMAGE_HEIGHT / 2,
    resizeMode: 'cover',
    backgroundColor: 'white',
    borderColor: Colors.neonViolet,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderColor: Colors.neonViolet,
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
  },
  label: {
    marginVertical: 5,
  },
  planContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.main,
    borderRadius: 12,
    padding: 15,
    minHeight: 250,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
  },
  planSelect: {
    backgroundColor: Colors.darkLavener,
  },
  planSelectTxt: {
    color: 'white',
  },
  unit: {
    fontSize: 12,
    marginLeft: 2,
  },
});
