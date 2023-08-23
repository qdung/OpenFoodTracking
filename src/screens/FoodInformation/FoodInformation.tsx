import { Back, Label, ModalCalendar } from 'components';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  Image,
} from 'react-native';
import { styles } from './style';
import { TabView } from 'react-native-tab-view';
import { NutritionReport } from './NutritionReport';
import { IngredientReport } from './IngredientsReport';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodInfo, getFoodList, getUserInfo } from 'selectors/app';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BackgroundImage } from 'components';
import moment from 'moment';
import { Colors, Fonts } from 'theme';
import { NavigationService, Routes } from 'navigation';
import { addFoodItem, removeFood, updateSelectedDate } from 'store/app';
import { Images } from 'assets';

export const FoodInformation = memo(({ route }) => {
  const { tab } = route.params;

  const foodInfo = useSelector(getFoodInfo);
  const userInfo = useSelector(getUserInfo);

  const dispatch = useDispatch();

  const layout = useWindowDimensions();

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'first':
        return <NutritionReport foodInfo={foodInfo} />;
      case 'second':
        return <IngredientReport foodInfo={foodInfo} />;
      default:
        return null;
    }
  };

  const nutrients = useMemo(() => {
    let nutrient: any = {};
    const _nutrients = Object.entries(foodInfo?.nutriments).filter(
      (item) =>
        (item[0].toLowerCase().includes('_serving') ||
          item[0].toLowerCase().includes('_value')) &&
        (item[1] as number) > 0 &&
        (item[1] as string) !== '',
    );
    _nutrients.map((item) => {
      const key = item[0].toLowerCase();
      const value = item[1] as number;
      nutrient[key] = value;
    });
    console.log(nutrient);
    return nutrient;
  }, [foodInfo]);

  const removeFoodFromList = useCallback(() => {
    dispatch(removeFood(foodInfo.id));
  }, [foodInfo]);

  const [index, setIndex] = useState(tab);
  const [routes] = useState([
    { key: 'first', title: 'Nutrition Facts Report' },
    { key: 'second', title: 'Ingredients Report' },
  ]);

  useEffect(() => {
    console.log('code:', foodInfo?.code);
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Back />
      <Label style={styles.title}>
        {foodInfo ? routes[index].title : 'Food Information'}
      </Label>
      <TouchableOpacity
        // onPress={removeFoodFromList}
        hitSlop={{ left: 15, top: 15, right: 15, bottom: 15 }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          paddingRight: 20,
          paddingTop: 10,
        }}
      >
        <Feather name="trash-2" color="red" size={24} />
      </TouchableOpacity>
      <Label
        style={{
          textAlign: 'center',
          fontFamily: Fonts.semibold,
          marginBottom: 10,
          marginTop: -25,
          fontSize: 24,
          color: Colors.yellow,
          textTransform: 'uppercase',
        }}
      >
        {foodInfo?.name}
      </Label>
      {foodInfo ? (
        <>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            sceneContainerStyle={{ paddingHorizontal: 10 }}
            renderTabBar={() => <></>}
          />
          <View
            style={[
              styles.rowSpace,
              { paddingHorizontal: 10, alignSelf: 'flex-end', marginTop: 10 },
            ]}
          >
            {userInfo ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  dispatch(
                    addFoodItem({
                      ...foodInfo,
                      nutriments: nutrients,
                      createdAt: moment().toISOString(),
                    }),
                  );
                  dispatch(updateSelectedDate(moment().format('YYYY-MM-DD')));
                  NavigationService.replace(Routes.FoodTracking);
                }}
              >
                <Label style={{ fontFamily: Fonts.semibold }}>Add</Label>
                <Image
                  source={Images.foodAdd}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'cover',
                    marginLeft: 5,
                    bottom: 5,
                  }}
                />
                {/* <Ionicons
                  name="fast-food-outline"
                  color={'white'}
                  size={30}
                  style={{ marginLeft: 5, bottom: 5 }}
                /> */}
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
          {index === 1 ? (
            <TouchableOpacity
              style={{ position: 'absolute', top: '50%', left: 5 }}
              onPress={() => setIndex(0)}
            >
              <Feather name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIndex(1)}
              style={{ position: 'absolute', top: '50%', right: 5 }}
            >
              <Feather name="chevron-right" size={32} color="white" />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Label
          style={{
            position: 'absolute',
            top: '50%',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 24,
          }}
        >
          No food added{'\n'}for tracking
        </Label>
      )}
    </View>
  );
});
