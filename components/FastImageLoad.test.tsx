import React from 'react';
import renderer from 'react-test-renderer';
import FastImageLoad from './FastImageLoad';

jest.mock('react-native-fast-image', () => {
  const FastImage = () => 'FastImage';
  FastImage.priority = {normal: 'normal'};
  FastImage.resizeMode = {contain: 'contain'};
  return FastImage;
});

test('renders correctly', () => {
  const props = {
    style: {},
    uri: '',
  };
  expect(
    renderer.create(<FastImageLoad {...props} />).toJSON(),
  ).toMatchSnapshot();
});
