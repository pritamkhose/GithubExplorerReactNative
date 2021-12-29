import React from 'react';
import renderer from 'react-test-renderer';
import NoInternetModal from './NoInternetModal';
import {shallow} from 'enzyme';

test('renders correctly', () => {
  const wrapper = shallow(<NoInternetModal show={false} />).props();
  console.log(wrapper);
  expect(wrapper).toMatchSnapshot();
});

test('renders correctly show', () => {
  const tree = renderer.create(<NoInternetModal show={true} />).toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
});
