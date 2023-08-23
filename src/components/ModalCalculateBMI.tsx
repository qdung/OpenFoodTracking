import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Fonts } from 'theme';
import { IModalCustom } from 'types/app';

export const ModalCalculateBMI = (props: IModalCustom) => {
  return (
    <Modal
      isVisible={props.visible}
      onBackdropPress={props.close}
      backdropOpacity={0.5}
      hideModalContentWhileAnimating
      propagateSwipe
      swipeThreshold={250}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    >
      <View style={styles.container}>
        <TextInput style={styles.input} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.main,
    borderRadius: 50,
    width: '100%',
    padding: 20,
  },
  input: {},
});
