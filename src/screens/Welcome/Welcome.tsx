import { Label, SafeAreaViewProvider } from 'components';
import { t } from 'i18next';
import React, { memo } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { styles } from './style';
import Svg, { Circle, Path } from 'react-native-svg';
import { APP_NAME, scaleWidth } from 'utils';
import { Colors, Fonts } from 'theme';
import { NavigationService, Routes } from 'navigation';

export const Welcome = memo(() => {
  return (
    <SafeAreaViewProvider>
      <View style={styles.container}>
        <Label style={{ fontFamily: Fonts.medium, fontSize: 18 }}>
          Welcome to
        </Label>
        <Label
          style={{
            fontFamily: Fonts.semibold,
            fontSize: 32,
            textDecorationLine: 'underline',
            marginTop: 10,
          }}
        >
          {APP_NAME}
        </Label>
        <View style={{ alignSelf: 'center', position: 'absolute', bottom: 50 }}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate(Routes.Register)}
            style={[styles.button, { backgroundColor: '#eeeeee' }]}
          >
            <Label
              style={{
                color: '#2946d7',
                fontSize: 16,
                fontFamily: Fonts.medium,
              }}
            >
              I am new
            </Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => NavigationService.navigate(Routes.Login)}
            style={[styles.button, { backgroundColor: '#eeeeee' }]}
          >
            <Label
              style={{
                color: Colors.main,
                fontSize: 16,
              }}
            >
              Login
            </Label>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaViewProvider>
  );
});
