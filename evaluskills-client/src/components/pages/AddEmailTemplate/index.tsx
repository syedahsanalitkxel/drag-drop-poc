import { Field, Formik, FormikActions, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormFeedback, Input } from 'reactstrap';
import styled from 'styled-components';
import { AddEmailInterface } from '../../../interfaces/Email';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import emailFormSchema from './emailFormSchema';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, ContentState, EditorState } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { lookups } from '../../../modules/Lookup/enum';
import LookupContext from '../../../modules/Lookup/context';

interface Props {
  changeListener?: (formValues: AddEmailInterface) => void;
  cancelHandler?: () => void;
  edit?: boolean;
  list?: any;
  name?: string;
  submitEmailTemplate: (value: AddEmailInterface, buttonType?: string, id?: string) => void;
}

const editorState: any = {
  editorState: '',
};

const initialState: AddEmailInterface = {
  body: '',
  emailTypeId: '',
  subject: '',
  title: '',
};

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const AddEmailTemplate: React.FunctionComponent<Props> = ({
  list,
  edit,
  changeListener,
  submitEmailTemplate,
  cancelHandler,
  name,
}) => {
  const { findKey } = useContext(LookupContext);
  const [formState, setFormState] = useState(name === 'Edit' ? list : initialState);
  const [formEditorState, setEditorFormState] = useState(editorState);

  function titleChangeHandler(event: any) {
    if (event.target.name === 'emailTypeId') {
      setFormState({ ...formState, [event.target.name]: parseInt(event.target.value, 10) });
    } else {
      setFormState({ ...formState, [event.target.name]: event.target.value });
    }
  }

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
    if (name === 'Edit' && list.body) {
      const blocksFromHtml = htmlToDraft(list.body);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editEditorState = EditorState.createWithContent(contentState);
      setEditorFormState({ ...formEditorState, editorState: editEditorState });
    }
  }, []);

  function submitForm(values: AddEmailInterface, formikActions: FormikActions<any>) {
    if (name === 'Edit') {
      submitEmailTemplate(values, name, list.id);
      setFormState({ ...formState, ...values });
    } else {
      submitEmailTemplate(values, name);
      setFormState({ ...formState, ...values });
    }
  }

  function onEditorStateChange(editorState: any) {
    const editorSourceHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setFormState({ ...formState, body: editorSourceHTML });
    setEditorFormState({ ...formEditorState, editorState: editorState });
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
    const { editorState } = formEditorState;
    const StyledPageBody = styled(PageBody)`
      min-height: 355px;
    `;
    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <div className="PageHeader">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="font-weight-light">{name} Email</h2>
            </div>
          </div>
        </div>
        <PageBody card={true} className="m-t-15">
          <div className="row">
            <div className="col-md-6">
              <label className="col-sm-2 col-form-label font-bold">Title</label>
              <div className="col-sm-12">
                <Input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Add Title"
                  tag={Field}
                  id={'title'}
                  onChange={titleChangeHandler}
                  invalid={!!(formikprops.touched.title && formikprops.errors.title)}
                />
                <FormFeedback tooltip={true}>{formikprops.errors.title}</FormFeedback>
              </div>
            </div>

            <div className="col-md-6">
              <label className="col-sm-12 col-form-label font-bold">Type</label>
              <div className="col-sm-16">
                <Input
                  type="select"
                  name="emailTypeId"
                  className="form-control m-b col-sm-8"
                  value={formState.emailTypeId}
                  id={'emailTypeId'}
                  onChange={titleChangeHandler}
                  invalid={!!(formikprops.touched.emailTypeId && formikprops.errors.emailTypeId)}
                >
                  <option value="">Select One</option>
                  {renderEmailTypeDropdown()}
                </Input>
                <FormFeedback tooltip={true}>{formikprops.errors.emailTypeId}</FormFeedback>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="col-sm-12 col-form-label font-bold">Subject</label>
              <div className="col-sm-12">
                <Input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Add Subject"
                  tag={Field}
                  id={'subject'}
                  onChange={titleChangeHandler}
                  invalid={!!(formikprops.touched.subject && formikprops.errors.subject)}
                />
                <FormFeedback tooltip={true}>{formikprops.errors.subject}</FormFeedback>
              </div>
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
            <StyledButton type="button" size="lg" onClick={cancelHandler}>
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
