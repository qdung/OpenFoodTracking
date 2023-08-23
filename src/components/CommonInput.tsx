import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
// import {Colors} from 'theme'
import { scaleWidth } from 'utils/responsive'

export const CommonInput = memo((props: TextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={props.value}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        style={[
          styles.txtInput,
          props.value ? styles.normal : styles.italic,
          props.style,
        ]}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
      />
    </View>
  )
}, isEqual)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  txtInput: {
    width: scaleWidth(70),
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
  },
  italic: {
    fontStyle: 'italic',
  },
  normal: {
    fontStyle: 'normal',
  },
})
