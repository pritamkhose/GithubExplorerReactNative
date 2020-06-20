/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

import HomeScreen from './components/HomeScreen';
import UserDetails from './components/UserDetails';
import RepoScreen from './components/RepoScreen';
import FollowerScreen from './components/FollowerScreen';
import FollowingScreen from './components/FollowingScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    UserDetails: {screen: UserDetails},
    RepoScreen: {screen: RepoScreen},
    FollowerScreen: {screen: FollowerScreen},
    FollowingScreen: {screen: FollowingScreen},
    // Login: {
    // screen: LoginScreen,
    // navigationOptions: {
    // header: null
    // },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  //or <StatusBar barStyle="dark-content" />
  return (
    <Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <AppContainer />
    </Fragment>
  );
};

export default App;
