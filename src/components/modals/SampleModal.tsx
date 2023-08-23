import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { IModalCustom } from 'types/app';

export const SampleModal = (props: IModalCustom) => {
  return (
    <Modal
      swipeDirection={'down'}
      onSwipeComplete={props.close}
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
      <View style={styles.container} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: '100%',
    padding: 20,
  },
});
