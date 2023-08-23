import { NavigationService } from 'navigation'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export const Back = (props: TouchableOpacityProps) => (
  <TouchableOpacity
    style={[{ alignSelf: 'flex-start', marginTop: 10 }, props.style]}
    onPress={() => NavigationService.goBack()}
  >
    <AntDesign name="arrowleft" size={24} color="white" />
  </TouchableOpacity>
)
