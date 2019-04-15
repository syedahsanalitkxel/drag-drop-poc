import React, { useState } from 'react';

import InstrumentTemplateInterface from '../../../interfaces/InstrumentTemplate';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';
import InstrumentDetailCard from '../../organisms/InstrumentDetailCard';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { ClientInstruments } from '../../../interfaces/Instruments';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import ParticipantInterface from '../../../interfaces/Participant';
import EvaluatorInterface from '../../../interfaces/Evaluator';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import ListCardItems from '../../organisms/ListCardItems';

interface Props {
  instruments: any;
  view?: (evaluationId: string) => void;
  participants: ParticipantInterface[];
  evaluator: EvaluatorInterface[];
  assessmentItems: AssessmentItemInterface[];
}

const InstrumentDetailTemplate: React.FunctionComponent<Props> = ({
  instruments,
  view,
  participants,
  evaluator,
  assessmentItems,
}) => {
  console.log(instruments.title);
  const activateClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    // toggleFilterModal();
  };

  const viewClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    // toggleFilterModal();
  };

  const cancelClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    // toggleFilterModal();
  };

  const [activeTab, setActiveTab] = useState('1');

  const toggle = () => {
    if (activeTab === '1') {
      setActiveTab('2');
    } else if (activeTab === '2') {
      setActiveTab('1');
    }
  };

  return (
    <DashboardTemplate>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title={instruments.title}
            activeButtonText="Activate"
            activeButtonActionHandler={activateClickHandler}
            viewButtonText="View Results"
            viewButtonActionHandler={viewClickHandler}
            cancelButtonText="Cancel Assessment"
            cancelButtonActionHandler={cancelClickHandler}
          />
          <PageBody>
            <Nav tabs={true}>
              <NavItem>
                <NavLink
                  id="1"
                  className={classnames({ active: activeTab === '1' })}
                  onClick={toggle}
                >
                  Participants {participants.length}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  id="2"
                  className={classnames({ active: activeTab === '2' })}
                  onClick={toggle}
                >
                  Assessments Items {assessmentItems.length}
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <InstrumentDetailCard
                  titleKey="title"
                  participants={participants}
                  evaluator={evaluator}
                  view={view}
                />
              </TabPane>
              <TabPane tabId="2">
                <ListCardItems titleKey="definition" listData={assessmentItems} />
              </TabPane>
            </TabContent>
            {/*<Pager />*/}
          </PageBody>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default InstrumentDetailTemplate;
