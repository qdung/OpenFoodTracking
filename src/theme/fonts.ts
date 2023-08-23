import { Platform } from 'react-native'

export const Fonts = {
  regular: Platform.OS === 'ios' ? 'SVN-Poppins' : 'SVN-Poppins-Regular',
  medium: Platform.OS === 'ios' ? 'SVN-PoppinsMedium' : 'SVN-Poppins-Medium',
  italic: Platform.OS === 'ios' ? 'SVN-PoppinsLight' : 'SVN-Poppins-Light',
  semibold:
    Platform.OS === 'ios' ? 'SVN-PoppinsSemiBold' : 'SVN-Poppins-SemiBold',
  bold: Platform.OS === 'ios' ? 'SVN-PoppinsBold' : 'SVN-Poppins-Bold',
}
