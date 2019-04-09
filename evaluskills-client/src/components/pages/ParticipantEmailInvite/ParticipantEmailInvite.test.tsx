import { shallow } from 'enzyme';
import ParticipantEmailInvite from './index';

describe('ParticipantEmailInvite', () => {
  const PrtEmailInvite = shallow(<ParticipantEmailInvite />);
  it('it renders correctly', () => {
    expect(PrtEmailInvite).toMatchSnapshot();
  });
});
