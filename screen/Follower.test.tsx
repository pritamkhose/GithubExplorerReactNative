/* import React from 'react';
import renderer from 'react-test-renderer';
import Follower from './Follower';
// import {shallow} from 'enzyme';

test('renders correctly show', () => {
  const _getComponent = () => {
    return <Follower route={jest.fn()} />;
  };

  let wrapper = shallow(_getComponent());

  const expectedComponent = dynamicPart => {
    return <View style={styles.container}>{dynamicPart}</View>;
  };

  expect(
    wrapper.contains(
      expectedComponent(<Text style={styles.loading}>Loading...</Text>),
    ),
  ).toBe(true);

  // const tree = renderer.create(<Follower route={} />).toJSON();
  // expect(tree).toMatchSnapshot();
});

it('renders a using Snapshots', () => {
  const _getComponent = props => {
    return renderer.create(<Follower route={jest.fn()} />);
  };

  let component = _getComponent({isLoading: true, repos: []});
  expect(component).toMatchSnapshot();

  component = _getComponent({isLoading: false, repos});
  expect(component).toMatchSnapshot();
});

 */
