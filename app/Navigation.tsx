import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { Alert, BackHandler, Image, Platform, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import FollowerScreen from '../screen/Follower';
import FollowingScreen from '../screen/Following';
import HomeScreen from '../screen/Home';
import PublicGistScreen from '../screen/PublicGist';
import RepositoriesScreen from '../screen/Repositories';
import UserDetails from '../screen/UserDetails';
import Constants from './Constants';

const Stack = createStackNavigator();

const Navigation = () => {
    const [searchUser] = useContext(AppContext);

    return (
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
                                        source={require('../assets/images/logout.png')}
                                    />
                                </TouchableOpacity> : null}
                        </>
                    ),
                }}>
                <Stack.Screen
                    name={Constants.NAVIGATE_SCREEN.Home}
                    component={HomeScreen}
                    options={{
                        title: Constants.TEXT.Home,
                    }}
                />
                <Stack.Screen
                    name={Constants.NAVIGATE_SCREEN.UserDetails}
                    component={UserDetails}
                    options={{
                        title: searchUser.toUpperCase() + Constants.TEXT.UserDetails,
                    }}
                />
                <Stack.Screen
                    name={Constants.NAVIGATE_SCREEN.Repositories}
                    component={RepositoriesScreen}
                    options={{
                        title: searchUser.toUpperCase() + Constants.TEXT.Repositories
                    }}
                />
                <Stack.Screen
                    name={Constants.NAVIGATE_SCREEN.PublicGist}
                    component={PublicGistScreen}
                    options={{
                        title: searchUser.toUpperCase() + Constants.TEXT.PublicGist
                    }}
                />
                <Stack.Screen
                    name={Constants.NAVIGATE_SCREEN.Follower}
                    component={FollowerScreen}
                    options={{
                        title: searchUser.toUpperCase() + Constants.TEXT.Follower
                    }}
                />
                <Stack.Screen
                    name={Constants.NAVIGATE_SCREEN.Following}
                    component={FollowingScreen}
                    options={{
                        title: searchUser.toUpperCase() + Constants.TEXT.Following,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const doExit = () => {
    BackHandler.exitApp();
    return true;
};

export default Navigation;