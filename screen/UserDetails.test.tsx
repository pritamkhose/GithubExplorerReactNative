/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import {
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import UserDetails from '../screen/UserDetails';
import Services from '../api/Services';
import {AppContext} from '../app/AppContext';
import Constants from '../app/Constants';

const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    dispatch: mockDispatch,
  }),
  CommonActions: {
    navigate: jest.fn(options => options),
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../api/Services', () => ({
  getUserDetails: jest.fn(),
}));

jest.mock('../components/Loading', () => 'Loading');
jest.mock('../components/FastImageLoad', () => 'FastImageLoad');

jest.mock('../app/AppContext', () => {
  const React = require('react');
  return {
    AppContext: React.createContext(['testuser', jest.fn()]),
  };
});

describe('UserDetails', () => {
  const mockSetSearchUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    const route = {
      params: {username: 'testuser', avatar_url: 'http://test.com'},
    };
    return renderer.create(
      <AppContext.Provider value={['testuser', mockSetSearchUser]}>
        <UserDetails navigation={{} as any} route={route as any} />
      </AppContext.Provider>,
    );
  };

  test('renders user data correctly', async () => {
    const mockData = {
      name: 'John Doe',
      bio: 'Developer',
      location: 'NY',
      email: 'john@doe.com',
      blog: 'http://johndoe.com',
      followers: 10,
      following: 5,
      public_gists: 2,
      public_repos: 4,
      created_at: '2020-01-01T00:00:00Z',
      updated_at: '2021-01-01T00:00:00Z',
    };
    (Services.getUserDetails as jest.Mock).mockResolvedValueOnce(mockData);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    expect(component.root.findByType(ScrollView)).toBeDefined();
    expect(mockSetSearchUser).toHaveBeenCalledWith('testuser');
  });

  test('handles missing API data cleanly', async () => {
    (Services.getUserDetails as jest.Mock).mockResolvedValueOnce(null);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    expect(
      component.root.findByProps({children: 'nothingFound'}),
    ).toBeDefined();
  });

  test('handles API network failure', async () => {
    (Services.getUserDetails as jest.Mock).mockRejectedValueOnce(
      new Error('Failure'),
    );

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    expect(component.root.findByProps({children: 'wentWrong'})).toBeDefined();
  });

  test('links to email and blog when present', async () => {
    const mockData = {
      email: 'test@test.com',
      blog: 'https://myblog.com',
      followers: 0,
      following: 0,
    };
    (Services.getUserDetails as jest.Mock).mockResolvedValueOnce(mockData);
    jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve(true));

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const touchables = component.root.findAllByType(TouchableOpacity);
    // Assumes Email is first touchable, Blog is second if data is populated
    const emailBtn = touchables[0];
    const blogBtn = touchables[1];

    await renderer.act(async () => {
      emailBtn.props.onPress();
      blogBtn.props.onPress();
    });

    expect(Linking.openURL).toHaveBeenCalledWith(
      expect.stringContaining('mailto:test@test.com'),
    );
    expect(Linking.openURL).toHaveBeenCalledWith('https://myblog.com');

    (Linking.openURL as jest.Mock).mockRestore();
  });

  test('navigates to appropriate screen on stat press', async () => {
    const mockData = {
      followers: 10,
      following: 5,
      public_gists: 2,
      public_repos: 4,
    };
    (Services.getUserDetails as jest.Mock).mockResolvedValueOnce(mockData);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const touchables = component.root.findAllByType(TouchableOpacity);

    // Press Followers
    await renderer.act(async () => {
      touchables[touchables.length - 4].props.onPress();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      name: Constants.NAVIGATE_SCREEN.Follower,
      params: {username: 'testuser'},
    });

    // Press Following
    await renderer.act(async () => {
      touchables[touchables.length - 3].props.onPress();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      name: Constants.NAVIGATE_SCREEN.Following,
      params: {username: 'testuser'},
    });

    // Press Gists
    await renderer.act(async () => {
      touchables[touchables.length - 2].props.onPress();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      name: Constants.NAVIGATE_SCREEN.PublicGist,
      params: {username: 'testuser'},
    });

    // Press Repositories
    await renderer.act(async () => {
      touchables[touchables.length - 1].props.onPress();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      name: Constants.NAVIGATE_SCREEN.Repositories,
      params: {username: 'testuser'},
    });
  });
});
