import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { configure, mount, render, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import EditAssessment from '.';

import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() });
const catehandleChange = (event?: any) => {};
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<EditAssessment />);

    expect(component).toMatchSnapshot();
  });
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <EditAssessment />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
// it('Radio button Render ', () => {
//  const wrapper = mount(<Router>
//     <EditAssessment />
// </Router>);

//   expect(wrapper.contains(<RadionButton
//     name="None"
//     value="val1"
//     currentSelection={'val1'}
// 																onChange={catehandleChange}
//   >None</RadionButton>)).toBeTruthy();
// });
it('to be defind of form control `.form-control`s', () => {
  const wrapper = shallow(<EditAssessment />);
  expect(wrapper.find('.form-control')).toBeDefined();
});
it('19 form control `.form-control`s', () => {
  const wrapper = mount(
    <Router>
      <EditAssessment />
    </Router>
  );
  expect(wrapper.find('.form-control')).toHaveLength(19);
  expect(wrapper.find('.form-control')).toBeDefined();
});
it('Defination label exist ', () => {
  const wrapper = render(
    <Router>
      <EditAssessment />
    </Router>
  );
  expect(wrapper.text()).toContain('Defination');
});

it('submit form ', () => {
  const wrapper = mount(
    <Router>
      <EditAssessment />
    </Router>
  );
  wrapper.find('form').simulate('submit');
});
it('submit form ', () => {
  const wrapper = mount(
    <Router>
      <EditAssessment />
    </Router>
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: (props: any) => {
      console.log('propssss', props);
    },
  });
});
