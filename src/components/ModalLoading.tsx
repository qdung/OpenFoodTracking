import { Label } from 'components/Label'
import { t } from 'i18next'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { Colors } from 'theme'
import { IModalCustom } from 'types/app'

export const ModalLoading = (props: IModalCustom) => {
  return (
    <Modal
      isVisible={props.visible}
      backdropOpacity={0.5}
      // backdropColor={Colors.LightGray}
      propagateSwipe
      style={{
        justifyContent: 'center',
        margin: 0,
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    >
      <View style={styles.container}>
        <Label>Loading...</Label>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 200,
  },
})
