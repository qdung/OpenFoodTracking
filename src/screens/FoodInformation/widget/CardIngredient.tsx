import { Label } from 'components';
import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { scaleHeight } from 'utils';

export const MARGIN = 16;
export const CARD_HEIGHT = scaleHeight(70) + MARGIN * 2;
const { height: wHeight } = Dimensions.get('window');
const height = wHeight - 64;
const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
    alignSelf: 'center',
  },
});

const CardIngredient = ({ title, ingredient, y, index }: any) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: 'clamp',
      }),
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp',
    }),
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <Animated.View
      style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
      <Label style={styles.subtitle}>{ingredient.title}</Label>
      <View style={styles.divider} />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {ingredient.type === 'detail' &&
          ingredient.ingredients.map((item, _index) => (
            <View
              style={[styles.rowSpace, { marginBottom: 5 }]}
              key={`ingredient-${_index}`}
            >
              <Label style={styles.txt}>{item.text}</Label>
              <Label style={styles.txt}>
                {parseFloat(`${item.percent_estimate}`).toLocaleString(
                  'en-US',
                  {
                    maximumFractionDigits: 2,
                  },
                )}
                %
              </Label>
            </View>
          ))}
      </ScrollView>
    </Animated.View>
  );
};

export default CardIngredeient;
