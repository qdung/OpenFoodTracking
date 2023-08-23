import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import { Colors } from 'theme';
import { IModalCustom } from 'types/app';
import { Label } from './Label';

export const ModalDelelteProfile = (props: IModalCustom) => {
  return (
    <Modal
      isVisible={props.visible}
      onBackdropPress={props.close}
      backdropOpacity={0.5}
      hideModalContentWhileAnimating
      propagateSwipe
      swipeThreshold={250}
      style={{
        justifyContent: 'center',
        margin: 0,
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    >
      <View style={styles.container}>
        <Label
          style={{
            color: Colors.neonViolet,
            alignSelf: 'center',
            marginBottom: 30,
            textAlign: 'center',
            fontSize: 17,
            lineHeight: 24,
          }}
        >
          Do you want to {'\n'}delete this profile?
        </Label>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Button
            buttonColor={Colors.main}
            mode="elevated"
            textColor="white"
            onPress={() => props.callback && props.callback('yes')}
          >
            <Label>Yes</Label>
          </Button>
          <Button
            buttonColor={Colors.main}
            mode="elevated"
            textColor="white"
            onPress={() => props.callback && props.callback('no')}
          >
            <Label>No</Label>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    width: '100%',
    padding: 30,
    // alignItems: 'center',
  },
});
