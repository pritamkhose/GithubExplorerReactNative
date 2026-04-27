/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import {Alert, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import WebviewScreen from '../screen/WebviewScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

jest.mock('react-native-device-info', () => ({
  getUserAgent: jest.fn(() => Promise.resolve('MockUserAgent')),
}));

describe('WebviewScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve(true));
  });

  const renderComponent = () => {
    const route = {params: {url: 'https://github.com', title: 'GitHub'}};
    return renderer.create(
      <WebviewScreen navigation={{} as any} route={route as any} />,
    );
  };

  test('renders correctly', async () => {
    let tree: any;
    await renderer.act(async () => {
      tree = renderComponent();
    });
    expect(tree.toJSON()).toBeDefined();
  });

  test('allows navigation to allowed uri and blocks external with Linking', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const webview = component.root.findByType(WebView as any);

    // Internal URI allowed
    const allowInternal = webview.props.onShouldStartLoadWithRequest({
      url: 'https://pritamkhose.github.io/GithubExplorerReactNativeWeb/extra',
    });
    expect(allowInternal).toBe(true);

    // External URI blocked and opened in external browser
    const allowExternal = webview.props.onShouldStartLoadWithRequest({
      url: 'https://google.com',
    });
    expect(allowExternal).toBe(false);
    expect(Linking.openURL).toHaveBeenCalledWith('https://google.com');
  });

  test('shows alert on http error', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const webview = component.root.findByType(WebView as any);

    await renderer.act(async () => {
      webview.props.onHttpError({
        nativeEvent: {
          statusCode: 404,
          url: 'https://test.com',
          description: 'Not Found',
        },
      });
    });
    expect(Alert.alert).toHaveBeenCalled();
  });

  test('shows alert on general error', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    const webview = component.root.findByType(WebView as any);

    await renderer.act(async () => {
      webview.props.onError({
        nativeEvent: {
          code: -1,
          url: 'https://test.com',
          description: 'Connection Failed',
        },
      });
    });
    expect(Alert.alert).toHaveBeenCalled();
  });
});
