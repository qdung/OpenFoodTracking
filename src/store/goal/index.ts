import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  setGoalAlready: false,
  targetWeight: '0',
  rateOfWeightChange: '0',
  goalType: '',
  option: 0,
  submitDate: '',
};

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    setGoalStatus: (state, action) => {
      state.setGoalAlready = action.payload;
    },
    updateTargetWeight: (state, action) => {
      state.targetWeight = action.payload;
    },
    updateRateOfWeightChange: (state, action) => {
      state.rateOfWeightChange = action.payload;
    },
    updateGoalType: (state, action) => {
      state.goalType = action.payload;
    },
    updateDayOption: (state, action) => {
      state.option = action.payload;
    },
    setSubmitDate: (state, action) => {
      state.submitDate = action.payload;
    },
  },
});

export const {
  setGoalStatus,
  updateTargetWeight,
  updateRateOfWeightChange,
  updateGoalType,
  updateDayOption,
  setSubmitDate,
} = goalSlice.actions;
export default goalSlice.reducer;
