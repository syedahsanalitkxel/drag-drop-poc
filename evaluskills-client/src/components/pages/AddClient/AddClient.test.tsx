import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddClient from './index';

configure({ adapter: new Adapter() });

const formValues = {
  address: ' ',
  billing: 'plan 2',
  city: ' ',
  clientInformation: ' ',
  clientName: 'Maria Gracia',
  clientType: 'Type 1',
  contact: [
    {
      email: 'Ali@tkxel.com',
      firstName: 'Ali',
      lastName: 'Raza',
      phone: '+923334567891',
      role: 'user',
    },
  ],
  phone: '+888 667 999 ',
  school: ' ',
  state: ' ',
  userEmail: 'rizwan@tkxel.com',
  userFirstName: 'rizwan',
  userLastName: 'shah',
  zip: ' ',
};

describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AddClient {...formValues} />);
    expect(component).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <AddClient />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('to be defined of form control `.form`s', () => {
    const wrapper = shallow(<AddClient />);
    expect(wrapper.find('.form')).toBeDefined();
  });
  it('17 Input fields in `.form`', () => {
    const wrapper = mount(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.find('Input')).toHaveLength(17);
  });
  it('12 Form Feedback in `.form`', () => {
    const wrapper = mount(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.find('FormFeedback')).toHaveLength(12);
  });
  it('49 form control `.form-control`s', () => {
    const wrapper = mount(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.find('.form-control')).toHaveLength(49);
    expect(wrapper.find('.form-control')).toBeDefined();
  });
  it('First Name label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('First Name');
  });
  it('Last Name label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Last Name');
  });
  it('Email label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Email');
  });
  it('Role label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Role');
  });
  it('Address label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Address');
  });
  it('City label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('City');
  });
  it('State label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('State');
  });
  it('Zip label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Zip');
  });
  it('Billing label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Billing');
  });
  it('School/Subsidiary label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('School/Subsidiary');
  });
  it('Client Name label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Client Name');
  });
  it('Client Type ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Client Type');
  });
  it('Client Information label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Client Information');
  });
  it('Contact label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('Contact');
  });
  it('User Information label exist ', () => {
    const wrapper = render(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.text()).toContain('User Information');
  });

  // describe('when typing into the First Name input', () => {
  //   const person = 'Uncle';
  //   const wrapper = render(
  //     <Router>
  //       <AddClient />
  //     </Router>
  //   );
  //   console.log(wrapper)
  //   beforeEach( () => {
  //     wrapper.find('.userFirstName-input').simulate('change', { target : { value: person } });
  //   })
  //
  //   it ('update the person in `state`', () => {
  //     expect(wrapper.state().userFirstName).toEqual(person)
  //   })
  // })
  //

  it('submit form ', () => {
    const wrapper = mount(
      <Router>
        <AddClient />
      </Router>
    );
    wrapper.find('form').simulate('submit');
  });
  it('submit form ', () => {
    const wrapper = mount(
      <Router>
        <AddClient />
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
        email: 'aa',
        firstName: ' ',
        lastName: ' ',
        role: ' ',
      };
      const resetForm = jest.fn();
      const componentRender = mount(
        <Router>
          <AddClient {...badFormValues} />
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
