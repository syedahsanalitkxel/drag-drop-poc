import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import InstrumentDetail from './index';
import ParticipantInterface from '../../../interfaces/Participant';
import EvaluatorInterface from '../../../interfaces/Evaluator';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import { ClientInstruments } from '../../../interfaces/Instruments';
import InstrumentDetailCard from '../../organisms/InstrumentDetailCard';
import Participant from '../../../interfaces/Participant';
import { TabPane } from 'reactstrap';
import ListCardItems from '../../organisms/ListCardItems';

configure({ adapter: new Adapter() });
describe('Instrument Detail', () => {
  const AssessmentItems: AssessmentItemInterface[] = [
    {
      category: 'Character',
      competency: 'Team Player',
      definition: 'Receive feedback from others and uses the feedback to improve performance',
      id: 'uuid-12-321',
      type: 'Competency',
    },
    {
      category: 'Action',
      competency: 'Good Coder',
      definition: 'Has a set of moral principles used in job in accordance with the culture of organization',
      id: 'uuid-11-111',
      type: 'Influential',
    },
  ];

  const participantsList: ParticipantInterface[] = [
    {
      email: 'jasminrasool@gmail.com',
      id: '1',
      name: 'jasmin Rasool',
      noOfEvaluators: '5',
      progress: '20%',
      status: 'InProgress',
    },
    {
      email: 'jasminrasool@gmail.com',
      id: '2',
      name: 'jasmin Rasool',
      noOfEvaluators: '2',
      progress: '50%',
      status: 'InProgress',
    },
    {
      email: 'jasminrasool@gmail.com',
      id: '3',
      name: 'jasmin Rasool',
      noOfEvaluators: '5',
      progress: '100%',
      status: 'Completed',
    },
    {
      email: 'jasminrasool@gmail.com',
      id: '4',
      name: 'jasmin Rasool',
      noOfEvaluators: '5',
      progress: '0%',
      status: 'NotStarted',
    },
    {
      email: 'jhonjames@gmail.com',
      id: '5',
      name: 'john james',
      noOfEvaluators: '5',
      progress: '20%',
      status: 'InProgress',
    },
    {
      email: 'jasminrasool@gmail.com',
      id: '6',
      name: 'jasmin Rasool',
      noOfEvaluators: '2',
      progress: '50%',
      status: 'InProgress',
    },
  ];

  const EvaluatorList: EvaluatorInterface[] = [
    {
      email: 'robbyrash@gmail.com',
      id: '1',
      name: 'Robby Rash',
      progress: '20%',
      role: 'UI/UX Leader',
      status: 'InProgress',
    },
    {
      email: 'maraymrassol@gmail.com',
      id: '2',
      name: 'Mariyam Rassal',
      progress: '100%',
      role: 'Department Head',
      status: 'Completed',
    },
    {
      email: 'robbyrash@gmail.com',
      id: '3',
      name: 'Robby Rash',
      progress: '50%',
      role: 'Team Lead',
      status: 'InProgress',
    },
    {
      email: 'robbyrash@gmail.com',
      id: '4',
      name: 'Robby Rash',
      progress: '20%',
      role: 'Senior Designer',
      status: 'InProgress',
    },
  ];

  const InstrumentList: ClientInstruments[] = [
    {
      id: '1',
      noOfAssessmentItems: '25',
      noOfEvaluations: '28',
      noOfParticipants: '30',
      title: '360° Leadership Instrument',
    },
    {
      id: '2',
      noOfAssessmentItems: '25',
      noOfEvaluations: '28',
      noOfParticipants: '30',
      title: '210° Leadership Instrument',
    },
  ];

  const mockViewFunction = jest.fn();
  const filterMockFunction = jest.fn();

  const instrumentDetailProps = {
    assessmentItems: AssessmentItems,
    evaluator: EvaluatorList,
    instruments: InstrumentList,
    participants: participantsList,
    view: mockViewFunction,
  };

  const client = shallow(<InstrumentDetail {...instrumentDetailProps} />);

  it('render successfully', () => {
    expect(client).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <InstrumentDetail {...instrumentDetailProps} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing with props', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <InstrumentDetail {...instrumentDetailProps} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Nav to be defined', () => {
    const wrapper = shallow(<InstrumentDetail {...instrumentDetailProps} />);
    expect(wrapper.find('Nav')).toBeDefined();
  });

  it('NavItem to be defined', () => {
    const wrapper = shallow(<InstrumentDetail {...instrumentDetailProps} />);
    expect(wrapper.find('NavItem')).toBeDefined();
  });

  it('NavLink to be defined', () => {
    const wrapper = shallow(<InstrumentDetail {...instrumentDetailProps} />);
    expect(wrapper.find('NavLink')).toBeDefined();
  });

  it('TabContent to be defined', () => {
    const wrapper = shallow(<InstrumentDetail {...instrumentDetailProps} />);
    expect(wrapper.find('TabContent')).toBeDefined();
  });

  it('TabPane to be defined', () => {
    const wrapper = shallow(<InstrumentDetail {...instrumentDetailProps} />);
    expect(wrapper.find('TabPane')).toBeDefined();
  });

  describe('InstrumentListCard', () => {
    const Key = 'title';

    const viewMockFunction = jest.fn();

    const props = {
      titleKey: Key,
      participants: participantsList,
      evaluator: EvaluatorList,
      view: viewMockFunction,
    };

    it('Instrument List Card to be defined', () => {
      const wrapper = shallow(<InstrumentDetailCard {...instrumentDetailProps} />);
      expect(wrapper.find('InstrumentDetailCard')).toBeDefined();
    });
    it('Instrument Detail Card Render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
          <InstrumentDetailCard />
        </Router>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Instrument Detail Card Render with props', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
          <InstrumentDetailCard {...props} />
        </Router>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Progress bar to be defined', () => {
      const wrapper = shallow(<InstrumentDetailCard {...props} />);
      expect(wrapper.find('.progress')).toBeDefined();
    });
  });

  describe('ListCardItems', () => {
    const Key = 'title';

    const props = { titleKey: Key, listData: AssessmentItems };

    it('List Card Item to be defined', () => {
      const wrapper = shallow(<ListCardItems {...instrumentDetailProps} />);
      expect(wrapper.find('ListCardItems')).toBeDefined();
    });
    it('List Card Item Render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
          <ListCardItems />
        </Router>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });

    it('List Card Item Render with props', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
          <ListCardItems {...props} />
        </Router>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
