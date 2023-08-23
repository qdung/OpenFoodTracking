import { Back, Label, SafeAreaViewProvider } from 'components';
import { t } from 'i18next';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  ViewToken,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { scaleWidth } from 'utils';
import { Colors } from 'theme';
import { NavigationService, Routes } from 'navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import { styles } from '../style';

export const AskHeight = memo(
  ({
    height,
    onChangeHeight,
    setStep,
  }: {
    height: number;
    onChangeHeight: (height: number) => void;
    setStep: () => void;
  }) => {
    const heights = _.range(100, 250);

    const onViewableItemsChanged = useCallback(
      ({
        viewableItems,
        changed,
      }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
      }) => {
        const indexList = viewableItems.map((item) => item.index);
        const middle = indexList[4];
        onChangeHeight(100 + (middle as number));
      },
      [height],
    );

    const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);
    const scrollRef = useRef<FlatList>(null);

    return (
      <View>
        <FlatList
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={{
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95,
          }}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          initialScrollIndex={height - 100}
          // getItemLayout={(data, index) => ({
          //   length: 40 * index,
          //   offset: 40 * index,
          //   index,
          // })}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              scrollRef.current?.scrollToIndex({
                index: height - 100,
                animated: true,
                viewPosition: 1,
              });
            });
          }}
          ind
          data={heights}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.heightContainer}
              onPress={() => onChangeHeight(item)}
            >
              <Label>{item}</Label>
            </TouchableOpacity>
          )}
          style={{
            marginTop: 10,
            height: 250,
          }}
          contentContainerStyle={{ alignSelf: 'center', flexGrow: 1 }}
        />
        <Label style={{ alignSelf: 'center' }}>{height}</Label>
        <TouchableOpacity
          style={[styles.btnNext, { marginTop: 20 }]}
          onPress={setStep}
        >
          <Label style={{ color: 'black', textAlign: 'center' }}>Next</Label>
        </TouchableOpacity>
      </View>
    );
  },
);
