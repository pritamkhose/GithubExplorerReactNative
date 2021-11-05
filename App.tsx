/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import NetInfo from "@react-native-community/netinfo";
import React, { Fragment, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AppProvider } from './app/AppContext';
import Constants from './app/Constants';
import Navigation from './app/Navigation';
import NoInternetModal from './components/NoInternetModal';

const App = () => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Constants.APP_COLOR);
    }
  });

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  return (
    <AppProvider>
      <Fragment>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <Navigation />
        <NoInternetModal show={isOffline} />
      </Fragment>
    </AppProvider>
  );
};

export default App;
