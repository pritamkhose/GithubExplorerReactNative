/* eslint-disable no-undef */

// Mock out all top level functions, such as get, put, delete and post:
jest.mock('axios');

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

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

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

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useFocusEffect: () => jest.fn(),
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});
