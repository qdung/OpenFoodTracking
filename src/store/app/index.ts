import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { IUser } from 'types/app';

interface InterfaceInitState {
  token: string | null;
  barcodeData: string;
  user: IUser | null;
  foodInfo: any;
  openMenu: boolean;
  cameraStatus: boolean;
  foods: any[];
  weightUnit: string;
  selectedDate: string;
}

const initialState: InterfaceInitState = {
  token: null,
  barcodeData: '',
  user: null,
  foodInfo: null,
  openMenu: false,
  cameraStatus: true,
  foods: [],
  weightUnit: 'lb',
  selectedDate: moment().format('YYYY-MM-DD'),
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateBarcode: (state, action: PayloadAction<string>) => {
      state.barcodeData = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateFoodInfo: (state, action) => {
      state.foodInfo = action.payload;
    },
    toggleMenu: (state) => {
      state.openMenu = !state.openMenu;
    },
    controlCamera: (state, action) => {
      state.cameraStatus = action.payload;
    },
    addFoodItem: (state, action) => {
      if (!state.foods) {
        state.foods = [];
        state.foods = [...state.foods, action.payload];
      } else {
        state.foods = [...state.foods, action.payload];
      }
    },
    resetFoodList: (state) => {
      state.foods = [];
      state.foodInfo = null;
    },
    updateActivityLevelFactor: (state, action) => {
      state.user = {
        ...state.user,
        activityLevelFactor: action.payload,
      };
    },
    removeFood: (state, action) => {
      state.foods = [...(state.foods as any[])].filter(
        (item) => item.id !== action.payload,
      );
    },
    swapWeightUnit: (state) => {
      state.weightUnit = state.weightUnit === 'lbs' ? 'kg' : 'lbs';
    },
    clearTrackingFood: (state, action) => {
      state.foods = state.foods.filter(
        (item) =>
          moment(item.createdAt).format('yyyy-MM-DD') !== action.payload,
      );
    },
    updateSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

// Actions
export const {
  updateToken,
  updateBarcode,
  updateUser,
  updateFoodInfo,
  toggleMenu,
  controlCamera,
  addFoodItem,
  resetFoodList,
  updateActivityLevelFactor,
  removeFood,
  swapWeightUnit,
  clearTrackingFood,
  updateSelectedDate,
} = appSlice.actions;
export default appSlice.reducer;
