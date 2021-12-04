import React from 'react';
import renderer from 'react-test-renderer';
import Follower from './Follower';
import {shallow} from 'enzyme';

test('renders correctly show', () => {
  const tree = renderer.create(<Follower route={} />).toJSON();
  expect(tree).toMatchSnapshot();
});
