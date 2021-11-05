/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AppProvider } from './app/AppContext';
import Constants from './app/Constants';
import Navigation from './app/Navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Constants.APP_COLOR);
    }
  });

  return (
    <AppProvider>
      <Fragment>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <Navigation />
      </Fragment>
    </AppProvider>
  );
};

export default App;
