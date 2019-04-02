import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddUser from './index';

configure({ adapter: new Adapter() });

interface ModalProps {
  visible?: boolean;
  toggle: () => void;
  name?: string;
  FormValues: any;
}

describe('MyComponent', () => {
  const toggleModal = jest.fn();
  const modalValues = {
    email: 'maria@evaluskills.com',
    firstName: 'maria',
    id: '1',
    lastName: 'gracia',
    role: 'admin',
  };
  const props: ModalProps = {
    visible: true,
    toggle: toggleModal,
    name: 'Add',
    FormValues: modalValues,
  };

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AddUser {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <AddUser {...props} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('to be defined of form control `.form`s', () => {
    const wrapper = shallow(<AddUser {...props} />);
    expect(wrapper.find('.form')).toBeDefined();
  });
  it('4 Input fields in `.form`', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
      </Router>
    );
    expect(wrapper.find('Input')).toHaveLength(4);
  });
  it('4 Form Feedback in `.form`', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
      </Router>
    );
    expect(wrapper.find('FormFeedback')).toHaveLength(4);
  });
  it('16 form control `.form-control`s', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
      </Router>
    );
    expect(wrapper.find('.form-control')).toHaveLength(16);
    expect(wrapper.find('.form-control')).toBeDefined();
  });
  it('Find Modal is running successfully ', () => {
    const wrapper = shallow(<AddUser {...props} />);
    expect(wrapper.find('Modal')).toBeDefined();
  });
  it('First Name label exist ', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
      </Router>
    );
    expect(wrapper.text()).toContain('First Name');
  });
  it('Last Name label exist ', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
      </Router>
    );
    expect(wrapper.text()).toContain('Last Name');
  });
  it('Email label exist ', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
      </Router>
    );
    expect(wrapper.text()).toContain('Email');
  });
  it('Role label exist ', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
      </Router>
    );
    expect(wrapper.text()).toContain('Role');
  });

  it('submit form ', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
      </Router>
    );
    wrapper.find('form').simulate('submit');
  });
  it('submit form ', () => {
    const wrapper = mount(
      <Router>
        <AddUser {...props} />
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
        id: ' ',
        lastName: ' ',
        role: ' ',
      };
      const badprops: ModalProps = {
        visible: true,
        toggle: toggleModal,
        name: 'Add',
        FormValues: badFormValues,
      };
      const resetForm = jest.fn();
      const componentRender = mount(
        <Router>
          <AddUser {...badprops} />
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
