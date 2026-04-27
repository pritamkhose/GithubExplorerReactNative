/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {TouchableOpacity} from 'react-native';
import LangPopup from '../components/LangPopup';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock('../app/i18n', () => ({
  changeLanguage: jest.fn(),
}));

describe('LangPopup', () => {
  test('renders correctly', async () => {
    const onClose = jest.fn();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<LangPopup onClose={onClose} />);
    });
  });

  test('calls onClose when cancel is pressed', async () => {
    const onClose = jest.fn();
    const component = ReactTestRenderer.create(<LangPopup onClose={onClose} />);

    // Find cancel button and press it (It's the last TouchableOpacity in the list)
    const touchables = component.root.findAllByType(TouchableOpacity);
    const cancelButton = touchables[touchables.length - 1];
    await ReactTestRenderer.act(async () => {
      cancelButton.props.onPress();
    });

    expect(onClose).toHaveBeenCalled();
  });
});
