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

  const renderContactList = (contact: any, index: number) => (
    <Fragment key={index}>
      <ClientContacts />
    </Fragment>
  );

  const renderForm = (formikprops: FormikBag) => {
    // TODO: Create render from group component and suppoert select, radio and checkbox
    const renderFormGroup = (label: string, name: string, placeholder: string, last?: boolean) => {
      return (
        <React.Fragment>
          <FormGroup className="row">
            <Label for={name} className="col-sm-2 col-form-label font-bold">
              {label}
            </Label>
            <div className="col-sm-3">
              <Input
                name={name}
                placeholder={placeholder}
                tag={Field}
                id={name}
                invalid={!!(formikprops.touched[name] && formikprops.errors[name])}
              />
              <FormFeedback tooltip={true}>{formikprops.errors[name]}</FormFeedback>
            </div>
          </FormGroup>
          {!last && <div className="hr-line-dashed" />}
        </React.Fragment>
      );
    };

    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <PageBody card={true} className="m-t-15">
          {renderFormGroup('Client Name', 'clientName', 'Add Client Name')}

          <FormGroup className="row">
            <Label className="col-sm-2 col-form-label font-bold">Logo</Label>
            <div className="col-sm-3">
              <img src="/img/Logo.svg" alt="logo" />
              <span className="txt">Upload Photo</span>
            </div>
          </FormGroup>
          <div className="hr-line-dashed" />

          {renderFormGroup('Address', 'address', 'Add Address')}
          {renderFormGroup('City', 'city', 'Add City')}
          {renderFormGroup('State', 'state', 'Add State')}
          {renderFormGroup('Zip', 'zip', 'Add Zip')}
          {renderFormGroup('School/Subsidiary', 'school', 'Add School')}
          {renderFormGroup('Client Information', 'clientInformation', 'Add Client Information')}

          <FormGroup className="row">
            <Label for="billing" className="col-sm-2 col-form-label font-bold">
              Billing
            </Label>
            <div className="col-sm-3">
              <Input
                type="select"
                name="billing"
                placeholder="Add Biling"
                id="billing"
                invalid={!!(formikprops.touched.billing && formikprops.errors.billing)}
              >
                <option value="billing-1">Biling 1</option>
                <option value="billing-2">Biling 2</option>
              </Input>

              <FormFeedback tooltip={true}>{formikprops.errors.billing}</FormFeedback>
            </div>
          </FormGroup>
          <div className="hr-line-dashed" />

          <FormGroup className="row">
            <label className="col-sm-2 col-form-label font-bold">Client Type</label>
            <div className="col-sm-3">
              <Input
                type="select"
                name="clientType"
                placeholder="Client Type"
                id="clientType"
                invalid={!!(formikprops.touched.clientType && formikprops.errors.clientType)}
              >
                <option value="selected">Select Type</option>
                <option value="co-oprate">Co-oprate</option>
                <option value="Educational Institute">Educational Institute</option>
              </Input>
              <FormFeedback tooltip={true}>{formikprops.errors.clientType}</FormFeedback>
            </div>
          </FormGroup>
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
          {renderFormGroup('First Name', 'userFirstName', 'Add First Name')}
          {renderFormGroup('Last Name', 'userLastName', 'Add Last Name')}
          {renderFormGroup('Email', 'userEmail', 'Add Email', true)}
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
