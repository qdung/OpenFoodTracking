import {
  NutriScore_A,
  NutriScore_B,
  NutriScore_C,
  NutriScore_D,
  NutriScore_E,
} from 'assets/svg';
import { Label } from 'components';
import { memo, useMemo, useState } from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserInfo } from 'selectors/app';
import { styles } from './style';
import { dailyValues } from 'utils';
import { Fonts } from 'theme';

export const NutritionReport = memo(({ foodInfo }: { foodInfo: any }) => {
  const nutriScore = foodInfo?.nutriscore_grade?.toLowerCase();

  const user = useSelector(getUserInfo);
  const age = user?.age as number;
  const gender = user?.gender;

  const [highlight, setHighLight] = useState(-1);

  const lookupTable: any = {};
  dailyValues.nutrients_serving.forEach((nutrient) => {
    lookupTable[nutrient.name] = nutrient.dailyValue;
  });
  dailyValues.nutrients_value.forEach((nutrient) => {
    lookupTable[nutrient.name] = nutrient.dailyValue;
  });

  // Calculate custom daily recommended values
  const calculateCustomValues = useMemo(() => {
    // Determine gender-based factors
    let genderFactor: any = {};
    if (gender === 'Male') {
      Object.keys(lookupTable).forEach((nutrient) => {
        genderFactor[nutrient] = 1.0;
      });
    } else {
      Object.keys(lookupTable).forEach((nutrient) => {
        genderFactor[nutrient] = nutrient === 'Iron' ? 1.1 : 0.9;
      });
    }

    // Determine activity-based factors
    let activityFactor: any = {};
    if (user?.activityLevelFactor === '1') {
      Object.keys(lookupTable).forEach((nutrient) => {
        activityFactor[nutrient] = 1.2;
      });
    } else if (user?.activityLevelFactor === '2') {
      Object.keys(lookupTable).forEach((nutrient) => {
        activityFactor[nutrient] = 1.375;
      });
    } else if (user?.activityLevelFactor === '3') {
      Object.keys(lookupTable).forEach((nutrient) => {
        activityFactor[nutrient] = 1.55;
      });
    } else {
      Object.keys(lookupTable).forEach((nutrient) => {
        activityFactor[nutrient] = 1.9;
      });
    }

    // Calculate custom values
    const customValues: any = {};
    Object.keys(lookupTable).forEach((nutrient) => {
      if (nutrient === 'Calories') {
        // Special case for calories
        customValues[nutrient] =
          lookupTable[nutrient] *
          genderFactor[nutrient] *
          activityFactor[nutrient];
      } else {
        if (genderFactor.hasOwnProperty(nutrient)) {
          customValues[nutrient] =
            lookupTable[nutrient] *
            genderFactor[nutrient] *
            activityFactor[nutrient];
        } else {
          // Apply age-based factors for nutrients not affected by gender
          let ageFactor;
          if (age <= 3) {
            ageFactor = 0.5;
          } else if (age <= 8) {
            ageFactor = 0.7;
          } else if (age <= 13) {
            ageFactor = 0.9;
          } else if (age <= 18) {
            ageFactor = 1.0;
          } else {
            ageFactor = 1.0;
          }
          customValues[nutrient] =
            lookupTable[nutrient] * ageFactor * activityFactor[nutrient];
        }
      }
    });

    return customValues;
  }, [user]);

  const nutrients = useMemo(() => {
    let nutrient: any = {};
    const _nutrients = Object.entries(foodInfo?.nutriments).filter(
      (item) =>
        (item[0].toLowerCase().includes('_serving') ||
          item[0].toLowerCase().includes('_value')) &&
        (item[1] as number) > 0 &&
        !item[0].toLowerCase().includes('energy') &&
        !item[0].toLowerCase().includes('fat') &&
        (item[1] as string) !== '',
    );
    _nutrients.map((item) => {
      const key = item[0].toLowerCase();
      // item[0].toLowerCase().includes('_value')
      //   ? item[0].toLowerCase().replace('_value', '_serving')
      //   : item[0].toLowerCase();
      const value = item[1] as number;
      nutrient[key] =
        key.toLowerCase().includes('vitamin') ||
        key.toLowerCase() === 'calcium_serving' ||
        key.toLowerCase() === 'magnesium_serving' ||
        key.toLowerCase() === 'copper_serving' ||
        key.toLowerCase() === 'potassium_serving' ||
        key.toLowerCase() === 'iron_serving' ||
        key.toLowerCase() === 'sodium_serving'
          ? value * 1000
          : value;
    });
    console.log(nutrient);
    return nutrient;
  }, [foodInfo]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: Platform.isPad ? 'row' : 'column',
            alignSelf: 'center',
          }}
        >
          {nutriScore === 'a' ? (
            <>
              <NutriScore_A />
              <Label style={[styles.nutriScore, { color: '#2D7E43' }]}>
                Very nutritious - the healthiest food option with the lowest
                amount of unhealthy ingredients.
              </Label>
            </>
          ) : nutriScore === 'b' ? (
            <>
              <NutriScore_B />
              <Label style={[styles.nutriScore, { color: '#97BA38' }]}>
                Fairly nutritious - mostly healthy food option with a moderate
                amount of unhealthy ingredients.
              </Label>
            </>
          ) : nutriScore === 'c' ? (
            <>
              <NutriScore_C />
              <Label style={[styles.nutriScore, { color: '#F0CA0E' }]}>
                Moderately nutritious - somewhat healthy food option with higher
                amount of unhealthy ingredients.
              </Label>
            </>
          ) : nutriScore === 'd' ? (
            <>
              <NutriScore_D />
              <Label style={[styles.nutriScore, { color: '#D57B1A' }]}>
                Less nutritious - less healthy food option with higher amount of
                unhealthy ingredients.
              </Label>
            </>
          ) : (
            <>
              <NutriScore_E />
              <Label style={[styles.nutriScore, { color: '#C53419' }]}>
                Least nutritious - The least healthy food option with the
                highest amount of unhealthy ingredients.
              </Label>
            </>
          )}
        </View>
        <View style={styles.card}>
          <Label style={styles.subtitle}>Nutrition Levels</Label>
          <View style={styles.divider} />
          {foodInfo?.nutrient_levels &&
            Object.entries(foodInfo.nutrient_levels).map(
              (item: [string, any], index: number) => (
                <View style={styles.rowSpace} key={item[0] + index}>
                  <Label style={styles.txt}>{item[0].replace('-', ' ')}</Label>
                  <Label
                    style={[
                      styles.txt,
                      item[1].toLowerCase().includes('high') && {
                        color: 'yellow',
                      },
                    ]}
                  >
                    {item[1]}
                  </Label>
                </View>
              ),
            )}
        </View>
        <View style={styles.card}>
          <Label style={styles.subtitle}>Total Nutritions</Label>
          <Label style={{ fontSize: 12 }}>(Amount Per Serving)</Label>
          {/* <Label style={styles.subtitle}>{nutrients}</Label> */}
          <View style={[styles.row, { marginTop: 5 }]}>
            <View style={{ width: '40%' }}>
              <Label style={[styles.txtLabel]}>Micronutrients</Label>
            </View>
            <View style={{ width: '30%' }}>
              <Label style={[styles.txtLabel, { textAlign: 'right' }]}>
                Data
              </Label>
            </View>
            <View style={{ width: '30%' }}>
              <Label style={[styles.txtLabel, { textAlign: 'right' }]}>
                %Daily
              </Label>
            </View>
          </View>
          <View style={styles.divider} />
          {foodInfo?.nutriments['energy-kcal_serving'] > 0 ? (
            <>
              <View style={[styles.row, { marginBottom: 5 }]}>
                <View style={{ width: '40%' }}>
                  <Label style={[styles.txt, { fontFamily: Fonts.semibold }]}>
                    Calories
                  </Label>
                </View>
                <View style={{ width: '30%' }}>
                  <Label
                    style={[
                      styles.txt,
                      { textAlign: 'right', fontFamily: Fonts.semibold },
                    ]}
                  >
                    {foodInfo?.nutriments['energy-kcal_serving'].toFixed(0)}
                    (kcal)
                  </Label>
                </View>
                <View style={{ width: '30%' }}>
                  <Label
                    style={[
                      styles.txt,
                      { textAlign: 'right', fontFamily: Fonts.semibold },
                    ]}
                  >
                    {(
                      (foodInfo?.nutriments['energy-kcal_serving'] / 2000) *
                      100
                    ).toFixed(2)}
                    %
                  </Label>
                </View>
              </View>
              {foodInfo?.nutriments?.fat_serving ? (
                <View style={[styles.row, { marginBottom: 5 }]}>
                  <View style={{ width: '40%' }}>
                    <Label style={[styles.txt, { fontFamily: Fonts.semibold }]}>
                      Total Fat
                    </Label>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Label
                      style={[
                        styles.txt,
                        { textAlign: 'right', fontFamily: Fonts.semibold },
                      ]}
                    >
                      {foodInfo?.nutriments?.fat_serving}(g)
                    </Label>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Label
                      style={[
                        styles.txt,
                        { textAlign: 'right', fontFamily: Fonts.semibold },
                      ]}
                    >
                      {((foodInfo?.nutriments?.fat_serving / 78) * 100).toFixed(
                        2,
                      )}
                      %
                    </Label>
                  </View>
                </View>
              ) : null}
            </>
          ) : (
            <>
              <View style={[styles.row, { marginBottom: 5 }]}>
                <View style={{ width: '40%' }}>
                  <Label style={[styles.txt, { fontFamily: Fonts.semibold }]}>
                    Calories per serving
                  </Label>
                </View>
                <View style={{ width: '30%' }}>
                  <Label
                    style={[
                      styles.txt,
                      { textAlign: 'right', fontFamily: Fonts.semibold },
                    ]}
                  >
                    {foodInfo?.nutriments['energy-kcal_value'].toFixed(0)}
                    (kcal)
                  </Label>
                </View>
                <View style={{ width: '30%' }}>
                  <Label
                    style={[
                      styles.txt,
                      { textAlign: 'right', fontFamily: Fonts.semibold },
                    ]}
                  >
                    {(
                      (foodInfo?.nutriments['energy-kcal_value'] / 2000) *
                      100
                    ).toFixed(2)}
                    %
                  </Label>
                </View>
              </View>
              {foodInfo?.nutriments?.fat_value ? (
                <View style={[styles.row, { marginBottom: 5 }]}>
                  <View style={{ width: '40%' }}>
                    <Label style={[styles.txt, { fontFamily: Fonts.semibold }]}>
                      Total Fat
                    </Label>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Label
                      style={[
                        styles.txt,
                        { textAlign: 'right', fontFamily: Fonts.semibold },
                      ]}
                    >
                      {foodInfo?.nutriments?.fat_serving}(g)
                    </Label>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Label
                      style={[
                        styles.txt,
                        { textAlign: 'right', fontFamily: Fonts.semibold },
                      ]}
                    >
                      {((foodInfo?.nutriments?.fat_serving / 78) * 100).toFixed(
                        2,
                      )}
                      %
                    </Label>
                  </View>
                </View>
              ) : null}
            </>
          )}
          <View style={[styles.divider, { marginBottom: 5, marginTop: -12 }]} />
          {(foodInfo?.nutriments as Object).hasOwnProperty(
            'energy-kcal_serving',
          )
            ? dailyValues.nutrients_serving
                .sort(
                  (a, b) => a.name.toLowerCase()[0] > b.name.toLowerCase()[0],
                )
                .map((item, index) => {
                  const lookupTable: any = {};
                  dailyValues.nutrients_serving.forEach((nutrient) => {
                    lookupTable[nutrient.name.toLowerCase()] =
                      nutrient.dailyValue;
                  });

                  const foodDailyValue = Object.entries(nutrients).filter(
                    (foodItem) =>
                      foodItem[0].toLowerCase() === item.name.toLowerCase(),
                  );

                  let percentDailyValue = 0;
                  if (foodDailyValue[0]) {
                    const dailyValue =
                      lookupTable[foodDailyValue[0][0].toLowerCase()];
                    const nutrientValue: any = foodDailyValue[0][1];
                    percentDailyValue =
                      (parseFloat(nutrientValue) / parseFloat(dailyValue)) *
                      100;
                  }
                  // const percentDailyValue = foodDailyValue / dailyValue * 100;

                  return (
                    foodDailyValue[0] !== undefined && (
                      <TouchableOpacity
                        onPress={() => setHighLight(index)}
                        style={[styles.row, { marginBottom: 5 }]}
                        key={`nutri-${index}`}
                      >
                        <View style={{ width: '40%' }}>
                          <Label
                            style={[
                              styles.txt,
                              highlight === index ? styles.select : {},
                            ]}
                          >
                            {item.name.toLowerCase() === 'energy-kcal'
                              ? 'Calories'
                              : item.name
                                  .replaceAll('-', ' ')
                                  .replaceAll('_serving', '')}
                          </Label>
                        </View>
                        <View style={[{ width: '30%' }]}>
                          <Label
                            style={[
                              styles.txt,
                              { textAlign: 'right' },
                              highlight === index ? styles.select : {},
                            ]}
                          >
                            {parseFloat(
                              foodDailyValue[0][1] as string,
                            ).toLocaleString('en-US', {
                              maximumFractionDigits: 1,
                            })}
                            <Label
                              style={[
                                { textTransform: 'lowercase' },
                                highlight === index ? styles.select : {},
                              ]}
                            >
                              ({item.unit})
                            </Label>
                            {/* {foodDailyValue[0]
                              ? foodDailyValue[0][0]
                                  .toLowerCase()
                                  .includes('sodium') ||
                                foodDailyValue[0][0]
                                  .toLowerCase()
                                  .includes('calcium') ||
                                foodDailyValue[0][0].includes('potassium') ||
                                foodDailyValue[0][0].includes('magnesium') ||
                                foodDailyValue[0][0].includes('iron') ||
                                foodDailyValue[0][0].includes('copper') ||
                                foodDailyValue[0][0].includes('vitamin')
                                ? parseFloat(
                                    `${foodDailyValue[0][1] * 1000}`,
                                  ).toLocaleString('en-US', {
                                    maximumFractionDigits: 1,
                                  }) + `(${item.unit})`
                                : parseFloat(
                                    foodDailyValue[0][1] as string,
                                  ).toLocaleString('en-US', {
                                    maximumFractionDigits: 1,
                                  }) + `(${item.unit})`
                              : '-'} */}
                          </Label>
                        </View>
                        <View style={[{ width: '30%' }]}>
                          <Label
                            style={[
                              styles.txt,
                              { textAlign: 'right' },
                              highlight === index ? styles.select : {},
                            ]}
                          >
                            {!isNaN(percentDailyValue)
                              ? percentDailyValue.toLocaleString('en-US', {
                                  maximumFractionDigits: 2,
                                }) + '%'
                              : '0%'}
                          </Label>
                        </View>
                      </TouchableOpacity>
                    )
                  );
                })
            : dailyValues.nutrients_value
                .sort(
                  (a, b) => a.name.toLowerCase()[0] > b.name.toLowerCase()[0],
                )
                .map((item, index) => {
                  const lookupTable: any = {};
                  dailyValues.nutrients_value.forEach((nutrient) => {
                    lookupTable[nutrient.name.toLowerCase()] =
                      nutrient.dailyValue;
                  });

                  const foodDailyValue = Object.entries(
                    foodInfo.nutriments,
                  ).filter(
                    (foodItem) =>
                      foodItem[0].toLowerCase() === item.name.toLowerCase(),
                  );

                  let percentDailyValue = 0;
                  if (foodDailyValue[0]) {
                    const dailyValue =
                      lookupTable[foodDailyValue[0][0].toLowerCase()];
                    const nutrientValue: any =
                      foodDailyValue[0][0].toLowerCase().includes('sodium') ||
                      foodDailyValue[0][0]
                        .toLowerCase()
                        .includes('magnesium') ||
                      foodDailyValue[0][0].toLowerCase().includes('copper') ||
                      foodDailyValue[0][0].toLowerCase().includes('vitamin') ||
                      foodDailyValue[0][0]
                        .toLowerCase()
                        .includes('potassium') ||
                      foodDailyValue[0][0].toLowerCase().includes('calcium') ||
                      foodDailyValue[0][0].toLowerCase().includes('iron')
                        ? parseFloat(foodDailyValue[0][1]) * 1000
                        : foodDailyValue[0][1];
                    percentDailyValue =
                      (parseFloat(nutrientValue) / parseFloat(dailyValue)) *
                      100;
                  }
                  // const percentDailyValue = foodDailyValue / dailyValue * 100;

                  return (
                    foodDailyValue[0] !== undefined &&
                    foodDailyValue[0][1] > 0 && (
                      <TouchableOpacity
                        onPress={() => setHighLight(index)}
                        style={[styles.row, { marginBottom: 5 }]}
                        key={`nutri-${index}`}
                      >
                        <View style={{ width: '40%' }}>
                          <Label
                            style={[
                              styles.txt,
                              highlight === index ? styles.select : {},
                            ]}
                          >
                            {item.name
                              .replaceAll('-', ' ')
                              .replaceAll('_value', '')}
                          </Label>
                        </View>
                        <View
                          style={[
                            { width: '30%' },
                            highlight === index ? styles.select : {},
                          ]}
                        >
                          <Label
                            style={[
                              styles.txt,
                              { textAlign: 'right' },
                              highlight === index ? styles.select : {},
                            ]}
                          >
                            {foodDailyValue[0]
                              ? foodDailyValue[0][0]
                                  .toLowerCase()
                                  .includes('sodium') ||
                                foodDailyValue[0][0]
                                  .toLowerCase()
                                  .includes('calcium') ||
                                foodDailyValue[0][0].includes('potassium') ||
                                foodDailyValue[0][0].includes('magnesium') ||
                                foodDailyValue[0][0].includes('iron') ||
                                foodDailyValue[0][0].includes('copper') ||
                                foodDailyValue[0][0].includes('vitamin')
                                ? parseFloat(
                                    `${foodDailyValue[0][1] * 1000}`,
                                  ).toLocaleString('en-US', {
                                    maximumFractionDigits: 1,
                                  }) + `(${item.unit})`
                                : parseFloat(
                                    foodDailyValue[0][1] as string,
                                  ).toLocaleString('en-US', {
                                    maximumFractionDigits: 1,
                                  }) + `(${item.unit})`
                              : '-'}
                          </Label>
                        </View>
                        <View style={[{ width: '30%' }]}>
                          <Label
                            style={[
                              styles.txt,
                              { textAlign: 'right' },
                              highlight === index ? styles.select : {},
                            ]}
                          >
                            {!isNaN(percentDailyValue)
                              ? percentDailyValue.toLocaleString('en-US', {
                                  maximumFractionDigits: 2,
                                }) + '%'
                              : '0%'}
                          </Label>
                        </View>
                      </TouchableOpacity>
                    )
                  );
                })}
        </View>
      </ScrollView>
      <Label style={{ textAlign: 'center' }}>
        Report: {foodInfo?.nutrition_score_debug}
      </Label>
    </View>
  );
});
