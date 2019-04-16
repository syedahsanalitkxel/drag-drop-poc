import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import EvaluatorComment from './comment';

configure({ adapter: new Adapter() });
const Evaluate = shallow(<EvaluatorComment />);
it('it renders correctly', () => {
  expect(Evaluate).toMatchSnapshot();
});
