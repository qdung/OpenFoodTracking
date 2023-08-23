import { keyBy } from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';
import type { RootState } from 'store/store';
import { dailyValues, height } from 'utils';

const node = (state: RootState) => state.app;

export const getToken = createSelector(node, (state) => state.token);
export const getBarcode = createSelector(node, (state) => state.barcodeData);
export const getUserInfo = createSelector(node, (state) => state.user);
export const getFoodInfo = createSelector(node, (state) => state.foodInfo);
export const getMenuStatus = createSelector(node, (state) => state.openMenu);

export const getCameraStatus = createSelector(
  node,
  (state) => state.cameraStatus,
);
export const getBMI = createSelector(node, (state) => {
  const height = parseInt((state.user as any).height) / 100;
  const weight = (state.user as any).weight / 2.205;
  const bmi = height > 0 && weight ? weight / Math.pow(height, 2) : 0;
  return bmi.toLocaleString('en-US', { maximumFractionDigits: 1 });
});
export const getWeightUnit = createSelector(node, (state) => state.weightUnit);
export const getFoodList = createSelector(node, (state) => state.foods ?? []);
export const getSelectedDate = createSelector(
  node,
  (state) => state.selectedDate,
);

export const getFilterNutriment = createSelector(node, (state) => {
  const selectedDate = state.selectedDate;
  const _foods =
    state.foods !== undefined
      ? [...state.foods]
          ?.filter(
            (item) =>
              moment(item.createdAt).format('YYYY-MM-DD') === selectedDate,
          )
          .map((food) => food?.nutriments)
      : [];

  console.log(_foods);

  const total = _foods.reduce(
    (r, o) => (
      o && Object.entries(o).forEach(([k, v]) => (r[k] = (r[k] || 0) + v)), r
    ),
    {},
  );

  let filter = Object.entries(total)
    .filter(
      (item) =>
        item[0].toLowerCase().includes('_serving') &&
        !item[0].toLowerCase().includes('fruits-vegetables') &&
        !item[0].toLowerCase().includes('nova') &&
        item[0].toLowerCase() !== 'energy_serving',
    )
    .map((item) => {
      return {
        name: item[0],
        value: item[1],
      };
    })
    .map((item) => {
      const _dailyValue = dailyValues.nutrients_serving.find(
        (_dailyValue) =>
          _dailyValue.name.toLowerCase() === item.name.toLowerCase(),
      )?.dailyValue;

      return {
        ...item,
        unit:
          dailyValues.nutrients_serving.find(
            (_dailyValue) =>
              _dailyValue.name.toLowerCase() === item.name.toLowerCase(),
          )?.unit ?? null,
        // daily: 0,
        daily:
          item.value > 0
            ? item.name.toLowerCase().includes('sodium') ||
              item.name.toLowerCase().includes('calcium') ||
              item.name.toLowerCase().includes('potassium') ||
              item.name.toLowerCase().includes('iron')
              ? ((item.value * 1000) / _dailyValue) * 100
              : (item.value / _dailyValue) * 100
            : 0,
      };
    })
    .filter((item) => item.value > 0);
  return filter;
});
