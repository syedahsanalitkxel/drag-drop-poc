import React, { useState } from 'react';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';
import InstrumentDetailCard from '../../organisms/InstrumentDetailCard';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { ClientInstruments } from '../../../interfaces/Instruments';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import ParticipantInterface from '../../../interfaces/Participant';
import EvaluatorInterface from '../../../interfaces/Evaluator';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import ListCardItems from '../../organisms/ListCardItems';
import ESModal from '../../../components/molecules/Modal';
import AssessmentItemsList from '../../../components/pages/AddEditInstrumentTemplate/AssessmentItemsList';
import _ from 'lodash-es';

interface Props {
  instruments: any;
  view?: (evaluationId: string) => void;
  participants: ParticipantInterface[];
  AssessmentItems: any;
  actionHandler?: (values?: any, evaluationId?: string, action?: string, token?: string) => void;
}

const InstrumentDetailTemplate: React.FunctionComponent<Props> = ({
  instruments,
  view,
  participants,
  AssessmentItems,
  actionHandler,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState(AssessmentItems);
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

  const getAssessment = (values: any) => {
    values.map((val: any) => {
      val.id = val.itemId;
    });
    console.log(values);
    const valu = _.unionBy(formState, values, 'id');
    setFormState(valu);
    if (actionHandler) {
      actionHandler(valu, '', 'addAssessment');
    }
    setModalVisible(false);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          {activeTab === '2' ? (
            <PageHeader
              title={instruments.title}
              activeButtonText="Activate"
              activeButtonActionHandler={activateClickHandler}
              viewButtonText="View Results"
              viewButtonActionHandler={viewClickHandler}
              cancelButtonText="Cancel Assessment"
              cancelButtonActionHandler={cancelClickHandler}
              addAssessmentButtonText="Add Assessment Items"
              addAssessmentActionHandler={() => {
                setModalVisible(true);
              }}
            />
          ) : (
            <PageHeader
              title={instruments.title}
              activeButtonText="Activate"
              activeButtonActionHandler={activateClickHandler}
              viewButtonText="View Results"
              viewButtonActionHandler={viewClickHandler}
              cancelButtonText="Cancel Assessment"
              cancelButtonActionHandler={cancelClickHandler}
            />
          )}
          <PageBody>
            <Nav tabs={true}>
              <NavItem>
                <NavLink id="1" className={classnames({ active: activeTab === '1' })} onClick={toggle}>
                  Participants {participants.length}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="2" className={classnames({ active: activeTab === '2' })} onClick={toggle}>
                  Assessments Items {formState.length > 0 ? formState.length : ''}
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <InstrumentDetailCard
                  titleKey="title"
                  participants={participants}
                  view={view}
                  actionHandler={actionHandler}
                />
              </TabPane>
              <TabPane tabId="2">{formState && <ListCardItems titleKey="definition" listData={formState} />}</TabPane>
            </TabContent>

            <ESModal
              title="Add Assessment Items"
              visible={modalVisible}
              toggle={() => setModalVisible(!modalVisible)}
              primaryAction={getAssessment}
              primaryText="Add"
              secondaryText="Cancel"
              secondaryAction="dismiss"
              size="lg"
              parentClass="addassessModal"
            >
              <AssessmentItemsList mode="edit" />
            </ESModal>

            {/*<Pager />*/}
          </PageBody>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InstrumentDetailTemplate;
