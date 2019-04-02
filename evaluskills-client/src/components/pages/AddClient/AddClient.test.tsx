import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddClient from './index';

configure({ adapter: new Adapter() });

const formValues = {
  address: 'Cantt. MughalPura Lahore',
  billing: '',
  city: 'Lahore',
  clientInformation: '',
  clientName: 'TkXel',
  clientType: '',
  contact: [
    {
      id: '1',
      email: 'maria@evaluskills.com',
      firstName: 'Maria',
      lastName: ' Garcia',
      phone: '+1 818-452-1505',
      role: '',
    },
  ],
  id: '2',
  noOfAssessments: '25',
  noOfEvaluators: '28',
  noOfParticipants: '30',
  phone: '+1 818-452-1505',
  plan: 'Plan 01',
  school: 'P.R Boys high school',
  state: 'punjab',
  status: 'Active',
  userEmail: 'ali@tkxel.com',
  userFirstName: 'ali',
  userLastName: 'raza',
  zip: '54000',
};

describe('MyComponent', () => {
  const mockChangeListener = jest.fn();
  const action = 'edit';
  const props = { defaultValue: { formValues }, action: { action } };
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AddClient />);
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
  it('16 Input fields in `.form`', () => {
    const wrapper = mount(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.find('Input')).toHaveLength(16);
  });
  it('17 Form Feedback in `.form`', () => {
    const wrapper = mount(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.find('FormFeedback')).toHaveLength(17);
  });
  it('48 form control `.form-control`s', () => {
    const wrapper = mount(
      <Router>
        <AddClient />
      </Router>
    );
    expect(wrapper.find('.form-control')).toHaveLength(48);
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
        address: ' ',
        billing: '',
        city: '',
        clientInformation: '',
        clientName: '',
        clientType: '',
        contact: [
          {
            id: '',
            email: '',
            firstName: '',
            lastName: ' ',
            phone: '',
            role: '',
          },
        ],
        id: '',
        noOfAssessments: '',
        noOfEvaluators: '',
        noOfParticipants: '',
        phone: '',
        plan: '',
        school: '',
        state: '',
        status: '',
        userEmail: '',
        userFirstName: '',
        userLastName: '',
        zip: '',
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
