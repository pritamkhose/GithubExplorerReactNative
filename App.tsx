/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React, { Fragment, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { getLocales } from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import { AppProvider } from './app/AppContext';
import Constants from './app/Constants';
import Navigation from './app/Navigation';
import NoInternetModal from './components/NoInternetModal';
import i18n from './app/i18n';

const App = () => {
  const [isOffline, setOfflineStatus] = useState(false);
  const [alreadyRun, setAlreadyRun] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Constants.APP_COLOR);
    }
    (async function () {
      await runLanguage();
    })();
  });

  const runLanguage = async () => {
    try {
      if (alreadyRun) {
        const storedLang = await AsyncStorage.getItem('currentLanguage');
        const localeLang = getLocales()[0].languageCode;
        let lang = 'en';
        if (storedLang && storedLang.length > 0) {
          lang = localeLang;
        } else if (localeLang?.length > 0) {
          lang = localeLang;
        }
        i18n.changeLanguage(lang);
        await AsyncStorage.setItem('currentLanguage', lang);
        console.log('getLocales-->', lang, localeLang, storedLang);
        setAlreadyRun(false);
      }
    } catch (e) { }
  };

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  return (
    <AppProvider>
      <Fragment>
        {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
        <Navigation />
        <NoInternetModal show={isOffline} />
      </Fragment>
    </AppProvider>
  );
};

export default App;
