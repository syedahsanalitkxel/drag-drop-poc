import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ParticipantEmailInvite from './index';

configure({ adapter: new Adapter() });
const PrtEmailInvite = shallow(<ParticipantEmailInvite />);
it('it renders correctly', () => {
  expect(PrtEmailInvite).toMatchSnapshot();
});
