import { memo } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { Colors } from 'theme';
import { scaleWidth } from 'utils';
import { Label } from './Label';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
    name: string;
    description: string;
  };
  onPress: () => void;
};

export const CardFood = memo(
  ({ item, viewableItems, onPress }: ListItemProps) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id),
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, []);

    return (
      <Animated.View style={[styles.foodContainer]}>
        <TouchableOpacity onPress={onPress}>
          <View>
            <Label numberOfLines={1} style={styles.name}>
              {item.name}
            </Label>
            <Label numberOfLines={1} style={styles.name}>
              {item.description ?? 'No description'}
            </Label>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  foodContainer: {
    borderRadius: 12,
    borderColor: Colors.neonViolet,
    backgroundColor: 'rgba(200,200,200,1)',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  img: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    resizeMode: 'cover',
    alignItems: 'center',
    padding: 10,
  },
  name: {
    width: scaleWidth(50),
    color: 'black',
  },
});
