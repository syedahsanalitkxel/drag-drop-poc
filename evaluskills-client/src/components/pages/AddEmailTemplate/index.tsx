import { Field, Formik, FormikActions, FormikValues } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import AddClientInterface from '../../../interfaces/AddClient';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import EmailTemplateHeader from '../../organisms/EmailTemplateHeader';
import DashboardTemplate from '../../templates/DashboardTemplate';
import clientFormSchema from './clientFormSchema';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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

  const renderContactList = (contact: any, index: number) => <Fragment key={index} />;

  const renderForm = (formikprops: FormikBag) => {
    // TODO: Create render from group component and suppoert select, radio and checkbox
    const renderFormGroup = (label: string, name: string, placeholder: string, last?: boolean) => {
      return (
        <React.Fragment>
          <FormGroup className="row">
            <Label for={name} className="col-sm-12 col-form-label font-bold">
              {label}
            </Label>
            <div className="col-sm-6">
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
        <EmailTemplateHeader />
        <PageBody card={true} className="m-t-15">
          <Editor
            // editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            // onEditorStateChange={this.onEditorStateChange}
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
