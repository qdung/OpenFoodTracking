import { Label } from 'components';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { Fonts } from 'theme';
import { EStatus, IModalCustom, IModalReportScan } from 'types/app';

export const ModalReport = (props: IModalReportScan) => {
  useEffect(() => {
    if (props.extraData.status === EStatus.FAIL) {
      // props.close();
    }
  }, [props.extraData.status]);

  const status = props.extraData.status;

  return (
    <Modal
      isVisible={props.visible}
      onBackdropPress={() =>
        status === EStatus.LOADING ? null : props.close && props.close()
      }
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
      <View style={[styles.container]}>
        {status === EStatus.LOADING ? (
          <>
            <Label
              style={{
                fontFamily: Fonts.medium,
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              Loading...
            </Label>
            <ActivityIndicator size={'large'} color={'white'} />
          </>
        ) : status === EStatus.SUCCESS ? (
          <>
            <Label style={{ fontFamily: Fonts.medium, fontSize: 16 }}>
              {props.extraData.loading ? 'Loading data...' : 'Scan Success'}
            </Label>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.callback && props.callback(0)}
            >
              <Label style={styles.label}>{t('Nutrion Facts')}</Label>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.callback && props.callback(1)}
            >
              <Label style={styles.label}>{t('Ingredients Report')}</Label>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Label style={{ fontFamily: Fonts.medium, fontSize: 16 }}>
              Scan Fail!
            </Label>
            <TouchableOpacity style={styles.button} onPress={props.rescan}>
              <Label style={styles.label}>Try again!</Label>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: 24,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 20,
    width: 200,
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    color: 'black',
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
});
