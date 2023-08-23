import { Back, Label, SafeAreaViewProvider } from 'components'
import { t } from 'i18next'
import React, { memo, useMemo, useState } from 'react'
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  ViewToken,
} from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { scaleWidth } from 'utils'
import { Colors } from 'theme'
import { NavigationService, Routes } from 'navigation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import _ from 'lodash'
import { styles } from '../style'

export const AskGender = memo(
  ({
    setGender,
    setStep,
  }: {
    setGender: (gender: string) => void
    setStep: () => void
  }) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Label>{t('What Is Your Gender?')}</Label>
        <View style={styles.midFocus}>
          <TouchableOpacity>
            <Label>{t('Why we ask')}</Label>
          </TouchableOpacity>
        </View>
        <View style={[styles.row, { alignSelf: 'stretch' }]}>
          <TouchableOpacity
            onPress={() => {
              setGender('male')
              setStep(1)
            }}
            style={styles.btnGender}
          >
            <Label style={{ color: 'black', textAlign: 'center' }}>
              {t('Male')}
            </Label>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setGender('female')
              setStep(1)
            }}
            style={styles.btnGender}
          >
            <Label style={{ color: 'black', textAlign: 'center' }}>
              {t('Female')}
            </Label>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
)
