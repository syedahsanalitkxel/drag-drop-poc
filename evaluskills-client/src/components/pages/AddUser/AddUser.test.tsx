import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from '.';

configure({ adapter: new Adapter() });

const formValues = {
  email: 'maria@evaluskills.com',
  firstName: 'maria',
  lastName: 'gracia',
  role: 'admin',
};

describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Index {...formValues} />);
    expect(component).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Index />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('to be defined of form control `.form`s', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find('.form')).toBeDefined();
  });
  it('4 Input fields in `.form`', () => {
    const wrapper = mount(
      <Router>
        <Index />
      </Router>
    );
    expect(wrapper.find('Input')).toHaveLength(4);
  });
  it('4 Form Feedback in `.form`', () => {
    const wrapper = mount(
      <Router>
        <Index />
      </Router>
    );
    expect(wrapper.find('FormFeedback')).toHaveLength(4);
  });
  it('16 form control `.form-control`s', () => {
    const wrapper = mount(
      <Router>
        <Index />
      </Router>
    );
    expect(wrapper.find('.form-control')).toHaveLength(16);
    expect(wrapper.find('.form-control')).toBeDefined();
  });
  it('First Name label exist ', () => {
    const wrapper = render(
      <Router>
        <Index />
      </Router>
    );
    expect(wrapper.text()).toContain('First Name');
  });
  it('Last Name label exist ', () => {
    const wrapper = render(
      <Router>
        <Index />
      </Router>
    );
    expect(wrapper.text()).toContain('Last Name');
  });
  it('Email label exist ', () => {
    const wrapper = render(
      <Router>
        <Index />
      </Router>
    );
    expect(wrapper.text()).toContain('Email');
  });
  it('Role label exist ', () => {
    const wrapper = render(
      <Router>
        <Index />
      </Router>
    );
    expect(wrapper.text()).toContain('Role');
  });

  it('submit form ', () => {
    const wrapper = mount(
      <Router>
        <Index />
      </Router>
    );
    wrapper.find('form').simulate('submit');
  });
  it('submit form ', () => {
    const wrapper = mount(
      <Router>
        <Index />
      </Router>
    );
    wrapper.find('form').simulate('submit', {
      preventDefault: (props: any) => {
        console.log('propssss', props);
      },
    });
  });

  describe('Component functionality', () => {
    it('should not submit if required fields are empty', () => {
      const badFormValues = {
        email: 'aa',
        firstName: ' ',
        lastName: ' ',
        role: ' ',
      };
      const resetForm = jest.fn();
      const componentRender = mount(
        <Router>
          <Index {...badFormValues} />
        </Router>
      );
      componentRender
        .find('Formik')
        .instance()
        .props.onSubmit(badFormValues, { resetForm });
      // console.log(componentRender.find('FormFeedback').debug());
      // console.log(componentRender.update().find('.validation-error'));
      // console.log(componentRender.find('Formik').instance());
      // expect(componentRender.find('.validation-error').text()).toEqual('Company Name is required');
    });
  });
});
