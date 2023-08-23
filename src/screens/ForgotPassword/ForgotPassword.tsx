import { SafeAreaViewProvider } from 'components'
import { t } from 'i18next'
import React, { memo } from 'react'
import { View, Text, Platform } from 'react-native'
import { styles } from './style'
import Svg, { Circle, Path } from 'react-native-svg'
import { scaleWidth } from 'utils'
import { Colors } from 'theme'
import { NavigationService, Routes } from 'navigation'

export const ForgotPassword = memo(() => {
  return (
    <SafeAreaViewProvider>
      <View></View>
    </SafeAreaViewProvider>
  )
})
