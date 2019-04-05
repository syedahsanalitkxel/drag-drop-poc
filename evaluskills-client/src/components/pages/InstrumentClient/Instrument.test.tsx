import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Instrument from './index';
import InstrumentListCard from '../../organisms/InstrumentListCard/index';

configure({ adapter: new Adapter() });
describe('Instrument', () => {
  const instruments = [
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

  const instrumentProps = {
    listData: instruments,
    view: mockViewFunction,
    filter: filterMockFunction,
  };

  const client = shallow(<Instrument />);

  it('render successfully', () => {
    expect(client).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Instrument />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing with props', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Instrument {...instrumentProps} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('InstrumentListCard', () => {
    const Key = 'title';
    const Data = [
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

    const viewMockFunction = jest.fn();

    const props = { titleKey: Key, listData: Data, view: viewMockFunction };

    it('Instrument List Card to be defined', () => {
      const wrapper = shallow(<Instrument />);
      expect(wrapper.find('InstrumentListCard')).toBeDefined();
    });
    it('Instrument List Card Render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
          <InstrumentListCard />
        </Router>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Instrument List Card Render without props', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
          <InstrumentListCard {...props} />
        </Router>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Progress bar to be defined', () => {
      const wrapper = shallow(<InstrumentListCard />);
      expect(wrapper.find('.progress')).toBeDefined();
    });
  });
});
