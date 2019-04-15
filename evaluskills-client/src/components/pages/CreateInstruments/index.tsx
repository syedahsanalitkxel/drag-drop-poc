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
import RadioButton from '../../atoms/RadioButton';
interface Props {
  changeListener?: (formValues: AddEvaluationInterface) => void;
  defaultValues?: AddEvaluationInterface;
  action?: string;
}

const initialState: AddEvaluationInterface = {
  address: '',
  billing: '',
  city: '',
  clientInformation: '',
  clientName: '',
  clientType: '',
  contact: [
    {
      email: '',
      firstName: '',
      id: '',
      lastName: '',
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
  assessmentType: 'active',
  newParticipant: [
    {
      paticipant: {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
      },
      evaluator: [
        {
          firstName: '',
          lastName: '',
          email: '',
          role: '',
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

export const CreateInstruments: React.FunctionComponent<Props> = ({
  changeListener,
  defaultValues,
  action,
}) => {
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

  function submitForm(values: AddEvaluationInterface) {
    setFormState({ ...formState, ...values });
  }
  const addNewEvaluator = (id: number) => {
    const newobj = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    };
    const { newParticipant } = formState;
    newParticipant[id].evaluator.push(newobj);
    setFormState({ ...formState, newParticipant });
  };
  const removeParticipant = (id: number) => {
    const { newParticipant } = formState;
    newParticipant.splice(id, 1);
    setFormState({ ...formState, newParticipant });
  };
  const removeEvaluatior = (index: number, evalindex: number) => {
    const { newParticipant } = formState;
    newParticipant[index].evaluator.splice(evalindex, 1);
    setFormState({ ...formState, newParticipant });
  };
  const onClickAddContact = (event: React.MouseEvent) => {
    const newobj = {
      paticipant: {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
      },
      evaluator: [
        {
          firstName: '',
          lastName: '',
          email: '',
          role: '',
        },
      ],
    };
    const { newParticipant } = formState;
    newParticipant.push(newobj);
    setFormState({ ...formState, newParticipant });
  };

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
              <FormElement
                label="Title"
                name="title"
                placeholder="Add Title"
                formikprops={formikprops}
                inline={true}
              />
            </div>
            <div className="form-group  col-md-6">
              <label className="col-sm-2 col-form-label font-bold">Status</label>
              <div className="col-sm-10 d-flex align-items-center">
                <RadioButton
                  name="assessmentType"
                  value="active"
                  currentSelection={formState.assessmentType}
                  onChange={changeHandler}
                >
                  Active
                </RadioButton>
                <RadioButton
                  name="assessmentType"
                  value="inactive"
                  currentSelection={formState.assessmentType}
                  onChange={changeHandler}
                >
                  inactive
                </RadioButton>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="Instrument Application"
                name="billing"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
              >
                <option value="billing-1">Higher Eduction</option>
                <option value="billing-2">Option 2</option>
              </FormElement>
            </div>
            <div className="col-md-6">
              <FormElement
                label="Due Date"
                name="date"
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
                name="minEvaluator"
                placeholder="Add Min. Number"
                formikprops={formikprops}
                inline={true}
                last={true}
              />
            </div>
            <div className="col-md-4">
              <FormElement
                label="Participant Invitation Email Template"
                name="participantEmail"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="billing-1">Select Template</option>
                <option value="billing-2">Option 2</option>
                <option value="billing-2">Option 3</option>
              </FormElement>
            </div>
            <div className="col-md-4">
              <FormElement
                label="Evaluator Invitation Email Template"
                name="clientType"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="selected">Select Template</option>
                <option value="billing-2">Option 2</option>
                <option value="billing-2">Option 3</option>
              </FormElement>
            </div>
          </div>
        </PageBody>

        <div className="form-header row">
          <div className="col-sm-6">
            <h3>Participants</h3>
          </div>
          <div className="col-sm-6">
            <Button
              className="mt-3 float-right"
              color="primary"
              size="lg"
              onClick={onClickAddContact}
            >
              Add Participants
            </Button>
          </div>
        </div>

        <div>
          <ParticipantList
            formikprops={formikprops}
            participant={formState.newParticipant}
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
            <StyledButton type="submit" name="submit" color="primary" size="lg">
              Save
            </StyledButton>
            {/* {!action && (
              <StyledButton type="button" color="primary" size="lg">
                Save &amp; Add More
              </StyledButton>
            )} */}
          </div>
        </PageBody>
      </Form>
    );
  };

  return (
    <DashboardTemplate>
      <Formik
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
