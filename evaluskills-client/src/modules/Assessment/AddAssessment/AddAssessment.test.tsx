import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { configure, mount, render, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import AddAssessment from '.';

import ReactDOM from 'react-dom';
import { Initalvalues, initialState } from './InitialState';

configure({ adapter: new Adapter() });
const catehandleChange = (event?: any) => {};
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AddAssessment addAssessment={() => {}} assessmenData={Initalvalues} />);

    expect(component).toMatchSnapshot();
  });
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <AddAssessment addAssessment={() => {}} assessmenData={Initalvalues} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
// it('Radio button Render ', () => {
//  const wrapper = mount(<Router>
//     <AddAssessment />
// </Router>);

//   expect(wrapper.contains(<RadionButton
//     name="None"
//     value="val1"
//     currentSelection={'val1'}
// 																onChange={catehandleChange}
//   >None</RadionButton>)).toBeTruthy();
// });
it('to be defind of form control `.form-control`s', () => {
  const wrapper = shallow(<AddAssessment addAssessment={() => {}} assessmenData={Initalvalues} />);
  expect(wrapper.find('.form-control')).toBeDefined();
});
it('19 form control `.form-control`s', () => {
  const wrapper = mount(
    <Router>
      <AddAssessment addAssessment={() => {}} assessmenData={Initalvalues} />
    </Router>
  );
  expect(wrapper.find('.form-control')).toHaveLength(19);
  expect(wrapper.find('.form-control')).toBeDefined();
});
it('Defination label exist ', () => {
  const wrapper = render(
    <Router>
      <AddAssessment addAssessment={() => {}} assessmenData={Initalvalues} />
    </Router>
  );
  expect(wrapper.text()).toContain('Defination');
});

it('submit form ', () => {
  const wrapper = mount(
    <Router>
      <AddAssessment addAssessment={() => {}} assessmenData={Initalvalues} />
    </Router>
  );
  wrapper.find('form').simulate('submit');
});
it('submit form ', () => {
  const wrapper = mount(
    <Router>
      <AddAssessment addAssessment={() => {}} assessmenData={Initalvalues} />
    </Router>
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: (props: any) => {
      console.log('propssss', props);
    },
  });
});
