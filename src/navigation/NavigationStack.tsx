import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import * as Screens from 'screens';
import { navigationRef } from './NavigationService';
import { AuthProvider, useAuth } from 'context/AuthContext';
import { BottomTabNavigation } from './BottomTabNavigation';
import { ModalLoading, ModalUser, SafeAreaViewProvider } from 'components';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { getToken } from 'selectors/app';
import { Images } from 'assets';
import { Colors } from 'theme';
import Feather from 'react-native-vector-icons/Feather';
import { BlankScreen } from './BlankScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  const { user, setUser, setLoading, loading } = useAuth();
  const [modalUser, setModalUser] = useState(false);

  const [perrmission, setPermission] = useState(false);

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
        setPermission(true);
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
    <SafeAreaViewProvider>
      <Stack.Navigator
        initialRouteName={Routes.Welcome}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name={Routes.Welcome}
          component={
            Platform.OS === 'android' ? BlankScreen : Screens.ScanBarcode
          }
        />
        <Stack.Screen name={Routes.Login} component={Screens.Login} />
        <Stack.Screen name={Routes.Register} component={Screens.Register} />
        <Stack.Screen
          name={Routes.ForgotPassword}
          component={Screens.ForgotPassword}
        />
        <Stack.Screen name={Routes.Main} component={Screens.ScanBarcode} />
        <Stack.Screen
          name={Routes.ScanBarcode}
          component={Screens.ScanBarcode}
        />
        {/* <Stack.Screen name={Routes.Report} component={Screens.Report} /> */}
        <Stack.Screen
          options={{ gestureEnabled: false }}
          name={Routes.FoodInformation}
          component={Screens.FoodInformation}
        />
        <Stack.Screen
          name={Routes.FoodTracking}
          component={Screens.FoodTracking}
        />
        <Stack.Screen name={Routes.DNATest} component={Screens.DNATest} />
        <Stack.Screen name={Routes.Profile} component={Screens.Profile} />
        <Stack.Screen name={Routes.AboutUs} component={Screens.AboutUs} />
        <Stack.Screen
          name={Routes.GoalSetting}
          component={Screens.GoalSetting}
        />
        <Stack.Screen
          name={Routes.Subscription}
          component={Screens.Subscription}
        />
      </Stack.Navigator>
      <ModalUser />
      {/* <ModalLoading visible={loading} close={() => null} /> */}
    </SafeAreaViewProvider>
  );
};

export const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};
