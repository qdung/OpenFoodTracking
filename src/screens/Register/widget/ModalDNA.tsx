import { Label } from 'components';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Fonts } from 'theme';
import { IModalCustom } from 'types/app';

export const ModalDNA = (props: IModalCustom) => {
  const [address, setAddress] = useState(
    'Test addresss: 123123 MelbounTest addresss: 123123 MelbounTest addresss: 123123 Melboun',
  );
  const [phone, setPhone] = useState('');
  const [keyboardShow, setKeyboardShow] = useState(false);

  const onPressSave = useCallback(() => {
    console.log('press save');
    props.callback && props.callback({ phone, address, action: 'yes' });
    props.close();
  }, [address, phone]);

  useEffect(() => {
    if (props.visible) {
      setAddress(
        'Test addresss: 123123 MelbounTest addresss: 123123 MelbounTest addresss: 123123 Melboun',
      );
      setPhone('');
    }
  }, [props.visible]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShow(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShow(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [[]]);

  return (
    <Modal
      isVisible={props.visible}
      onBackdropPress={() => {
        if (keyboardShow) {
          Keyboard.dismiss();
        } else {
          props.close && props.close();
        }
      }}
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
      <KeyboardAvoidingView
        keyboardVerticalOffset={-200}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Label
              style={[
                styles.label,
                {
                  alignSelf: 'center',
                  fontSize: 24,
                  fontFamily: Fonts.semibold,
                },
              ]}
            >
              DNA Kit Information
            </Label>
            <Label style={styles.label}>Address</Label>
            <TextInput
              autoCapitalize="none"
              autoFocus
              placeholder="Address for shipping DNA Kit"
              placeholderTextColor={Colors.grey_600}
              style={[
                styles.input,
                {
                  paddingTop: Platform.OS === 'ios' ? 18 : 15,
                  paddingBottom: Platform.OS === 'ios' ? 18 : 15,
                },
              ]}
              value={address}
              onChangeText={setAddress}
              maxLength={100}
              multiline
            />
            <Label style={styles.label}>Phone</Label>
            <TextInput
              autoCapitalize="none"
              keyboardType="phone-pad"
              placeholder="Phone for shipping DNA Kit"
              placeholderTextColor={Colors.grey_600}
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              maxLength={20}
            />
            <TouchableOpacity style={styles.button} onPress={onPressSave}>
              <Label
                style={{
                  color: 'white',
                  fontFamily: Fonts.medium,
                  fontSize: 15,
                }}
              >
                Save
              </Label>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    width: '100%',
    padding: 20,
  },
  input: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 15 : 0,
    color: 'white',
    fontFamily: Fonts.medium,
    backgroundColor: 'black',
    minHeight: 48,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  label: {
    color: 'black',
    fontFamily: Fonts.medium,
    fontSize: 15,
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
    backgroundColor: Colors.yellow,
    paddingVertical: 10,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
});
