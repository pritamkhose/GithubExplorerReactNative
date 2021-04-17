/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useEffect} from 'react';
import {
  StatusBar,
  useColorScheme,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import HomeScreen from './components/HomeScreen';
import UserDetails from './components/UserDetails';
import RepoScreen from './components/RepoScreen';
import FollowerScreen from './components/FollowerScreen';
import FollowingScreen from './components/FollowingScreen';

const Stack = createStackNavigator();
const APP_COLOR = '#2196F3'; // import {APP_COLOR} from './Constants';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBackgroundColor(APP_COLOR);
    return () => backHandler.remove();
  });

  //or <StatusBar barStyle="dark-content" />
  return (
    <Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          headerMode="screen"
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: APP_COLOR,
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(null, 'Do you want to exit?', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => doExit()},
                  ]);
                }}>
                <Image
                  onPress={() => console.log('This is a button!')}
                  style={{width: 24, height: 24, marginRight: 10}}
                  source={require('./assets/images/logout.png')}
                  tintColor="white"
                />
              </TouchableOpacity>
            ),
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Github Explorer',
            }}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetails}
            options={{
              title: 'Github User Details',
            }}
          />
          <Stack.Screen
            name="RepoScreen"
            component={RepoScreen}
            options={{
              title: 'Repositories',
            }}
          />
          <Stack.Screen
            name="FollowerScreen"
            component={FollowerScreen}
            options={{
              title: 'Followers',
            }}
          />
          <Stack.Screen
            name="FollowingScreen"
            component={FollowingScreen}
            options={{
              title: 'Following',
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
