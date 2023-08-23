import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'theme';

export interface ISafeAreaViewProviderProps {
  children: React.ReactNode;
}

export const SafeAreaViewProvider = ({
  children,
}: ISafeAreaViewProviderProps) => (
  <>
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="light-content" />
      {children}
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.main,
  },
});
