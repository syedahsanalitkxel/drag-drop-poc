import { Field, Formik, FormikActions, FormikValues } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { AddEmailInterface } from '../../../interfaces/Email';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import DashboardTemplate from '../../templates/DashboardTemplate';
import emailFormSchema from './emailFormSchema';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, Modifier } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
interface Props {
  changeListener?: (formValues: AddEmailInterface) => void;
  edit?: boolean;
  list?: any;
}

const initialState: AddEmailInterface = {
  subject: '',
  title: '',
  type: '',
  editorState: '',
  componentName: 'Add Email',
  // editorState:
  //   "Lorem Ipsum is simply  dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Remaining essentially unchanged Make a type specimen bookUnknown printer",
};

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const AddEmailTemplate: React.FunctionComponent<Props> = ({
  list,
  edit,
  changeListener,
}) => {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
    if (edit) {
      setFormState({ ...formState, subject: 'update subject' });
      setFormState({ ...formState, subject: 'update title' });
      setFormState({ ...formState, type: 'billing-1' });
      setFormState({ ...formState, editorState: 'billing-1' });
      setFormState({ ...formState, componentName: 'Edit Email' });
    }
  }, []);

  function submitForm(values: AddEmailInterface, formikActions: FormikActions<AddEmailInterface>) {
    setFormState({ ...formState, ...values });
  }

  function onEditorStateChange(editorState: any) {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle()
    );
    setFormState({ ...formState, editorState });
  }

  const renderForm = (formikprops: FormikBag) => {
    // TODO: Create render from group component and suppoert select, radio and checkbox
    const { editorState } = formState;
    const StyledPageBody = styled(PageBody)`
      height: 355px;
    `;
    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <div className="PageHeader">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="font-weight-light">{formState.componentName}</h2>
            </div>
          </div>
        </div>
        <PageBody card={true} className="m-t-15">
          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="Title"
                name="title"
                placeholder="Add Email Title"
                formikprops={formikprops}
                inline={true}
                last={true}
              />
            </div>

            <div className="col-md-6">
              <FormElement
                label="Type"
                name="type"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="billing-1">Biling 1</option>
                <option value="billing-2">Biling 2</option>
              </FormElement>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormElement
                label="Subject"
                name="subject"
                placeholder="Subject"
                formikprops={formikprops}
                inline={true}
                last={true}
              />
            </div>
          </div>
        </PageBody>
        <StyledPageBody card={true} className="m-t-15">
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </StyledPageBody>
        <PageBody card={true} className="m-t-15">
          <div className="row m-b-25">
            <StyledButton type="button" size="lg">
              Cancel
            </StyledButton>

            <StyledButton type="submit" color="primary" size="lg">
              Save &amp; Changes
            </StyledButton>
          </div>
        </PageBody>
      </Form>
    );
  };

  return (
    <DashboardTemplate>
      <Formik
        initialValues={formState}
        enableReinitialize={true}
        validationSchema={emailFormSchema}
        onSubmit={submitForm}
      >
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
    </DashboardTemplate>
  );
};

export default AddEmailTemplate;
