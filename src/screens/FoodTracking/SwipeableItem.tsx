import { Label } from 'components';
import React, { useRef } from 'react';
import {
  Swipeable,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors } from 'theme';

interface ItemType {
  children: JSX.Element;
  onDelete: () => void;
}

export const SwipeableItem = ({ children, onDelete }: ItemType) => {
  const swipeableRef = useRef<Swipeable | null>(null);

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 10,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={onDelete}
          style={{
            borderRadius: 16,
            width: 80,
            height: '90%',
            alignItems: 'center',
            borderWidth: 2,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}
        >
          <Label>Delete</Label>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={rightSwipeActions}
        // onSwipeableOpen={() => closeRow()}
        // onSwipeableWillOpen={handleSwipeableWillOpen}
        ref={swipeableRef}
        rightThreshold={40}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
};
