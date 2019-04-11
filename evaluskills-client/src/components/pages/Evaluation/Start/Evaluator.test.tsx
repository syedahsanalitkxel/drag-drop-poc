import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Evaluator from './index';

configure({ adapter: new Adapter() });
const Evaluate = shallow(<Evaluator />);
it('it renders correctly', () => {
  expect(Evaluate).toMatchSnapshot();
});
