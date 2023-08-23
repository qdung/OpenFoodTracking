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

export const AskWeight = memo(
  ({
    weight,
    setWeight,
    openMenuWeight,
    setOpenMenuWeight,
    weightUniList,
    weightUnit,
    setWeightUnit,
    setStep,
  }: {
    weight: string
    setWeight: (weight: string) => void
    openMenuWeight: boolean
    setOpenMenuWeight: (value: boolean) => void
    weightUniList: string[]
    weightUnit: string
    setWeightUnit: (value: string) => void
    setStep: () => void
  }) => {
    return (
      <KeyboardAvoidingView
        style={{ alignItems: 'center' }}
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Label>{t('What Is Your Weight?')}</Label>
        <View style={{}}>{/* Image Description  */}</View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // alignSelf: 'stretch',
            marginVertical: 50,
          }}
        >
          <TextInput
            autoFocus
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            style={styles.inputWeight}
            maxLength={3}
          />
          <Label style={{ marginLeft: 20, width: 20 }}>{weightUnit}</Label>
          <View>
            <TouchableOpacity
              style={{ marginRight: -45, left: 5 }}
              onPress={() => setOpenMenuWeight((_prev) => !_prev)}
            >
              <AntDesign name="caretdown" size={14} color="white" />
            </TouchableOpacity>
            {openMenuWeight ? (
              <View
                style={{
                  position: 'absolute',
                  top: 30,
                  backgroundColor: 'white',
                  paddingVertical: 10,
                }}
              >
                {weightUniList.map((item, index) => (
                  <TouchableOpacity
                    key={`weight-${index}`}
                    onPress={() => {
                      setWeightUnit(item)
                      setOpenMenuWeight(false)
                    }}
                    style={{
                      marginBottom: index === 0 ? 10 : 0,
                      paddingHorizontal: 5,
                    }}
                  >
                    <Label style={{ color: 'black' }}>{item}</Label>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
        </View>
        {weight.length ? (
          <TouchableOpacity style={styles.btnNext} onPress={setStep}>
            <Label style={{ color: 'black', textAlign: 'center' }}>Next</Label>
          </TouchableOpacity>
        ) : null}
      </KeyboardAvoidingView>
    )
  },
)
