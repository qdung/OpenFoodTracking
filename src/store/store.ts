import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { rootReducer } from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'goal'],
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
      },
    }),
});

const persistor = persistStore(store);

export const configureStores = () => {
  return { persistor, store };
};

export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;

export const useDispatch = () => useAppDispatch<AppDispatch>();

export type AppState = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;

// export const useAppDispatch = () => useDispatch()
