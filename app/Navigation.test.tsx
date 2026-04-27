/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Navigation from '../app/Navigation';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}) => children,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({children}) => children,
    Screen: ({children}) => children,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

jest.mock('../screen/Home', () => 'HomeScreen');
jest.mock('../screen/Follower', () => 'FollowerScreen');
jest.mock('../screen/Following', () => 'FollowingScreen');
jest.mock('../screen/Repositories', () => 'RepositoriesScreen');
jest.mock('../screen/UserDetails', () => 'UserDetailsScreen');
jest.mock('../screen/PublicGist', () => 'PublicGistScreen');
jest.mock('../screen/WebviewScreen', () => 'WebScreen');

jest.mock('../app/AppContext', () => {
  const React = require('react');
  return {
    AppContext: React.createContext(['testuser', jest.fn()]),
  };
});

describe('Navigation', () => {
  test('renders correctly', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<Navigation />);
    });
  });
});
