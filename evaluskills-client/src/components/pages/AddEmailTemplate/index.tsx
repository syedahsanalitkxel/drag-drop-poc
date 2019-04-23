import { Field, Formik, FormikActions, FormikValues, ErrorMessage } from 'formik';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { AddEmailInterface } from '../../../interfaces/Email';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import DashboardTemplate from '../../templates/DashboardTemplate';
import emailFormSchema from './emailFormSchema';

import FormElement, { FormElementTypes } from '../../molecules/FormElement';

import { Editor } from 'react-draft-wysiwyg';

import { convertFromHTML, convertFromRaw, convertToRaw, ContentState, EditorState } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { lookups } from '../../../modules/Lookup/enum';
import LookupContext, { LookupContextConsumer } from '../../../modules/Lookup/context';

interface Props {
  changeListener?: (formValues: AddEmailInterface) => void;
  edit?: boolean;
  list?: any;
  submitEmailTemplate: (value: AddEmailInterface, buttonType?: string) => void;
}

const editorstate: any = {
  editorState: '',
};

const initialState: AddEmailInterface = {
  // instructionTitle: '',
  // editorState: '',
  body: '',
  componentName: 'Add Email',
  emailTypeId: '',
  isSystemDefined: true,
  subject: '',
  title: '',
};

// const initialState: AddEmailInterface = {
//   title: '',
//   type: '',
//   componentName: 'Add Email',
// };

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const AddEmailTemplate: React.FunctionComponent<Props> = ({
  list,
  edit,
  changeListener,
  submitEmailTemplate,
}) => {
  const { findKey } = useContext(LookupContext);
  const [formState, setFormState] = useState(initialState);
  const [formeditorState, setedoitorFormState] = useState(editorstate);

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }

    // const sampleMarkup =
    //     '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' + '<a href="http://www.facebook.com">Example link</a>';
    // const blocksFromHtml = htmlToDraft(sampleMarkup);
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    // const editorState = EditorState.createWithContent(contentState);
    // setedoitorFormState({ ...formeditorState, editorState: editorState });

    if (edit) {
      // setFormState({ ...formState, subject: 'update subject' });
      // setFormState({ ...formState, subject: 'update title' });
      // setFormState({ ...formState, type: 'billing-1' });
      // setFormState({ ...formState, editorState: 'billing-1' });
      // setFormState({ ...formState, componentName: 'Edit Email' });
    }
  }, []);

  function submitForm(values: AddEmailInterface, formikActions: FormikActions<any>) {
    submitEmailTemplate(values, 'b');
    setFormState({ ...formState, ...values });
  }

  function onEditorStateChange(editorState: any) {
    let cont = convertToRaw(editorState.getCurrentContent());

    let editorSourceHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(editorSourceHTML);
    setFormState({ ...formState, body: editorSourceHTML });
    setedoitorFormState({ ...formeditorState, editorState: editorState });
  }

  function onContentStateChange(content: any) {
    var input = JSON.stringify(content);
    console.log('state', input);
  }

  function renderEmailTypeDropdown() {
    if (findKey) {
      return findKey(lookups.emailTypesLookUp).map(application => {
        return (
          <option value={application.value} key={application.value}>
            {application.text}
          </option>
        );
      });
    }
  }

  const renderForm = (formikprops: FormikBag) => {
    const { body } = formState;
    const { editorState } = formeditorState;
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
                name="emailTypeId"
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                inline={true}
                last={true}
              >
                <option value="">Select One</option>
                {renderEmailTypeDropdown()}
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
          <label className="col-sm-3 col-form-label font-bold">Body</label>
          <Editor
            initialContentState={editorState}
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            onContentStateChange={onContentStateChange}
          />
        </StyledPageBody>
        <ErrorMessage
          name={`body`}
          render={msg => (
            <div className="isa_error">
              <span className="error text-danger">{msg}</span>
            </div>
          )}
        />

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
    <React.Fragment>
      <Formik
        initialValues={formState}
        enableReinitialize={true}
        validationSchema={emailFormSchema}
        onSubmit={submitForm}
      >
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
    </React.Fragment>
  );
};

export default AddEmailTemplate;
