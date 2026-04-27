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
import Repositories from '../screen/Repositories';
import Services from '../api/Services';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../api/Services', () => ({
  getUserRepos: jest.fn(),
}));

jest.mock('../components/Loading', () => 'Loading');

describe('Repositories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    const route = {params: {user: 'testuser'}};
    return renderer.create(
      <Repositories navigation={{} as any} route={route as any} />,
    );
  };

  test('renders loading state initially', async () => {
    (Services.getUserRepos as jest.Mock).mockResolvedValueOnce([]);
    let tree: any;
    await renderer.act(async () => {
      tree = renderComponent();
    });
    expect(tree.toJSON()).toBeDefined();
  });

  test('renders list of repositories correctly', async () => {
    const mockData = [
      {
        name: 'Repo1',
        html_url: 'http://test.com',
        description: 'Desc1',
        language: 'TS',
        stargazers_count: 0,
        watchers_count: 0,
        forks: 0,
      },
    ];
    (Services.getUserRepos as jest.Mock).mockResolvedValueOnce(mockData);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const touchables = component.root.findAllByType(TouchableOpacity);
    expect(touchables.length).toBe(1);
  });

  test('handles API failure correctly', async () => {
    (Services.getUserRepos as jest.Mock).mockRejectedValueOnce(
      new Error('Network Error'),
    );

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });
    expect(component.root.findByType(ScrollView)).toBeDefined();
  });

  test('opens url when repository is pressed', async () => {
    const mockData = [{name: 'Repo1', html_url: 'https://github.com/repo1'}];
    (Services.getUserRepos as jest.Mock).mockResolvedValueOnce(mockData);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const touchable = component.root.findByType(TouchableOpacity);
    const spyLinking = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve(true));

    await renderer.act(async () => {
      touchable.props.onPress();
    });

    expect(spyLinking).toHaveBeenCalledWith('https://github.com/repo1');
    spyLinking.mockRestore();
  });

  test('handles pull to refresh', async () => {
    (Services.getUserRepos as jest.Mock).mockResolvedValueOnce([]);
    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const refreshControl = component.root.findByType(RefreshControl);

    (Services.getUserRepos as jest.Mock).mockResolvedValueOnce([]);
    await renderer.act(async () => {
      refreshControl.props.onRefresh();
    });

    expect(Services.getUserRepos).toHaveBeenCalledTimes(2);
  });
});
