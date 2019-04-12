import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import EvaluationSummary from './summary';

configure({ adapter: new Adapter() });
const Evaluate = shallow(<EvaluationSummary />);
it('it renders correctly', () => {
  expect(Evaluate).toMatchSnapshot();
});
