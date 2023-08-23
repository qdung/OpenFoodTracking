import { Back, BackgroundImage, Label, ModalCalendar } from 'components';
import React, { memo, useMemo, useRef, useState } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { styles } from './style';
import { Fonts } from 'theme';
import { NavigationService, Routes } from 'navigation';
import { useSelector } from 'react-redux';
import {
  getFilterNutriment,
  getFoodList,
  getSelectedDate,
} from 'selectors/app';
import { dispatch } from 'store/store';
import {
  clearTrackingFood,
  updateFoodInfo,
  updateSelectedDate,
} from 'store/app';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Animated from 'react-native-reanimated';
import { DateData } from 'react-native-calendars';
import { Images } from 'assets';
import { width } from 'utils';

const ITEM_SIZE = 100 + 10 * 3;

export const FoodTracking = memo(() => {
  const foodList = useSelector(getFoodList);
  const nutriments = useSelector(getFilterNutriment);
  const selectedDate =
    useSelector(getSelectedDate) ?? moment().format('yyyy-MM-DD');

  const [highlight, setHighlight] = useState(-1);

  const [modalCalendar, setModalCalendar] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const activeDates = useMemo(() => {
    let _dates: string[] = [];
    if (foodList?.length > 0) {
      _dates = foodList?.map((item: any) => item?.createdAt);
    }

    return _dates;
  }, [foodList]);

  const fiterFoodList = useMemo(() => {
    const _foodList =
      foodList !== undefined
        ? foodList?.length > 0
          ? [...foodList]?.filter(
              (item) =>
                moment(item.createdAt).format('yyyy-MM-DD') === selectedDate,
            )
          : []
        : [];
    return _foodList;
  }, [foodList, selectedDate]);

  const totalDailyValue = useMemo(() => nutriments, [nutriments, selectedDate]);

  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Back />
      <Label style={styles.title}>Food Tracking</Label>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          paddingRight: 20,
          paddingTop: 15,
        }}
        onPress={() => setModalCalendar(true)}
      >
        <FontAwesome name="calendar" color="white" size={24} />
      </TouchableOpacity>
      <Animated.FlatList
        data={(fiterFoodList as any[]) ?? []}
        contentContainerStyle={{ paddingBottom: 150 }}
        keyExtractor={(item, index) => `item+${index}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        extraData={foodList}
        initialNumToRender={20}
        updateCellsBatchingPeriod={500}
        maxToRenderPerBatch={20}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Label
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: '40%',
              fontSize: Platform.OS === 'ios' ? 16 : 18,
              lineHeight: Platform.OS === 'ios' ? 24 : 32,
              fontFamily: Fonts.medium,
            }}
          >
            There are no food available{'\n'}Please scan a food barcode
          </Label>
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={[styles.foodContainer, { transform: [{ scale }] }]}
            >
              <TouchableOpacity
                onPress={() => {
                  dispatch(updateFoodInfo(item));
                  NavigationService.navigate(Routes.FoodInformation, {
                    tab: 0,
                  });
                }}
              >
                <ImageBackground
                  source={Images.food}
                  imageStyle={{
                    opacity: 0.1,
                    resizeMode: 'cover',
                    width: width,
                  }}
                  style={{
                    width: '100%',
                    height: 100,
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }}
                  >
                    <Label numberOfLines={1} style={styles.name}>
                      {item.name}
                    </Label>
                    <Label numberOfLines={1} style={styles.desciption}>
                      {item.description ?? 'No description'}
                    </Label>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              {/* </SwipeableItem> */}
            </Animated.View>
            // </SwipeableItem>
          );
        }}
      />
      {totalDailyValue.length > 0 ? (
        <>
          <Label
            style={{
              marginVertical: 5,
              fontFamily: Fonts.medium,
              fontSize: 15,
              textDecorationLine: 'underline',
            }}
          >
            Macronutrient
          </Label>
          <Animated.FlatList
            style={{ height: 150 }}
            contentContainerStyle={{ paddingBottom: 50 }}
            data={totalDailyValue}
            extraData={nutriments}
            keyExtractor={(item, index) => `macronutrient-${index}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.rowSpace, { marginBottom: 5 }]}
                onPress={() => setHighlight(index)}
              >
                <Label
                  style={[
                    {
                      fontSize: 13,
                      width: '33%',
                      textTransform: 'capitalize',
                    },
                    highlight === index && styles.highlight,
                  ]}
                >
                  {item?.name.toLowerCase().includes('energy')
                    ? 'Calories'
                    : item.name.replace('_serving', '')}
                </Label>
                <Label
                  style={[
                    {
                      width: '33%',
                      textAlign: 'right',
                    },
                    highlight === index && styles.highlight,
                  ]}
                >
                  {item.name.toLowerCase().includes('sodium') ||
                  item.name.toLowerCase().includes('calcium') ||
                  item.name.toLowerCase().includes('magnesium') ||
                  item.name.toLowerCase().includes('copper') ||
                  item.name.toLowerCase().includes('iron') ||
                  item.name.toLowerCase().includes('potassium')
                    ? (item?.value * 1000).toLocaleString('en-Us', {
                        maximumFractionDigits: 2,
                      })
                    : item.value.toLocaleString('en-Us', {
                        maximumFractionDigits: 2,
                      })}
                  ({item?.unit})
                  {/* {(item?.value as number).toFixed(2)}({item?.unit}) */}
                </Label>
                <Label
                  style={[
                    {
                      width: '30%',
                      textAlign: 'right',
                    },
                    highlight === index && styles.highlight,
                  ]}
                >
                  {item?.daily && isFinite(item.daily)
                    ? item.name.toLowerCase() === 'calcium' ||
                      item.name.toLowerCase() === 'potassium' ||
                      item.name.toLowerCase() === 'iron'
                      ? ((item?.daily / 1000) as number).toFixed(2)
                      : (item?.daily as number).toFixed(2)
                    : 0}
                  %
                </Label>
              </TouchableOpacity>
            )}
          />
        </>
      ) : null}

      <View
        style={{
          marginVertical: 5,
        }}
      >
        <View style={styles.rowSpace}>
          <Label
            style={{
              fontFamily: Fonts.medium,
              fontSize: 15,
              textAlign: 'center',
            }}
          >
            Date: {selectedDate}
          </Label>
          <TouchableOpacity
            onPress={() => dispatch(clearTrackingFood(selectedDate))}
            style={styles.row}
          >
            <MaterialIcons
              name="clear-all"
              size={24}
              color="white"
              style={{ bottom: 2, right: 3 }}
            />
            <Label>Clear current date</Label>
          </TouchableOpacity>
        </View>
      </View>
      <ModalCalendar
        visible={modalCalendar}
        close={() => setModalCalendar(false)}
        callback={(date: DateData) =>
          dispatch(updateSelectedDate(date.dateString))
        }
        activeDates={activeDates}
      />
    </View>
  );
});
