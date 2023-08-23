import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Routes } from './Routes'
import { Platform, PlatformIOSStatic, StyleSheet, View } from 'react-native'
import * as Screens from 'screens'
import { t } from 'i18next'
import { Label } from 'components'
import { width } from 'utils'
import i18n from 'i18n'
import { Colors, Fonts } from 'theme'

const BottomTab = createBottomTabNavigator()

export const BottomTabNavigation = () => {
  const isVn = i18n.language === 'vn'

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [styles.tabBarContainer],
      }}
    >
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomItem}>
              <Label style={{ color: 'black' }}>Home</Label>
            </View>
          ),
        }}
        name={Routes.GoalSetting}
        component={Screens.GoalSetting}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.bottomItem}>
              <Label style={{ color: 'black' }}>Home 2</Label>
            </View>
          ),
        }}
        name={Routes.FoodTracking}
        component={Screens.FoodTracking}
      />
    </BottomTab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    height: width < 390 ? 70 : 88,
    borderTopWidth: 0,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 5,
  },
})
