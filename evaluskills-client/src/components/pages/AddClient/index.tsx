import React, { Fragment, useEffect, useState } from 'react';

import { ErrorMessage, Formik, getIn } from 'formik';
import { Button, Form } from 'reactstrap';
import styled from 'styled-components';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import AddEditClientInterface, {
  ClientUserInterface,
  ContactInterface,
} from '../../../interfaces/AddEditClient';
// import ClientInterface, { ClientUserInterface, ContactInterface } from '../../../interfaces/Client';
import FormikBag from '../../../interfaces/FormikBag';
import AddClientContacts from '../../organisms/AddClientContact/index';
import ClientContacts from '../../organisms/ClientContacts/ClientContacts';
import ClientContactsList from '../../organisms/ClientContactsList';
import DashboardTemplate from '../../templates/DashboardTemplate';
import EditClientContacts from '../../organisms/AddClientContact/index';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import clientFormSchema from './clientFormSchema';

interface Props {
  changeListener: (formValues: any) => void;
  defaultValues?: any;
  action?: string;
  clients?: any;
}

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const AddClient: React.FunctionComponent<Props> = ({
  changeListener,
  defaultValues,
  action,
  clients,
}) => {
  const [formState, setFormState] = useState(defaultValues);
  const [file, setfile] = useState({});
  const [contactFormState, setContactFormState] = useState(defaultValues.clientContacts);
  const [addClientContactModalVisible, setAddClientContactModalVisible] = useState(false);
  const [editClientContactModalVisible, setEditClientContactModalVisible] = useState(false);

  const toggleAddClientContactModal = () => {
    setContactFormState([]);
    setAddClientContactModalVisible(!addClientContactModalVisible);
  };

  const toggleEditClientContactModal = () => {
    setEditClientContactModalVisible(!editClientContactModalVisible);
  };

  // useEffect(() => {
  //   if (changeListener && formState) {
  //     changeListener(formState);
  //   }
  // }
  // );

  function editContact(contactId: number) {
    if (defaultValues && defaultValues.clientContacts) {
      const contactData: any = defaultValues.clientContacts;
      setContactFormState(contactData);
      toggleEditClientContactModal();
    }
  }

  function removeContact(contactId: number) {
    alert(`deleting => ${contactId}`);
  }

  function submitForm(values: any) {
    values.stateId = parseInt(values.stateId, 10);
    values.billingPlanId = parseInt(values.billingPlanId, 10);
    values.clientTypeId = parseInt(values.clientTypeId, 10);
    changeListener({ ...formState, ...values });
    setFormState({ ...formState, ...values });
  }

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormState({ ...formState, [event.target.name]: event.target.files[0] });
      setfile(event.target.files);
    }
  };
  const onClickAddContact = (event: React.MouseEvent) => {
    if (action === 'edit') {
      event.preventDefault();
      toggleAddClientContactModal();
    }

    if (action !== 'edit' && formState.clientContacts) {
      const { clientContacts } = formState;
      const contactObj: ContactInterface = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        title: '',
      };
      clientContacts.push(contactObj);
      setFormState({ ...formState, clientContacts });
    }
  };

  const renderForm = (formikprops: FormikBag) => {
    const renderContactList = (clientContacts: any, index: number) => (
      <Fragment key={index}>
        <ClientContacts formikprops={formikprops} index={index} />
      </Fragment>
    );

    return (
      <Form onSubmit={formikprops.handleSubmit} className="form" encType="multipart/form-data">
        <PageBody card={true} wrapper={true} className="m-t-15">
          <FormElement
            label="Client Name"
            name="clientName"
            placeholder="Add Client Name"
            formikprops={formikprops}
          />

          <FormGroup>
            <Label for="exampleFile">Upload Image</Label>
            <Input type="file" name="clientLogo" id="exampleFile" onChange={uploadImage} />
          </FormGroup>

          {/*<input type="file" name="clientLogo" accept="image/*" onChange={ event => event.target.files } />*/}

          {/*<FormElement*/}
          {/*label="Logo"*/}
          {/*name="clientLogo"*/}
          {/*formikprops={formikprops}*/}
          {/*noValidate={true}*/}
          {/*type={FormElementTypes.IMAGE_UPLOAD}*/}
          {/*/>*/}

          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="Address"
                name="address1"
                placeholder="Add Address"
                formikprops={formikprops}
                inline={true}
              />
            </div>
            <div className="col-md-6">
              <FormElement
                label="City"
                name="city"
                placeholder="Add City"
                formikprops={formikprops}
                inline={true}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="State"
                name="stateId"
                placeholder="Add State"
                formikprops={formikprops}
                inline={true}
              />
            </div>
            <div className="col-md-6">
              <FormElement
                label="Zip"
                name="zip"
                placeholder="Add Zip"
                formikprops={formikprops}
                inline={true}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="Billing"
                name="billingPlanId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
              >
                <option value={1}>Biling 1</option>
                <option value={2}>Biling 2</option>
              </FormElement>
            </div>
            <div className="col-md-6">
              <FormElement
                label="Client Type"
                name="clientTypeId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
              >
                <option value="selected">Select Type</option>
                <option value={1}>Co-oprate</option>
                <option value={2}>Educational Institute</option>
              </FormElement>
            </div>
          </div>

          <FormElement
            label="School/Subsidiary"
            name="subsidiary"
            placeholder="Add School"
            formikprops={formikprops}
            last={true}
          />
        </PageBody>

        <div className="form-header row">
          <div className="col-sm-6">
            <h2>Contact</h2>
          </div>
          <div className="col-sm-6">
            <Button
              className="mt-3 float-right"
              color="primary"
              size="lg"
              onClick={onClickAddContact}
            >
              Add Contact
            </Button>
          </div>
        </div>

        <div>
          {action === 'edit'
            ? formState &&
              formState.clientContacts && (
                <ClientContactsList
                  listData={formState.clientContacts}
                  edit={editContact}
                  remove={removeContact}
                />
              )
            : formState.clientContacts && formState.clientContacts.map(renderContactList)}
        </div>

        <AddClientContacts
          fprops={formikprops}
          visible={addClientContactModalVisible}
          toggle={toggleAddClientContactModal}
          formValues={contactFormState}
          name="Add"
        />

        <EditClientContacts
          fprops={formikprops}
          visible={editClientContactModalVisible}
          toggle={toggleEditClientContactModal}
          formValues={contactFormState}
          name="Edit"
        />

        <div className="form-header row">
          <div className="col-sm-6">
            <h2>User Information</h2>
          </div>
        </div>

        <PageBody card={true} wrapper={true}>
          <FormElement
            label="First Name"
            name="clientUser.firstName"
            placeholder="Add First Name"
            formikprops={formikprops}
          />

          <FormElement
            label="Last Name"
            name="clientUser.lastName"
            placeholder="Add Last Name"
            formikprops={formikprops}
          />
          <FormElement
            label="Email"
            name="clientUser.email"
            placeholder="Add Email"
            formikprops={formikprops}
            last={true}
          />
        </PageBody>

        <PageBody>
          <div className="row m-b-25">
            <StyledButton type="button" size="lg">
              Cancel
            </StyledButton>
            <StyledButton type="submit" color="primary" size="lg">
              Save
            </StyledButton>
            {action === 'add' && (
              <StyledButton type="button" color="primary" size="lg">
                Save &amp; Add More
              </StyledButton>
            )}
          </div>
        </PageBody>
      </Form>
    );
  };

  return (
    <DashboardTemplate>
      {formState && (
        <Formik initialValues={formState} onSubmit={submitForm}>
          {(formikprops: FormikBag) => renderForm(formikprops)}
        </Formik>
      )}
    </DashboardTemplate>
  );
};

export default AddClient;
