import React, { Fragment, useEffect, useState } from 'react';

import { Field, Formik, FormikActions, FormikValues } from 'formik';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';

import AddClientInterface from '../../../interfaces/AddClient';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import ClientContacts from '../../organisms/ClientContacts/ClientContacts';
import DashboardTemplate from '../../templates/DashboardTemplate';
import clientFormSchema from './clientFormSchema';

interface Props {
  changeListener?: (formValues: AddClientInterface) => void;
}

const initialState: AddClientInterface = {
  address: '',
  billing: 'plan 2',
  city: '',
  clientInformation: '',
  clientName: 'Maria Gracia',
  clientType: 'Type 1',
  contact: [
    {
      email: 'Ali@tkxel.com',
      firstName: 'Ali',
      lastName: 'Raza',
      phone: '+923334567891',
      role: '',
    },
  ],
  phone: '+888 667 999 ',
  school: '',
  state: '',
  userEmail: 'rizwan@tkxel.com',
  userFirstName: 'rizwan',
  userLastName: 'shah',
  zip: '',
};

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const AddClient: React.FunctionComponent<Props> = ({ changeListener }) => {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
  });

  function submitForm(
    values: AddClientInterface,
    formikActions: FormikActions<AddClientInterface>
  ) {
    setFormState({ ...formState, ...values });
  }

  const onClickAddContact = (event: React.MouseEvent) => {
    event.preventDefault();

    const { contact } = formState;
    const contactObj: any = {};
    if (contact) {
      contact.push(contactObj);
    }
    setFormState({ ...formState, contact });
  };

  const renderForm = (formikprops: FormikBag) => {
    const renderContactList = (contact: any, index: number) => (
      <Fragment key={index}>
        <ClientContacts formikprops={formikprops} />
      </Fragment>
    );

    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <PageBody card={true} className="m-t-15">
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

          <FormElement
            label="Address"
            name="address"
            placeholder="Add Address"
            formikprops={formikprops}
          />

          <FormElement label="City" name="city" placeholder="Add City" formikprops={formikprops} />

          <FormElement
            label="State"
            name="state"
            placeholder="Add State"
            formikprops={formikprops}
          />

          <FormElement label="Zip" name="zip" placeholder="Add Zip" formikprops={formikprops} />

          <FormElement
            label="School/Subsidiary"
            name="school"
            placeholder="Add School"
            formikprops={formikprops}
          />

          <FormElement
            label="Client Information"
            name="clientInformation"
            placeholder="Add Client Information"
            formikprops={formikprops}
          />

          <FormElement
            label="Billing"
            name="billing"
            formikprops={formikprops}
            type={FormElementTypes.SELECT}
          >
            <option value="billing-1">Biling 1</option>
            <option value="billing-2">Biling 2</option>
          </FormElement>

          <FormElement
            label="Client Type"
            name="clientType"
            formikprops={formikprops}
            type={FormElementTypes.SELECT}
          >
            <option value="selected">Select Type</option>
            <option value="co-oprate">Co-oprate</option>
            <option value="Educational Institute">Educational Institute</option>
          </FormElement>
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

        <div>{formState.contact && formState.contact.map(renderContactList)}</div>

        <div className="form-header row">
          <div className="col-sm-6">
            <h2>User Information</h2>
          </div>
        </div>

        <PageBody card={true}>
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
            <StyledButton type="button" color="primary" size="lg">
              Save &amp; Add More
            </StyledButton>
          </div>
        </PageBody>
      </Form>
    );
  };

  return (
    <DashboardTemplate>
      <Formik initialValues={formState} validationSchema={clientFormSchema} onSubmit={submitForm}>
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
    </DashboardTemplate>
  );
};

export default AddClient;
