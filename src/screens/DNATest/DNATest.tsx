import { Back, BackgroundImage, Label, SafeAreaViewProvider } from 'components';
import { t } from 'i18next';
import React, { memo } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { styles } from './style';
import Svg, { Circle, Path } from 'react-native-svg';
import { scaleWidth } from 'utils';
import { Colors, Fonts } from 'theme';
import { NavigationService, Routes } from 'navigation';

export const DNATest = memo(() => {
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Back />
      <Label style={styles.title}>DNA Report</Label>
      <Label
        style={{
          alignSelf: 'center',
          fontSize: 30,
          top: '40%',
          fontFamily: Fonts.semibold,
        }}
      >
        Coming Soon
      </Label>
    </View>
  );
});
