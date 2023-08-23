import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts } from 'theme';

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
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderColor: Colors.neonViolet,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    justifyContent: 'center',
  },
  label: {
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
  },
  submit: {
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
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
    // marginVertical: 5,
  },
  input: {
    borderRadius: 16,
    color: 'white',
    fontFamily: Fonts.medium,
    marginTop: 5,
  },
  edit: {
    alignSelf: 'flex-end',
    marginTop: -5,
    marginBottom: 10,
  },
  column: {
    alignItems: 'flex-start',
  },
  unit: {
    fontSize: 12,
  },
  swap: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 5,
  },
  bmiText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  confirmMaintain: {
    borderRadius: 12,
    backgroundColor: Colors.main,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
