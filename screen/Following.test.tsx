/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import {RefreshControl, TouchableOpacity, ScrollView} from 'react-native';
import Following from '../screen/Following';
import Services from '../api/Services';
import {AppContext} from '../app/AppContext';

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
  getUserFollowing: jest.fn(),
}));

jest.mock('../components/Loading', () => 'Loading');
jest.mock('../components/FastImageLoad', () => 'FastImageLoad');

jest.mock('../app/AppContext', () => {
  const React = require('react');
  return {
    AppContext: React.createContext(['testuser', jest.fn()]),
  };
});

describe('Following', () => {
  const mockSetSearchUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    const route = {params: {user: 'testuser'}};
    return renderer.create(
      <AppContext.Provider value={['testuser', mockSetSearchUser]}>
        <Following navigation={{} as any} route={route as any} />
      </AppContext.Provider>,
    );
  };

  test('renders loading state initially', async () => {
    (Services.getUserFollowing as jest.Mock).mockResolvedValueOnce([]);
    let tree: any;
    await renderer.act(async () => {
      tree = renderComponent();
    });
    expect(tree.toJSON()).toBeDefined();
  });

  test('renders list of following correctly', async () => {
    const mockData = [
      {login: 'user1', avatar_url: 'https://example.com/user1.png'},
      {login: 'user2', avatar_url: 'https://example.com/user2.png'},
    ];
    (Services.getUserFollowing as jest.Mock).mockResolvedValueOnce(mockData);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const root = component.root;
    const touchables = root.findAllByType(TouchableOpacity);
    expect(touchables.length).toBe(2);
  });

  test('handles API failure correctly', async () => {
    (Services.getUserFollowing as jest.Mock).mockRejectedValueOnce(
      new Error('Network error'),
    );

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const root = component.root;
    expect(root.findByType(ScrollView)).toBeDefined();
  });

  test('handles empty data response correctly', async () => {
    (Services.getUserFollowing as jest.Mock).mockResolvedValueOnce([]);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const root = component.root;
    expect(root.findByType(ScrollView)).toBeDefined();
  });

  test('calls openDetails when user is pressed', async () => {
    const mockData = [
      {login: 'user1', avatar_url: 'https://example.com/user1.png'},
    ];
    (Services.getUserFollowing as jest.Mock).mockResolvedValueOnce(mockData);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const root = component.root;
    const touchable = root.findByType(TouchableOpacity);

    await renderer.act(async () => {
      touchable.props.onPress();
    });

    expect(mockSetSearchUser).toHaveBeenCalledWith('user1');
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('handles pull to refresh', async () => {
    const mockData = [
      {login: 'user1', avatar_url: 'https://example.com/user1.png'},
    ];
    (Services.getUserFollowing as jest.Mock).mockResolvedValueOnce(mockData);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const root = component.root;
    const refreshControl = root.findByType(RefreshControl);

    (Services.getUserFollowing as jest.Mock).mockResolvedValueOnce(mockData);

    await renderer.act(async () => {
      refreshControl.props.onRefresh();
    });

    expect(Services.getUserFollowing).toHaveBeenCalledTimes(2);
  });
});
