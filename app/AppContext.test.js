import React from 'react';
import renderer from 'react-test-renderer';
import AppContext from './AppContext';

test('renders correctly', () => {
  const props = {};
  const tree = renderer.create(<AppContext {...props} />).toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
});
