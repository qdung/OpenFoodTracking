import { Platform, StyleSheet } from 'react-native'
import { Colors, Fonts } from 'theme'
import { scaleWidth } from 'utils'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 30,
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    width: scaleWidth(80),
    alignItems: 'center',
    borderRadius: 16,
  },
})
