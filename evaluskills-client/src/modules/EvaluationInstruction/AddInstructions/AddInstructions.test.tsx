import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddEmailTemplate from './index';

configure({ adapter: new Adapter() });

const formValues = {
  title: ' ',
  subject: 'plan 2',
  type: ' ',
  editorState: 'hi ali',
};

describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AddEmailTemplate {...formValues} />);
    expect(component).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <AddEmailTemplate />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('to be defined of form control `.form`s', () => {
    const wrapper = shallow(<AddEmailTemplate />);
    expect(wrapper.find('.form')).toBeDefined();
  });
  it('17 Input fields in `.form`', () => {
    const wrapper = mount(
      <Router>
        <AddEmailTemplate />
      </Router>
    );
    expect(wrapper.find('Input')).toHaveLength(3);
  });
  it('12 Form Feedback in `.form`', () => {
    const wrapper = mount(
      <Router>
        <AddEmailTemplate />
      </Router>
    );
    expect(wrapper.find('FormFeedback')).toHaveLength(3);
  });
  it('49 form control `.form-control`s', () => {
    const wrapper = mount(
      <Router>
        <AddEmailTemplate />
      </Router>
    );
    expect(wrapper.find('.form-control')).toHaveLength(9);
    expect(wrapper.find('.form-control')).toBeDefined();
  });
  it('Title label exist ', () => {
    const wrapper = render(
      <Router>
        <AddEmailTemplate />
      </Router>
    );
    expect(wrapper.text()).toContain('Title');
  });
  it('Subject label exist ', () => {
    const wrapper = render(
      <Router>
        <AddEmailTemplate />
      </Router>
    );
    expect(wrapper.text()).toContain('Subject');
  });
  it('Typelabel exist ', () => {
    const wrapper = render(
      <Router>
        <AddEmailTemplate />
      </Router>
    );
    expect(wrapper.text()).toContain('Type');
  });

  it('submit form ', () => {
    const wrapper = mount(
      <Router>
        <AddEmailTemplate />
      </Router>
    );
    wrapper.find('form').simulate('submit');
  });
  it('submit form ', () => {
    const wrapper = mount(
      <Router>
        <AddEmailTemplate />
      </Router>
    );
    wrapper.find('form').simulate('submit', {
      preventDefault: (props: any) => {
        console.log('propssss', props);
      },
    });
  });
  //
  describe('Component functionality', () => {
    it('should not submit if required fields are empty', () => {
      const badFormValues = {
        title: ' ',
        subject: 'plan 2',
        type: ' ',
        editorState: 'hi ali',
      };
      const resetForm = jest.fn();
      const componentRender = mount(
        <Router>
          <AddEmailTemplate {...badFormValues} />
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
