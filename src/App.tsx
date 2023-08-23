import React, { Suspense, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import { Navigator } from 'navigation';
import { configureStores } from 'store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ActivityIndicator } from 'react-native';
import codePush from 'react-native-code-push';

const { persistor, store } = configureStores();
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<ActivityIndicator size={18} />}>
            <PersistGate loading={null} persistor={persistor}>
              <Navigator />
              <Toast position="top" />
            </PersistGate>
          </Suspense>
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
// export default App;
export default codePush(codePushOptions)(App);
