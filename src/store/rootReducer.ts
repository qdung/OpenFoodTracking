import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app';
import goalReducer from './goal';

export const rootReducer = combineReducers({
  app: appReducer,
  goal: goalReducer,
});
