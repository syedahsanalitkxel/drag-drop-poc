import { configure, mount, render, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Email from '.';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() });
describe('Email', () => {
  const email = shallow(<Email />);

  it('render successfully', () => {
    expect(email).toMatchSnapshot();
  });

  it('check table is defined or not', () => {
    expect(email.find('.table')).toBeDefined();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Email />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('to be defind of form control `.table', () => {
    const wrapper = shallow(<Email />);
    expect(wrapper.find('.table')).toBeDefined();
  });

  it('5 Rows form `.table', () => {
    const wrapper = mount(
      <Router>
        <Email />
      </Router>
    );
    expect(wrapper.find('tr')).toHaveLength(5);
    expect(wrapper.find('.table')).toBeDefined();
  });
});
