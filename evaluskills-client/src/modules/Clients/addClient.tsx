import React, { Fragment, useEffect, useState } from 'react';

import { ErrorMessage, Field, Formik } from 'formik';
import { Button, Form, FormFeedback, Label } from 'reactstrap';
import styled from 'styled-components';
import { FormGroup, Input } from 'reactstrap';

import AddEditClientInterface, { ClientUserInterface, ContactInterface } from './addClientInterface';
import { LookupContextConsumer } from '../Lookup/context';
import { lookups } from '../Lookup/enum';
import { LookupContextInterface, LookupItemInterface } from '../Lookup/interface';
import FormikBag from '../../interfaces/FormikBag';
import AddClientContacts from '../../components/organisms/AddClientContact/index';
import ClientContacts from '../../components/organisms/ClientContacts/ClientContacts';
import ClientContactsList from '../../components/organisms/ClientContactsList';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import EditClientContacts from '../../components/organisms/AddClientContact/index';
import PageBody from '../../components/atoms/PageBody';
import FormElement, { FormElementTypes } from '../../components/molecules/FormElement';
import clientFormSchema, { clientEditFormSchema } from './clientFormSchema';
import styles from '../../components/molecules/FormElement/FormElement.module.scss';
import { getStates } from './service';

interface Props {
  changeListener: (formValues: any) => void;
  defaultValues?: any;
  action?: string;
  clients?: any;
  cancelForm: () => void;
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
  cancelForm,
}) => {
  const [formState, setFormState] = useState(defaultValues);
  const [file, setfile] = useState({});
  const [contactFormState, setContactFormState] = useState(defaultValues.clientContacts);
  const [selectedContact, setSelectedContact] = useState({});
  const [addMore, setAddMore] = useState(false);
  const [addClientContactModalVisible, setAddClientContactModalVisible] = useState(false);
  const [editClientContactModalVisible, setEditClientContactModalVisible] = useState(false);

  const toggleAddClientContactModal = () => {
    setContactFormState([]);
    setAddClientContactModalVisible(!addClientContactModalVisible);
  };

  const toggleEditClientContactModal = () => {
    setEditClientContactModalVisible(!editClientContactModalVisible);
  };

  function editContact(contactId: number) {
    if (defaultValues && defaultValues.clientContacts) {
      const contact: any = defaultValues.clientContacts.find((contacts: any) => contacts.id === contactId);
      setSelectedContact(contact);
      toggleEditClientContactModal();
    }
  }

  function removeContact(contactId: number) {
    const contactIndex = formState.clientContacts.findIndex((contact: any) => contact.id === contactId);
    const { clientContacts } = formState;
    clientContacts.splice(contactIndex, 1);
    setFormState({ ...formState, ...clientContacts });
  }

  function submitForm(values: any) {
    values.stateId = parseInt(values.stateId, 10);
    values.billingPlanId = parseInt(values.billingPlanId, 10);

    if (addMore) {
      changeListener({ ...formState, ...values, addMore });
      setFormState({ ...formState, ...values, addMore });
    } else {
      changeListener({ ...formState, ...values });
      setFormState({ ...formState, ...values });
    }

    if (action === 'Edit' && file) {
      changeListener({ ...formState, ...values, clientLogo: file });
      setFormState({ ...formState, ...values, clientLogo: file });
    }
  }

  function ClientContactsFormState(values: any) {
    if (action === 'Edit' && file) {
      setFormState({ ...formState, ...values, clientLogo: file });
    }
  }

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormState({ ...formState, [event.target.name]: event.target.files[0] });
      setfile(event.target.files[0]);
    }
  };
  const onClickAddContact = (event: React.MouseEvent) => {
    if (action === 'Edit') {
      event.preventDefault();
      toggleAddClientContactModal();
    }

    if (action !== 'Edit' && formState.clientContacts) {
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

  const renderForm = (formikprops: any) => {
    function getValidation(name: string) {
      return !!(formikprops.touched[name] && formikprops.errors[name]);
    }

    const renderContactList = (clientContacts: any, index: number) => (
      <Fragment key={index}>
        <ClientContacts formikprops={formikprops} index={index} />
      </Fragment>
    );

    const renderBillingPlanDropdown = (props: LookupContextInterface) => {
      const { findKey } = props;
      if (findKey) {
        return findKey(lookups.billingPlansLookUp).map((lookup: LookupItemInterface) => (
          <option key={lookup.value} value={lookup.value}>
            {lookup.text}
          </option>
        ));
      }
    };

    const renderStatesDropdown = () => {
      return (
        formState &&
        formState.states.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))
      );
    };
    async function getStatesfunc(countryId: number) {
      const result = await getStates(countryId);
      setFormState({ ...formState, states: result, CountryId: countryId });
    }
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
      getStatesfunc(parseInt(event.target.value, 10));
    }

    const renderCountriesDropdown = (props: LookupContextInterface) => {
      const { findKey } = props;
      if (findKey) {
        return findKey(lookups.countriesLookUp).map((lookup: LookupItemInterface) => (
          <option key={lookup.value} value={lookup.value}>
            {lookup.text}
          </option>
        ));
      }
    };

    return (
      <Form onSubmit={formikprops.handleSubmit.bind(formikprops)} className="form" encType="multipart/form-data">
        <div className="PageHeader">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <h2 className="font-weight-light">{action} Client</h2>
            </div>
          </div>
        </div>

        <PageBody card={true} wrapper={true} className="m-t-15">
          <FormElement
            label="Client Name"
            name="clientName"
            placeholder="Add Client Name"
            formikprops={formikprops}
            type={FormElementTypes.TEXT}
          />

          <FormElement
            label="School/Subsidiary"
            name="subsidiary"
            placeholder="Add School"
            formikprops={formikprops}
            type={FormElementTypes.TEXT}
          />

          <FormGroup>
            <div>
              <span className={styles['image-upload-label']}>Upload Photo</span>
              <Input
                type="file"
                name="clientLogo"
                id="exampleFile"
                onChange={event => {
                  formikprops.setFieldValue('clientLogo', event.currentTarget.files && event.currentTarget.files[0]);
                }}
                className="form-control"
                invalid={getValidation('clientLogo')}
              />
            </div>
            <ErrorMessage
              name="clientLogo"
              render={msg => {
                return (
                  <div className="isa_error">
                    <span className="error text-danger">{msg}</span>
                  </div>
                );
              }}
            />
          </FormGroup>

          <div className="hr-line-dashed" />

          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="Address"
                name="address1"
                placeholder="Add Address"
                formikprops={formikprops}
                inline={true}
                type={FormElementTypes.TEXT}
              />
            </div>
            <div className="col-md-6">
              <FormElement
                label="Address2"
                name="address2"
                placeholder="Add Address"
                formikprops={formikprops}
                inline={true}
                type={FormElementTypes.TEXT}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label className="col-md-5 col-form-label font-bold">Country</Label>
              <Input
                type="select"
                value={formState.CountryId}
                formikprops={formikprops}
                name="CountryId"
                id="countryId"
                onChange={changeHandler}
              >
                <option value=""> Select One</option>
                <LookupContextConsumer>{renderCountriesDropdown}</LookupContextConsumer>
              </Input>
            </div>
            <div className="col-md-6">
              <FormElement
                label="City"
                name="city"
                placeholder="Add City"
                formikprops={formikprops}
                inline={true}
                type={FormElementTypes.TEXT}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="State"
                name="stateId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
              >
                <option value=""> Select One</option>
                <LookupContextConsumer>{renderStatesDropdown}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-md-6">
              <FormElement
                label="Zip"
                name="zip"
                placeholder="Add Zip"
                formikprops={formikprops}
                inline={true}
                type={FormElementTypes.TEXT}
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
                last={true}
              >
                <option value=""> Select One</option>
                <LookupContextConsumer>{renderBillingPlanDropdown}</LookupContextConsumer>
              </FormElement>
            </div>
            <div className="col-md-6">
              <FormElement
                label="Client Type"
                name="clientTypeId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="">Select One</option>
                <option value="1">Co-oprate</option>
                <option value="2">Educational Institute</option>
              </FormElement>
            </div>
          </div>
        </PageBody>

        <div className="form-header row">
          <div className="col-sm-6">
            <h2>Contact</h2>
          </div>
          <div className="col-sm-6">
            <Button className="mt-3 float-right" color="primary" size="lg" onClick={onClickAddContact}>
              Add Contact
            </Button>
          </div>
        </div>

        <div>
          {action === 'Edit'
            ? formState &&
              formState.clientContacts && (
                <ClientContactsList listData={formState.clientContacts} edit={editContact} remove={removeContact} />
              )
            : formState.clientContacts && formState.clientContacts.map(renderContactList)}
        </div>

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
            type={FormElementTypes.TEXT}
          />

          <FormElement
            label="Last Name"
            name="clientUser.lastName"
            placeholder="Add Last Name"
            formikprops={formikprops}
            type={FormElementTypes.TEXT}
          />

          <FormElement
            label="Email"
            name="clientUser.email"
            placeholder="Add Email"
            formikprops={formikprops}
            last={true}
            type={FormElementTypes.TEXT}
          />
        </PageBody>

        <PageBody>
          <div className="row m-b-25">
            <StyledButton
              type="button"
              size="lg"
              onClick={() => {
                cancelForm();
              }}
            >
              Cancel
            </StyledButton>
            <StyledButton type="submit" color="primary" size="lg">
              Save
            </StyledButton>
            {action === 'Add' && (
              <StyledButton
                type="button"
                color="primary"
                size="lg"
                onClick={() => {
                  setAddMore(true);
                  formikprops.submitForm();
                }}
              >
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
        <Formik
          enableReinitialize={true}
          initialValues={formState}
          validationSchema={action === 'Edit' ? clientEditFormSchema : clientFormSchema}
          onSubmit={submitForm}
        >
          {(formikprops: FormikBag) => renderForm(formikprops)}
        </Formik>
      )}
      <PageBody>
        <AddClientContacts
          fprops={formState}
          formStateUpdate={ClientContactsFormState}
          visible={addClientContactModalVisible}
          toggle={toggleAddClientContactModal}
          formValues={contactFormState}
          name="Add"
        />

        <EditClientContacts
          fprops={formState}
          formStateUpdate={ClientContactsFormState}
          visible={editClientContactModalVisible}
          toggle={toggleEditClientContactModal}
          formValues={selectedContact}
          name="Edit"
        />
      </PageBody>
    </DashboardTemplate>
  );
};

export default AddClient;
