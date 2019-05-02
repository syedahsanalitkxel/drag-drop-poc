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
import InstrumentReminders from '../../organisms/InstrumentReminders';
import ListCardItems from '../../organisms/ListCardItems';
import ESModal from '../../../components/molecules/Modal';
import AssessmentItemsList from '../../../components/pages/AddEditInstrumentTemplate/AssessmentItemsList';
import _, { remove } from 'lodash-es';
import EmptyPage from '../../atoms/EmptyPage';
import { cancelInstrument } from '../../../modules/InstrumentTemplate/service';

interface Props {
  instruments: any;
  view?: (evaluationId: string) => void;
  participants: ParticipantInterface[];
  AssessmentItems: any;
  actionHandler?: (values?: any, evaluationId?: string, action?: string, token?: string) => void;
  sendInstrument?: (evaluationId: string, action?: string) => void;
}

const InstrumentDetailTemplate: React.FunctionComponent<Props> = ({
  instruments,
  view,
  participants,
  AssessmentItems,
  actionHandler,
  sendInstrument,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState(AssessmentItems);
  const [prevFormState, setPrevFormState] = useState([]);
  const [nextFormState, setNextFormState] = useState(AssessmentItems);
  const activateClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (sendInstrument) {
      sendInstrument(instruments.id, 'activate');
    }
  };

  const viewClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    // toggleFilterModal();
  };
  async function cancel() {
    await cancelInstrument(instruments.id);
  }
  const cancelClickHandler = (event: React.MouseEvent) => {
    cancel();
    event.preventDefault();
    if (sendInstrument) {
      sendInstrument(instruments.id, 'cancel');
    }
  };

  const [activeTab, setActiveTab] = useState('1');

  function toggle(event: React.MouseEvent) {
    setActiveTab(event.currentTarget.id);
  }

  function handleInstrumentReminder(values: any) {
    if (actionHandler) {
      const reminders = instruments;
      delete reminders.instrumentItems;
      delete reminders.participants;
      delete reminders.participants;
      delete reminders.reminders;
      reminders.reminders = values;
      actionHandler(reminders, '', 'addReminders');
    }
  }

  const getAssessment = (values: any) => {
    console.log(values);
    setFormState(values);
    setModalVisible(false);
  };

  const removeAssessments = (id: any) => {
    const assessments = formState.filter((assessmentItems: any) => assessmentItems.itemVersionId !== id);
    setFormState(assessments);
  };

  const submittAssessments = () => {
    if (actionHandler) {
      actionHandler(formState, '', 'addAssessment');
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          {instruments.status === 'Draft' && activeTab === '3' && (
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
          )}
          {(activeTab === '1' || activeTab === '2' || (instruments.status === 'Published' && activeTab === '3')) && (
            <PageHeader
              title={instruments.title}
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
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="2" className={classnames({ active: activeTab === '2' })} onClick={toggle}>
                  Participants {participants.length}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="3" className={classnames({ active: activeTab === '3' })} onClick={toggle}>
                  Assessments Items {formState.length > 0 ? formState.length : ''}
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <InstrumentReminders defaultValues={instruments.reminders} changeListener={handleInstrumentReminder} />
              </TabPane>
              <TabPane tabId="2">
                <InstrumentDetailCard
                  titleKey="title"
                  participants={participants}
                  view={view}
                  actionHandler={actionHandler}
                />
              </TabPane>
              <TabPane tabId="3">
                {formState && (
                  <ListCardItems
                    titleKey="definition"
                    listData={formState}
                    remove={removeAssessments}
                    componentName="instrument"
                    submittAssessments={submittAssessments}
                    status={instruments.status}
                  />
                )}
              </TabPane>
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
              <AssessmentItemsList mode="edit" selectedTemplateItems={formState} />
            </ESModal>

            {/*<Pager />*/}
          </PageBody>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InstrumentDetailTemplate;
