import { useEffect } from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationService } from './NavigationService';
import { Routes } from './Routes';

export const BlankScreen = () => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'cyberHeal8 App Camera Permission',
          message:
            'cyberHeal8 App needs access to your camera to scan barcode/QR code',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        NavigationService.replace(Routes.ScanBarcode);
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <ActivityIndicator size={'large'} color="white" />
    </View>
  );
};
