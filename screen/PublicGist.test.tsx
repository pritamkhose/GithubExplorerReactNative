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
import PublicGist from '../screen/PublicGist';
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
  getUserGist: jest.fn(),
}));

jest.mock('../components/Loading', () => 'Loading');

describe('PublicGist', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    const route = {params: {user: 'testuser'}};
    return renderer.create(
      <PublicGist navigation={{} as any} route={route as any} />,
    );
  };

  test('renders loading state initially', async () => {
    (Services.getUserGist as jest.Mock).mockResolvedValueOnce([]);
    let tree: any;
    await renderer.act(async () => {
      tree = renderComponent();
    });
    expect(tree.toJSON()).toBeDefined();
  });

  test('renders list of public gists correctly', async () => {
    const mockData = [
      {
        description: 'Gist 1',
        html_url: 'http://gist.com',
        updated_at: '2022-01-01T00:00:00Z',
      },
    ];
    (Services.getUserGist as jest.Mock).mockResolvedValueOnce(mockData);

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const touchables = component.root.findAllByType(TouchableOpacity);
    expect(touchables.length).toBe(1);
  });

  test('handles empty state or api failure correctly', async () => {
    (Services.getUserGist as jest.Mock).mockRejectedValueOnce(
      new Error('Network Error'),
    );

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });
    expect(component.root.findByType(ScrollView)).toBeDefined();
  });

  test('opens url when gist is pressed', async () => {
    const mockData = [
      {description: 'Gist 1', html_url: 'https://gist.github.com/1'},
    ];
    (Services.getUserGist as jest.Mock).mockResolvedValueOnce(mockData);

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

    expect(spyLinking).toHaveBeenCalledWith('https://gist.github.com/1');
    spyLinking.mockRestore();
  });

  test('handles pull to refresh', async () => {
    (Services.getUserGist as jest.Mock).mockResolvedValueOnce([]);
    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const refreshControl = component.root.findByType(RefreshControl);

    (Services.getUserGist as jest.Mock).mockResolvedValueOnce([]);
    await renderer.act(async () => {
      refreshControl.props.onRefresh();
    });

    expect(Services.getUserGist).toHaveBeenCalledTimes(2);
  });
});
