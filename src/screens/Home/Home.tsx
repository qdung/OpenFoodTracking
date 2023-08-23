import { Label, SafeAreaViewProvider } from 'components';
import { t } from 'i18next';
import React, { memo, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';
import Svg, { Circle, Path } from 'react-native-svg';
import { scaleWidth } from 'utils';
import { Colors } from 'theme';
import { NavigationService, Routes } from 'navigation';
import { Images } from 'assets';

export const Home = memo(() => {
  return (
    <SafeAreaViewProvider>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => NavigationService.navigate(Routes.ScanBarcode)}
        >
          <Label style={{ color: 'black' }}>Scan</Label>
        </TouchableOpacity>
      </View>
    </SafeAreaViewProvider>
  );
});
