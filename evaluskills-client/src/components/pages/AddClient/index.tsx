import React, { Fragment, useEffect, useState } from 'react';

import { Formik } from 'formik';
import { Button, Form } from 'reactstrap';
import styled from 'styled-components';

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
  changeListener?: (formValues: AddEditClientInterface) => void;
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
  const [formState, setFormState] = useState(defaultValues || clients);
  const [contactFormState, setContactFormState] = useState(
    clients && clients.clientContacts ? clients.clientContacts : []
  );
  const [addClientContactModalVisible, setAddClientContactModalVisible] = useState(false);
  const [editClientContactModalVisible, setEditClientContactModalVisible] = useState(false);

  const toggleAddClientContactModal = () => {
    setContactFormState([]);
    setAddClientContactModalVisible(!addClientContactModalVisible);
  };

  const toggleEditClientContactModal = () => {
    setEditClientContactModalVisible(!editClientContactModalVisible);
  };

  useEffect(() => {
    if (changeListener && formState) {
      changeListener(formState);
    }
  });

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

  function submitForm(values: AddEditClientInterface) {
    setFormState({ ...formState, ...values });
  }

  const onClickAddContact = (event: React.MouseEvent) => {
    if (action === 'edit') {
      event.preventDefault();
      toggleAddClientContactModal();
    }

    if (action !== 'edit' && formState.clientContacts) {
      const { clientContacts } = formState;
      const contactObj: ContactInterface = {
        clientId: 0,
        email: '',
        firstName: '',
        id: 0,
        lastName: '',
        phone: '',
        title: '',
      };
      clientContacts.push(contactObj);
      setFormState({ ...formState, clientContacts });
    }
  };

  const renderForm = (formikprops: FormikBag) => {
    const renderContactList = (contact: any, index: number) => (
      <Fragment key={index}>
        <ClientContacts formikprops={formikprops} index={index} />
      </Fragment>
    );

    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <PageBody card={true} wrapper={true} className="m-t-15">
          <FormElement
            label="Client Name"
            name="clientName"
            placeholder="Add Client Name"
            formikprops={formikprops}
          />

          <FormElement
            label="Logo"
            name="logo"
            formikprops={formikprops}
            noValidate={true}
            type={FormElementTypes.IMAGE_UPLOAD}
          />

          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="Address"
                name="address"
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
                name="state"
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
                name="billing"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
              >
                <option value="billing-1">Biling 1</option>
                <option value="billing-2">Biling 2</option>
              </FormElement>
            </div>
            <div className="col-md-6">
              <FormElement
                label="Client Type"
                name="clientType"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
              >
                <option value="selected">Select Type</option>
                <option value="co-oprate">Co-oprate</option>
                <option value="Educational Institute">Educational Institute</option>
              </FormElement>
            </div>
          </div>

          <FormElement
            label="School/Subsidiary"
            name="school"
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
            name="userFirstName"
            placeholder="Add First Name"
            formikprops={formikprops}
          />
          <FormElement
            label="Last Name"
            name="userLastName"
            placeholder="Add Last Name"
            formikprops={formikprops}
          />
          <FormElement
            label="Email"
            name="userEmail"
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
            {!action && (
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
        <Formik initialValues={formState} validationSchema={clientFormSchema} onSubmit={submitForm}>
          {(formikprops: FormikBag) => renderForm(formikprops)}
        </Formik>
      )}
    </DashboardTemplate>
  );
};

export default AddClient;
