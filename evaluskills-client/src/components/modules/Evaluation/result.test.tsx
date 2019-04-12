import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import EvaluatorResult from './result';

configure({ adapter: new Adapter() });
const Evaluate = shallow(<EvaluatorResult />);
it('it renders correctly', () => {
  expect(Evaluate).toMatchSnapshot();
});
