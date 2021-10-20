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
import {
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import HomeScreen from './screen/Home';
import UserDetails from './screen/UserDetails';
import FollowerScreen from './screen/Follower';
import FollowingScreen from './screen/Following';
import RepositoriesScreen from './screen/Repositories';
import PublicGistScreen from './screen/PublicGist';

import Constants from './components/Constants';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Constants.APP_COLOR);
    }
  });

  return (
    <Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: '#FFFFFFFF',
            headerStyle: {
              backgroundColor: Constants.APP_COLOR,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <>
                {Platform.OS === 'android' ?
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('', 'Do you want to exit?', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        { text: 'OK', onPress: () => doExit() },
                      ]);
                    }}>
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        marginRight: 10,
                        tintColor: '#FFFFFFFF',
                      }}
                      source={require('./assets/images/logout.png')}
                    />
                  </TouchableOpacity> : null}
              </>
            ),
          }}>
          <Stack.Screen
            name={Constants.NAVIGATE_SCREEN.Home}
            component={HomeScreen}
            options={{
              title: Constants.TEXT.GithubExplorer,
            }}
          />
          <Stack.Screen
            name={Constants.NAVIGATE_SCREEN.UserDetails}
            component={UserDetails}
            options={{
              title: Constants.TEXT.UserDetails,
            }}
          />
          <Stack.Screen
            name={Constants.NAVIGATE_SCREEN.Repositories}
            component={RepositoriesScreen}
            options={{
              title: Constants.TEXT.Repositories
            }}
          />
          <Stack.Screen
            name={Constants.NAVIGATE_SCREEN.PublicGist}
            component={PublicGistScreen}
            options={{
              title: Constants.TEXT.PublicGist
            }}
          />
          <Stack.Screen
            name={Constants.NAVIGATE_SCREEN.Follower}
            component={FollowerScreen}
            options={{
              title: Constants.TEXT.Follower
            }}
          />
          <Stack.Screen
            name={Constants.NAVIGATE_SCREEN.Following}
            component={FollowingScreen}
            options={{
              title: Constants.TEXT.Following,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
};

const doExit = () => {
  BackHandler.exitApp();
  return true;
};

export default App;
