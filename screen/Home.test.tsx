/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import {Alert, TextInput, TouchableOpacity} from 'react-native';
import Home from '../screen/Home';
import Services from '../api/Services';
import Constants from '../app/Constants';

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  dispatch: mockDispatch,
  goBack: mockGoBack,
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
  CommonActions: {
    reset: jest.fn(),
    navigate: jest.fn(options => options),
  },
}));

const mockT = (key: any) => key;
const mockI18n = {
  changeLanguage: jest.fn(),
  language: 'en',
};
const mockTranslation = {
  t: mockT,
  i18n: mockI18n,
};
jest.mock('react-i18next', () => ({
  useTranslation: () => mockTranslation,
}));

jest.mock('../api/Services', () => ({
  getUserSearch: jest.fn(() => Promise.resolve({items: []})),
  getUserSearchDefault: jest.fn(() => Promise.resolve({items: []})),
}));

jest.mock('../components/Loading', () => 'Loading');
jest.mock('../components/FastImageLoad', () => 'FastImageLoad');
jest.mock('../components/LangPopup', () => 'LangPopup');

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  const renderComponent = () => {
    return renderer.create(<Home />);
  };

  test('renders correctly and loads data initially', async () => {
    (Services.getUserSearch as jest.Mock).mockResolvedValueOnce({
      total_count: 0,
      items: [],
    });

    let tree: any;
    await renderer.act(async () => {
      tree = renderComponent();
    });

    // Forcing component update to reflect mock
    await renderer.act(async () => {});

    expect(tree.toJSON()).toBeDefined();
  });

  test('shows alert when search text is empty and search is pressed', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    // Forcing component update to reflect mock
    await renderer.act(async () => {});

    const textInput = component.root.findByType(TextInput);

    // Clear text
    await renderer.act(async () => {
      textInput.props.onChangeText('');
    });

    const touchables = component.root.findAllByType(TouchableOpacity);
    const searchBtn = touchables[0]; // Search button is first

    await renderer.act(async () => {
      searchBtn.props.onPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      '',
      'inputSearchValid',
      expect.any(Array),
      {cancelable: false},
    );
  });

  test('fetches search data on submit editing and button press', async () => {
    (Services.getUserSearch as jest.Mock).mockResolvedValueOnce({
      total_count: 1,
      items: [{login: 'testuser', avatar_url: 'http://test.com'}],
    });

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    // Forcing component update to reflect mock
    await renderer.act(async () => {});

    const textInput = component.root.findByType(TextInput);

    // Perform Search Action
    await renderer.act(async () => {
      textInput.props.onSubmitEditing();
    });

    expect(Services.getUserSearch).toHaveBeenCalledWith('android', 1);
  });

  test('navigates to web screen when info icon is pressed', async () => {
    (Services.getUserSearch as jest.Mock).mockResolvedValueOnce({
      total_count: 1,
      items: [{login: 'testuser', avatar_url: 'http://test.com'}],
    });

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    // Forcing component update to reflect mock
    await renderer.act(async () => {});

    // Navigation to WebScreen (Info icon)
    const touchables = component.root.findAllByType(TouchableOpacity);
    const infoBtn = touchables[1];

    await renderer.act(async () => {
      infoBtn.props.onPress();
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      name: Constants.NAVIGATE_SCREEN.WebScreen,
    });
  });

  test('navigates to user details when a list item is pressed', async () => {
    (Services.getUserSearch as jest.Mock).mockResolvedValueOnce({
      total_count: 1,
      items: [{login: 'testuser', avatar_url: 'http://test.com'}],
    });

    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    // Forcing component update to reflect mock
    await renderer.act(async () => {});

    // Search(0), Info(1), Lang(2), UserItem(3)
    const touchables = component.root.findAllByType(TouchableOpacity);
    const listItemBtn = touchables[3];

    await renderer.act(async () => {
      listItemBtn.props.onPress();
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      name: Constants.NAVIGATE_SCREEN.UserDetails,
      params: {username: 'testuser', avatar_url: 'http://test.com'},
    });
  });

  test('toggles language popup when globe icon is pressed', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderComponent();
    });

    // Forcing component update to reflect mock
    await renderer.act(async () => {});

    const touchables = component.root.findAllByType(TouchableOpacity);
    const langBtn = touchables[2]; // Language globe button is third

    await renderer.act(async () => {
      langBtn.props.onPress();
    });
  });
});
