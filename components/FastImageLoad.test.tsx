import React from 'react';
import renderer from 'react-test-renderer';
import FastImageLoad from './FastImageLoad';

test('renders correctly', () => {
  const props = {
    style: jest.fn(),
    uri: '',
  };
  expect(
    renderer.create(<FastImageLoad {...props} />).toJSON(),
  ).toMatchSnapshot();
});
