import React, { useContext, useEffect, useState } from 'react';

import { Formik } from 'formik';
import { Button, Form } from 'reactstrap';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import AddEvaluationInterface, { ContactInterface } from '../../../interfaces/CreateAvaluation';
import FormikBag from '../../../interfaces/FormikBag';
import AddClientContacts from '../../organisms/AddClientContact/index';
import ParticipantList from '../../organisms/EvaluationParticipants';
import ClientContactsList from '../../organisms/ClientContactsList';
import DashboardTemplate from '../../templates/DashboardTemplate';
import EditClientContacts from '../../organisms/AddClientContact/index';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import evaluationFormSchema from './clientFormSchema';
import { AddInstrument, instructionLookup, fetchEmailTemplates } from '../../../modules/InstrumentTemplate/service';
import RadioButton from '../../atoms/RadioButton';
import Checkbox from '../../atoms/CheckBox';
import LookupContext, { LookupContextConsumer } from '../../../modules/Lookup/context';
import { LookupContextInterface, LookupItemInterface } from '../../../modules/Lookup/interface';
import { lookups } from '../../../modules/Lookup/enum';
interface Props {
  changeListener?: (formValues: AddEvaluationInterface) => void;
  defaultValues?: AddEvaluationInterface;
  action?: string;
}
const initialState: AddEvaluationInterface = {
  title: '',
  instructionVersionId: 0,
  instrumentTemplateId: 0,
  clientId: 0,
  testTypeId: 0,
  instrumentApplicationId: 0,
  recomendedApplicationId: 0,
  allowParticipantsToAddEvaluators: true,
  dueDate: '',
  minEvaluationsPerParticipant: 0,
  participantsInvitationEmailTemplateId: 0,
  evaluatorsInvitationEmailTemplateId: 0,
  sendInstrument: true,
  instructions: [],
  participantsInvitationEmailTemplates: [],
  evaluatorInvitationEmailTemplates: [],
  reminderTemplates: [],
  reminders: [],
  participants: [
    {
      firstName: '',
      lastName: '',
      email: '',
      roleId: 0,
      evaluators: [
        {
          firstName: '',
          lastName: '',
          email: '',
          roleId: 0,
        },
      ],
    },
  ],
};

