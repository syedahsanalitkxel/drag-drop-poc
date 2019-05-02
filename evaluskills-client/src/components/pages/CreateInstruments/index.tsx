import React, { Fragment, useEffect, useState } from 'react';

import { Formik } from 'formik';
import { Button, Form } from 'reactstrap';
import styled from 'styled-components';

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
import { AddInstrument } from '../../../modules/InstrumentTemplate/service';
import RadioButton from '../../atoms/RadioButton';
import Checkbox from '../../atoms/CheckBox';
import { LookupContextConsumer } from '../../../modules/Lookup/context';
import { LookupContextInterface, LookupItemInterface } from '../../../modules/Lookup/interface';
import { lookups } from '../../../modules/Lookup/enum';
interface Props {
  changeListener?: (formValues: AddEvaluationInterface) => void;
  defaultValues?: AddEvaluationInterface;
  action?: string;
}

const initialState: AddEvaluationInterface = {
  title: '',
  instructionVersionId: 1,
  instrumentTemplateId: 1,
  clientId: 0,
  testTypeId: 1,
  instrumentApplicationId: 1,
  recomendedApplicationId: 1,
  allowParticipantsToAddEvaluators: true,
  dueDate: '2019-04-30T06:06:04.781Z',
  minEvaluationsPerParticipant: 0,
  participantsInvitationEmailTemplateId: 0,
  evaluatorsInvitationEmailTemplateId: 0,
  sendInstrument: true,
  reminders: [
    {
      emailTemplateId: 1,
      reminderDate: '2019-04-30T06:06:04.781Z',
    },
    {
      emailTemplateId: 1,
      reminderDate: '2019-04-30T06:06:04.781Z',
    },
    {
      emailTemplateId: 1,
      reminderDate: '2019-04-30T06:06:04.781Z',
    },
  ],
  participants: [
    {
      firstName: '',
      lastName: '',
      email: '',
      roleId: 0,
      evaluator: [
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

export const CreateInstruments: React.FunctionComponent<Props> = ({ changeListener, defaultValues, action }) => {
  const [isDraft, setisDraft] = useState(false);
  const [formState, setFormState] = useState(defaultValues || initialState);
  const [contactFormState, setContactFormState] = useState(initialContactState);
  const [addClientContactModalVisible, setAddClientContactModalVisible] = useState(false);
  const [editClientContactModalVisible, setEditClientContactModalVisible] = useState(false);
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }
  const toggleAddClientContactModal = () => {
    setContactFormState(initialContactState);
    setAddClientContactModalVisible(!addClientContactModalVisible);
  };

  const toggleEditClientContactModal = () => {
    setEditClientContactModalVisible(!editClientContactModalVisible);
  };

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
  });

  function removeContact(contactId: string) {
    alert(`deleting => ${contactId}`);
  }

  async function submitForm(values: AddEvaluationInterface) {
    console.log(isDraft);
    debugger;
    setFormState({ ...formState, ...values });
    const { activeClientId } = JSON.parse(localStorage.getItem('user') || '');
    const newState = { ...formState, ...values, clientId: activeClientId, sendInstrument: isDraft };

    // newState.reminders.push({reminderDate:values.date1,emailTemplateId:0});
    let result = await AddInstrument(newState);
    debugger;
  }
  const addNewEvaluator = (id: number) => {
    const newobj = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    };
    const { participants } = formState;
    participants[id].evaluator.push(newobj);
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
  const removeEvaluatior = (index: number, evalindex: number) => {
    const { participants } = formState;
    participants[index].evaluator.splice(evalindex, 1);
    setFormState({ ...formState, participants });
  };
  const onClickAddContact = (event: React.MouseEvent) => {
    const newobj = {
      participant: {
        firstName: '',
        lastName: '',
        email: '',
        roleId: 0,
      },
      evaluator: [
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
  function versionHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let check = formState && formState.allowParticipantsToAddEvaluators;
    setFormState({ ...formState, allowParticipantsToAddEvaluators: !check });
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
                <option value="0">Select Instrument Application</option>
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
                <option value="1">Option 2</option>
                <option value="2">Option 3</option>
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
                <option value="1">Option 2</option>
                <option value="2">Option 3</option>
              </FormElement>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-5 d-flex align-items-center">
              <Checkbox
                name="allowParticipantsToAddEvaluators"
                value="allowParticipantsToAddEvaluators"
                isChecked={formState && formState.allowParticipantsToAddEvaluators}
                onChange={versionHandler}
              >
                Save As New Version
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
                <option value="billing-1">Higer Education</option>
                <option value="billing-2">Option 2</option>
                <option value="billing-2">Option 3</option>
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
                <option value="billing-1">Higer Education</option>
                <option value="billing-2">Option 2</option>
                <option value="billing-2">Option 3</option>
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
                <option value="billing-1">Higer Education</option>
                <option value="billing-2">Option 2</option>
                <option value="billing-2">Option 3</option>
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
            <StyledButton type="button" size="lg">
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
              Save and publish
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

export default CreateInstruments;
