import { Label } from 'components';
import { memo, useEffect, useMemo, useState } from 'react';
import { Animated, Dimensions, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getBarcode } from 'selectors/app';
import { Colors, Fonts } from 'theme';
import axiosClient from 'utils/axios';
import { styles } from './style';

const { width } = Dimensions.get('window');
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

type IngredientType = {
  title: string;
  ingredients: {
    id: string;
    percent_estimate: number;
    percent_max: number;
    percent_min: number;
    text: string;
    vegan: string;
    vegetarian: string;
  }[];
};

const Card = ({}) => {
  return <Animated.View></Animated.View>;
};

export const IngredientReport = memo(({ foodInfo }: { foodInfo: any }) => {
  const foodIngredients = useMemo(() => {
    return [
      {
        title: 'Ingredients Details',
        ingredients: foodInfo.ingredients,
      },
      {
        title: 'Ingredients Details',
        ingredients:
          foodInfo?.ingredients_analysis_tags?.map((item) => {
            return {
              name: item,
              value: '-',
            };
          }) ?? [],
      },
    ];
  }, [foodInfo.ingredients, foodInfo.ingredients_analysis_tags]);

  console.log({ foodIngredients });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Label style={styles.subtitle}>Ingredients Details</Label>
          <View style={styles.divider} />
          {foodInfo?.ingredients?.map((item, index) => (
            <View
              style={[styles.rowSpace, { marginBottom: 5 }]}
              key={`ingredient-${index}`}
            >
              <Label style={styles.txt}>{item.text}</Label>
              <Label style={styles.txt}>
                {parseFloat(item.percent_estimate).toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })}
                %
              </Label>
            </View>
          ))}
        </View>
        <View style={styles.card}>
          <Label style={styles.subtitle}>Ingredients Analysis</Label>
          <View style={styles.divider} />
          {foodInfo?.ingredients_analysis_tags?.map((item: string, index) => (
            <Label key={`tag-${index}`} style={styles.txt}>
              {item.replaceAll('-', ' ').replace('en:', '')}
            </Label>
          ))}
        </View>
        <View style={styles.card}>
          <Label style={styles.subtitle}>Toxic Ingredients</Label>
          <View style={styles.divider} />
          <Label>Coming Soon...</Label>
          <Label style={styles.subtitle}>Origin</Label>
          <View style={styles.divider} />
          <Label>Coming Soon...</Label>
          <Label style={styles.subtitle}>Side Effect</Label>
          <View style={styles.divider} />
          <Label>Coming Soon...</Label>
        </View>
      </ScrollView>
    </View>
  );
});
