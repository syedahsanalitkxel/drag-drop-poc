import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import EvaluatorList from './list';

configure({ adapter: new Adapter() });
const Evaluate = shallow(<EvaluatorList />);
it('it renders correctly', () => {
  expect(Evaluate).toMatchSnapshot();
});
