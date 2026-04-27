/* eslint-disable no-undef */

// Mock global window object for react-test-renderer
global.window = global;
global.window.dispatchEvent = jest.fn();

// Mock out all top level functions, such as get, put, delete and post:
jest.mock('axios');

// Mock AsyncStorage (ES Module) - inline mock
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: () => ({
    isConnected: true,
    type: 'wifi',
  }),
  addEventListener: jest.fn(() => jest.fn()),
  removeEventListener: jest.fn(),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

// Mock react-native-localize
jest.mock('react-native-localize', () => ({
  getLocales: () => [{ countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false }],
  getCountry: () => 'US',
  getCurrencies: () => ['USD'],
  getTimeZone: () => 'America/New_York',
  getLocales: () => [{ countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false }],
}));

// Mock react-native-splash-screen
jest.mock('react-native-splash-screen', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// https://stackoverflow.com/questions/63973960/mocking-axios-with-jest-throws-error-cannot-read-property-interceptors-of-und

// jest.mock('axios', () => {
//   return {
//     create: jest.fn(),
//     get: jest.fn(),
//     interceptors: {
//       request: {use: jest.fn(), eject: jest.fn()},
//       response: {use: jest.fn(), eject: jest.fn()},
//     },
//   };
// });

// https://reactnavigation.org/docs/testing/
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// https://stackoverflow.com/questions/61195196/how-to-properly-test-react-native-modals-using-jest-and-native-testing-library
jest.mock('react-native-modal', () => 'react-native-modal');

jest.mock('./node_modules/react-native-fast-image/dist/index.js', () => {
  const React = require('React');
  return class MockPicker extends React.Component {
    render() {
      return React.createElement('FastImage');
    }
  };
});

// https://stackoverflow.com/questions/61781274/how-to-mock-usenavigation-hook-in-react-navigation-5-0-for-jest-test

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: () => jest.fn(),
  useNavigation: () => ({
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: ({ children }) => children,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

// Mock react-native-device-info
jest.mock('react-native-device-info', () => ({
  getUniqueId: () => 'test-unique-id',
  getDeviceId: () => 'test-device-id',
  getSystemVersion: () => '14.0',
  getSystemName: () => 'iOS',
  getModel: () => 'iPhone',
  getBrand: () => 'Apple',
  getDeviceName: () => 'Test Device',
  getApplicationName: () => 'TestApp',
  getBuildNumber: () => '1',
  getBundleId: () => 'com.test.app',
  getVersion: () => '1.0.0',
  isTablet: () => false,
  isEmulator: () => true,
  isPinOrFingerprintSet: () => Promise.resolve(false),
  hasNotch: () => false,
  getIpAddress: () => Promise.resolve('127.0.0.1'),
  getMacAddress: () => Promise.resolve('00:00:00:00:00:00'),
  getUserAgent: () => Promise.resolve('TestUserAgent'),
}));

// Mock react-native-webview
jest.mock('react-native-webview', () => ({
  WebView: ({ children }) => children,
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));
