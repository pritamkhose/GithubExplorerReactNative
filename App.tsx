/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment, useEffect} from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import HomeScreen from './screen/Home';
import UserDetails from './screen/UserDetails';
import FollowerScreen from './screen/Follower';
import FollowingScreen from './screen/Following';
import RepositoriesScreen from './screen/Repositories';
import PublicGistScreen from './screen/PublicGist';

const Stack = createStackNavigator();
const APP_COLOR = '#2196F3'; // import {APP_COLOR} from './components/Constants';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBackgroundColor(APP_COLOR);
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
            headerTintColor: '#FFFFFFFF',
            headerStyle: {
              backgroundColor: APP_COLOR,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('', 'Do you want to exit?', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => doExit()},
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
            name="RepositoriesScreen"
            component={RepositoriesScreen}
            options={{
              title: 'Repositories',
            }}
          />
          <Stack.Screen
            name="PublicGistScreen"
            component={PublicGistScreen}
            options={{
              title: 'Public Gist',
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
