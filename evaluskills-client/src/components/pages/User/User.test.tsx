import { configure, mount, render, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import User from '.';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() });
describe('User', () => {
  const user = shallow(<User />);

  it('render successfully', () => {
    expect(user).toMatchSnapshot();
  });

  it('check table is defined or not', () => {
    expect(user.find('.table')).toBeDefined();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <User />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('to be defind of form control `.table', () => {
    const wrapper = shallow(<User />);
    expect(wrapper.find('.table')).toBeDefined();
  });

  it('5 Rows form `.table', () => {
    const wrapper = mount(
      <Router>
        <User />
      </Router>
    );
    expect(wrapper.find('tr')).toHaveLength(5);
    expect(wrapper.find('.table')).toBeDefined();
  });
});
