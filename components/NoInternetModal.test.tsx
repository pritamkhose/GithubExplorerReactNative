import React from 'react';
import renderer from 'react-test-renderer';
import NoInternetModal from './NoInternetModal';

// https://enzymejs.github.io/enzyme/docs/guides/react-native.html
// https://stackoverflow.com/questions/52569447/how-to-mock-react-navigations-navigation-prop-for-unit-tests-with-typescript-in
// https://stackoverflow.com/questions/41830165/how-to-mock-react-component-methods-with-jest-and-enzyme

// import Adapter from 'enzyme-adapter-react-15';
// import {shallow, configure} from 'enzyme';
// configure({adapter: new Adapter()});

// test('renders correctly', () => {
//   const wrapper = shallow(<NoInternetModal show={false} />).props();
//   console.log(wrapper);
//   expect(wrapper).toMatchSnapshot();
// });

test('renders correctly show', () => {
  expect(
    renderer.create(<NoInternetModal show={true} />).toJSON(),
  ).toMatchSnapshot();
  expect(
    renderer.create(<NoInternetModal show={false} />).toJSON(),
  ).toMatchSnapshot();
});
