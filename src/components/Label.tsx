import React from 'react'
import { Text, TextProps } from 'react-native'
import { Fonts } from 'theme'

export const Label = (props: TextProps) => {
  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[{ fontFamily: Fonts.regular, color: 'white' }, props.style]}
    >
      {props.children}
    </Text>
  )
}
