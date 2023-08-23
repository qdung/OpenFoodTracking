import { keyBy } from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';
import type { RootState } from 'store/store';
import { dailyValues, height } from 'utils';

const node = (state: RootState) => state.goal;

export const getTargetWeight = createSelector(
  node,
  (state) => state.targetWeight ?? '0',
);
export const getRateWeightChange = createSelector(
  node,
  (state) => state.rateOfWeightChange,
);
export const getGoalType = createSelector(node, (state) => state.goalType);
export const getSelectOption = createSelector(node, (state) => state.option);
export const getSubmitGoalDate = createSelector(
  node,
  (state) => state.submitDate,
);

export const isSetGoalAlready = createSelector(node, (state) =>
  state.setGoalAlready ? true : false,
);