const initialContactState: ContactInterface = {
  email: '',
  firstName: '',
  id: '',
  lastName: '',
  phone: '',
  role: '',
};

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const CreateInstruments: React.FunctionComponent<any> = ({ history, changeListener, defaultValues, action }) => {
  const contextValue = useContext(LookupContext);
  if (contextValue && contextValue.findKey) {
    var InviteEvaluator = contextValue.findKey(lookups.emailTypesLookUp).find(function(element) {
      return element.text === 'InviteEvaluator';
    });
    var InviteParticipant = contextValue.findKey(lookups.emailTypesLookUp).find(function(element) {
      return element.text === 'InviteParticipant';
    });
    var AssessmentReminder = contextValue.findKey(lookups.emailTypesLookUp).find(function(element) {
      return element.text === 'AssessmentReminder';
    });
  }
  const [isDraft, setisDraft] = useState(false);
  const [formState, setFormState] = useState(defaultValues || initialState);
  const [contactFormState, setContactFormState] = useState(initialContactState);
  const [addClientContactModalVisible, setAddClientContactModalVisible] = useState(false);
  const [editClientContactModalVisible, setEditClientContactModalVisible] = useState(false);
  function changeHandler(formikprops: any, event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formikprops.values, [event.target.name]: parseInt(event.target.value, 10) });
  }
  const toggleAddClientContactModal = () => {
    setContactFormState(initialContactState);
    setAddClientContactModalVisible(!addClientContactModalVisible);
  };

  const toggleEditClientContactModal = () => {
    setEditClientContactModalVisible(!editClientContactModalVisible);
  };
  async function fetchData() {
    setTimeout(async function() {
      const res = await instructionLookup();
      if (InviteEvaluator && InviteEvaluator.value) {
        var res1 = await fetchEmailTemplates(InviteEvaluator.value);
      }
      if (InviteParticipant && InviteParticipant.value) {
        var res2 = await fetchEmailTemplates(InviteParticipant.value);
      }
      if (AssessmentReminder && AssessmentReminder.value) {
        var res3 = await fetchEmailTemplates(AssessmentReminder.value);
      }
      setFormState({
        ...formState,
        instructions: res,
        evaluatorInvitationEmailTemplates: res1,
        participantsInvitationEmailTemplates: res2,
        reminderTemplates: res3,
      });
    }, 1000);
  }
  useEffect(() => {
    fetchData();
    if (changeListener) {
      changeListener(formState);
    }
  }, []);

  function removeContact(contactId: string) {
    alert(`deleting => ${contactId}`);
  }
  function cancel() {
    history.push('/instrument-templates');
  }
  async function submitForm(values: any) {
    if (values.emailTemplate1 && values.date1) {
      values.reminders.push({ emailTemplateId: values.emailTemplate1, reminderDate: values.date1 });
    }
    if (values.emailTemplate2 && values.date2) {
      values.reminders.push({ emailTemplateId: values.emailTemplate2, reminderDate: values.date2 });
    }
    if (values.emailTemplate3 && values.date3) {
      values.reminders.push({ emailTemplateId: values.emailTemplate3, reminderDate: values.date3 });
    }
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get('id');
    values.instrumentTemplateId = id;
    setFormState({ ...formState, ...values });
    const { activeClientId } = JSON.parse(localStorage.getItem('user') || '');
    values.clientId = activeClientId;
    values.sendInstrument = isDraft;
    const newState = { ...formState, ...values };
    await AddInstrument(newState);
    history.push('/instrument-templates');
  }
  const addNewEvaluator = (id: number) => {
    const newobj = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    };
    const { participants } = formState;
    participants[id].evaluators.push(newobj);
    setFormState({ ...formState, participants });
  };
  const removeParticipant = (id: number) => {
    const { participants } = formState;
    participants.splice(id, 1);
    setFormState({ ...formState, participants });
  };
  const renderInstrumentApplication = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.clientTypesLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const renderInstructions = (props: any) => {
    const { findKey } = props;
    if (formState.instructions && formState.instructions.length) {
      return formState.instructions.map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const renderRecomendedApplication = (props: any) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.recommendedApplicationsLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const renderParticipantEmailInvite = (props: any) => {
    const { findKey } = props;
    if (formState.participantsInvitationEmailTemplates && formState.participantsInvitationEmailTemplates.length) {
      return formState.participantsInvitationEmailTemplates.map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const renderReminderEmailTemplates = (props: any) => {
    const { findKey } = props;
    if (formState.reminderTemplates && formState.reminderTemplates.length) {
      return formState.reminderTemplates.map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const renderEvaluatorEmailInvite = (props: any) => {
    const { findKey } = props;
    if (formState.evaluatorInvitationEmailTemplates && formState.evaluatorInvitationEmailTemplates.length) {
      return formState.evaluatorInvitationEmailTemplates.map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const testTypeLookUp = (props: any, formikprops: any) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.testTypesLookUp).map((lookup: LookupItemInterface, index: any) => (
        <RadioButton
          key={index}
          name="testTypeId"
          value={lookup.value}
          currentSelection={formState.testTypeId}
          onChange={e => changeHandler(formikprops, e)}
        >
          {lookup.text}
        </RadioButton>
      ));
    }
  };
  const removeEvaluatior = (index: number, evalindex: number) => {
    const { participants } = formState;
    participants[index].evaluators.splice(evalindex, 1);
    setFormState({ ...formState, participants });
  };
  const onClickAddContact = (event: React.MouseEvent) => {
    const newobj = {
      firstName: '',
      lastName: '',
      email: '',
      roleId: 0,
      evaluators: [
        {
          firstName: '',
          lastName: '',
          email: '',
          roleId: 0,
        },
      ],
    };
    const { participants } = formState;
    participants.push(newobj);
    setFormState({ ...formState, participants });
  };
  function versionHandler(formikprops: any) {
    setTimeout(function() {
      let check = formState.allowParticipantsToAddEvaluators;
      setFormState({ ...formikprops.values, allowParticipantsToAddEvaluators: !check });
    }, 0);
  }
  const renderForm = (formikprops: FormikBag) => {
    // const renderParticipantList = (contact: any, index: number) => (
    //   <Fragment key={index}>
    //     <ParticipantList formikprops={formikprops} index={index} />
    //   </Fragment>
    // );

    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <div className="PageHeader">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <h2 className="font-weight-light">Start Evaluation</h2>
            </div>
          </div>
        </div>
        <PageBody card={true} wrapper={true} className="m-t-15">
          <div className="row">
            <div className="col-md-6">
              <FormElement label="Title" name="title" placeholder="Add Title" formikprops={formikprops} inline={true} />
            </div>
            <div className="col-md-6">
              <div>
                <label className="font-bold">Test Type</label>
              </div>
              <LookupContextConsumer>{lookups => testTypeLookUp(lookups, formikprops)}</LookupContextConsumer>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="Instrument Application"
                name="instrumentApplicationId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
              >
                <option value={0}>Select Instrument Application</option>
                <LookupContextConsumer>{renderInstrumentApplication}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-md-6">
              <FormElement
                label="Due Date"
                name="dueDate"
                formikprops={formikprops}
                type={FormElementTypes.DATE}
                inline={true}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <FormElement
                label="Min. Number of Evaluations"
                name="minEvaluationsPerParticipant"
                placeholder="Add Min. Number"
                formikprops={formikprops}
                inline={true}
                last={true}
              />
            </div>
            <div className="col-md-4">
              <FormElement
                label="Participant Invitation Email Template"
                name="participantsInvitationEmailTemplateId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="0">Select Template</option>
                <LookupContextConsumer>{renderParticipantEmailInvite}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-md-4">
              <FormElement
                label="Evaluator Invitation Email Template"
                name="evaluatorsInvitationEmailTemplateId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="0">Select Template</option>
                <LookupContextConsumer>{renderEvaluatorEmailInvite}</LookupContextConsumer>
              </FormElement>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <FormElement
                label="Instructions"
                name="instructionVersionId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="0">Select Template</option>
                <LookupContextConsumer>{renderInstructions}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-md-4">
              <FormElement
                label="Recommended Application"
                name="recomendedApplicationId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="0">Select Template</option>
                <LookupContextConsumer>{renderRecomendedApplication}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-sm-5 d-flex align-items-center">
              <Checkbox
                name="allowParticipantsToAddEvaluators"
                value="allowParticipantsToAddEvaluators"
                isChecked={formState && formState.allowParticipantsToAddEvaluators}
                onChange={() => versionHandler(formikprops)}
              >
                Allow Participant to Add Evaluators
              </Checkbox>
            </div>
          </div>
        </PageBody>

        <div className="form-header row">
          <div className="col-sm-6">
            <h3>Participants</h3>
          </div>
          <div className="col-sm-6">
            <Button className="mt-3 float-right" color="primary" size="lg" onClick={onClickAddContact}>
              Add Participants
            </Button>
          </div>
        </div>

        <div>
          <ParticipantList
            formikprops={formikprops}
            participant={formState.participants}
            addNewEvaluator={addNewEvaluator}
            removeParticipant={removeParticipant}
            removeEvaluatior={removeEvaluatior}
          />
        </div>

        {/*<AddClientContacts*/}
        {/*fprops={formikprops}*/}
        {/*formStateUpdate={ClientContactsFormState}*/}
        {/*visible={addClientContactModalVisible}*/}
        {/*toggle={toggleAddClientContactModal}*/}
        {/*formValues={contactFormState}*/}
        {/*name={'Add'}*/}
        {/*/>*/}

        {/*<EditClientContacts*/}
        {/*fprops={formikprops}*/}
        {/*formStateUpdate={ClientContactsFormState}*/}
        {/*visible={editClientContactModalVisible}*/}
        {/*toggle={toggleEditClientContactModal}*/}
        {/*formValues={contactFormState}*/}
        {/*name="Edit"*/}
        {/*/>*/}

        <div className="form-header row">
          <div className="col-sm-6">
            <h3>Set Reminder</h3>
          </div>
        </div>

        <PageBody card={true} wrapper={true}>
          <div className="row">
            <div className="col-sm-6">
              <FormElement
                label=" Email Template"
                name="emailTemplate1"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value={0}>Select Template</option>
                <LookupContextConsumer>{renderReminderEmailTemplates}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-sm-6">
              <FormElement
                label="Due Date"
                name="date1"
                formikprops={formikprops}
                type={FormElementTypes.DATE}
                inline={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <FormElement
                label=" Email Template"
                name="emailTemplate2"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value={0}>Select Template</option>
                <LookupContextConsumer>{renderReminderEmailTemplates}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-sm-6">
              <FormElement
                label="Due Date"
                name="date2"
                formikprops={formikprops}
                type={FormElementTypes.DATE}
                inline={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <FormElement
                label=" Email Template"
                name="emailTemplate3"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value={0}>Select Template</option>
                <LookupContextConsumer>{renderReminderEmailTemplates}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-sm-6">
              <FormElement
                label="Due Date"
                name="date3"
                formikprops={formikprops}
                type={FormElementTypes.DATE}
                inline={true}
              />
            </div>
          </div>
        </PageBody>

        <PageBody>
          <div className="row m-b-25">
            <StyledButton
              onClick={() => {
                cancel();
              }}
              type="button"
              size="lg"
            >
              Cancel
            </StyledButton>
            <StyledButton
              onClick={() => {
                setisDraft(false);
              }}
              type="submit"
              name="submit"
              color="primary"
              size="lg"
            >
              Save
            </StyledButton>
            <StyledButton
              onClick={() => {
                setisDraft(true);
              }}
              type="submit"
              name="submit"
              color="primary"
              size="lg"
            >
              Save and Publish
            </StyledButton>
          </div>
        </PageBody>
      </Form>
    );
  };

  return (
    <DashboardTemplate>
      <Formik
        enableReinitialize={true}
        initialValues={formState}
        validationSchema={evaluationFormSchema}
        onSubmit={submitForm}
      >
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
    </DashboardTemplate>
  );
};

export default withRouter(CreateInstruments);
