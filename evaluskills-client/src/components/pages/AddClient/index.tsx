import { Field, Formik, FormikActions, FormikValues } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import AddClientInterface from '../../../interfaces/AddClient';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
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
      role: 'user',
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
    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <PageBody card={true} className="m-t-15">
          <FormGroup className="row">
            <Label for="" className="col-sm-2 col-form-label font-bold">
              Client Name
            </Label>
            <div className="col-sm-3">
              <Input
                name="clientName"
                placeholder="Add Client Name"
                tag={Field}
                invalid={!!(formikprops.touched.clientName && formikprops.errors.clientName)}
              />

              <FormFeedback tooltip={true}>{formikprops.errors.clientName}</FormFeedback>
            </div>
          </FormGroup>
          <div className="hr-line-dashed" />
        </PageBody>

        <div className="m-t-15 m-b-15">
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
