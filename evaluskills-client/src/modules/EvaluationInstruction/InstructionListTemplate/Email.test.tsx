import { configure, mount, render, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Instruction from '.';
import ReactDOM from 'react-dom';
let obj = {};
configure({ adapter: new Adapter() });
describe('Instruction', () => {
  const Instruction = shallow(<Instruction />);

  it('render successfully', () => {
    expect(Instruction).toMatchSnapshot();
  });

  it('check table is defined or not', () => {
    expect(Instruction.find('.table')).toBeDefined();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Instruction />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('to be defind of form control `.table', () => {
    const wrapper = shallow(<Instruction />);
    expect(wrapper.find('.table')).toBeDefined();
  });

  it('5 Rows form `.table', () => {
    const wrapper = mount(
      <Router>
        <Instruction />
      </Router>
    );
    expect(wrapper.find('tr')).toHaveLength(5);
    expect(wrapper.find('.table')).toBeDefined();
  });
});
