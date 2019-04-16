import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Question from './question';

configure({ adapter: new Adapter() });
const Evaluate = shallow(<Question />);
it('it renders correctly', () => {
  expect(Evaluate).toMatchSnapshot();
});
