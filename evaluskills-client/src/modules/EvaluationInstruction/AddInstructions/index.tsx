import { Field, Formik, FormikActions, FormikValues, ErrorMessage } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { AddInstructionsInterface } from '../Interface';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../../components/atoms/PageBody';
import DashboardTemplate from '../../../components/templates/DashboardTemplate';
import instrcutionFormSchema from './Instruction';
import FormElement, { FormElementTypes } from '../../../components/molecules/FormElement';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromHTML, convertFromRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
interface Props {
  changeListener?: (formValues: any) => void;
  edit?: boolean;
  list?: any;
  submitInstrument: (value: AddInstructionsInterface, buttonType?: string) => void;
}
const content = {
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: 'Initialized from content state.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
const initialState: AddInstructionsInterface = {
  // instructionTitle: '',
  // editorState: '',
  // componentName: 'Add Instructions',
  title: '',
  instructions: '',
  isActive: true,
  isSystemDefined: true,
  clientId: 1,
  versionNo: 0,
  // editorState:
  //   "Lorem Ipsum is simply  dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Remaining essentially unchanged Make a type specimen bookUnknown printer",
};
const editorstate: any = {
  editorState: '',
};

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;
const StyledPageBody = styled(PageBody)`
  height: 355px;
`;

export const AddInstructions: React.FunctionComponent<Props> = ({ submitInstrument, list, edit, changeListener }) => {
  const [formState, setFormState] = useState(initialState);
  const [formeditorState, setedoitorFormState] = useState(editorstate);
  function titlechangeHandler(event: any) {
    setFormState({ ...formState, title: event.target.value });
  }
  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
    // const content = {
    //   entityMap: {},
    //   blocks: [
    //     {
    //       key: '637gr',
    //       text: 'Initialized from content state.',
    //       type: 'unstyled',
    //       depth: 0,
    //       inlineStyleRanges: [],
    //       entityRanges: [],
    //       data: {},
    //     },
    //   ],
    // };
    const sampleMarkup =
      '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' + '<a href="http://www.facebook.com">Example link</a>';
    const blocksFromHtml = htmlToDraft(sampleMarkup);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    setedoitorFormState({ ...formeditorState, editorState: editorState });
    if (edit) {
      // setFormState({ ...formState, instructionTitle: 'update subject' });
      // // setFormState({ ...formState, editorState: content });
      // setFormState({ ...formState, componentName: 'Edit Instructions' });
    }
  }, []);

  function submitForm(values: AddInstructionsInterface, formikActions: FormikActions<any>) {
    submitInstrument(values, 'b');
    setFormState({ ...formState, ...values });
  }

  function onEditorStateChange(editorState: any) {
    let cont = convertToRaw(editorState.getCurrentContent());

    let editorSourceHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(editorSourceHTML);
    setFormState({ ...formState, instructions: editorSourceHTML });
    setedoitorFormState({ ...formeditorState, editorState: editorState });
  }
  function onContentStateChange(content: any) {
    var input = JSON.stringify(content);
    console.log('state', input);
  }
  const renderForm = (formikprops: FormikBag) => {
    // TODO: Create render from group component and suppoert select, radio and checkbox
    const { instructions } = formState;
    const { editorState } = formeditorState;

    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <div className="PageHeader">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="font-weight-light">Add Instruction</h2>
            </div>
          </div>
        </div>
        <PageBody card={true}>
          <div className="row">
            <label className="col-sm-2 col-form-label font-bold">Instruction Title</label>

            <div className="col-sm-12">
              <Input
                type="text"
                name="title"
                className="form-control"
                tag={Field}
                id={'title'}
                onChange={titlechangeHandler}
                invalid={!!(formikprops.touched.title && formikprops.errors.title)}
              />
              <FormFeedback tooltip={true}>{formikprops.errors.title}</FormFeedback>
            </div>
          </div>
        </PageBody>
        <StyledPageBody card={true} className="m-t-15">
          <label className="col-sm-3 col-form-label font-bold">Instruction Detail</label>

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
          name={`instructions`}
          render={msg => (
            <div className="isa_error">
              <span className="error text-danger">{msg}</span>
            </div>
          )}
        />
        <PageBody card={true}>
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
    <Formik
      initialValues={formState}
      enableReinitialize={true}
      validationSchema={instrcutionFormSchema}
      onSubmit={submitForm}
    >
      {(formikprops: FormikBag) => renderForm(formikprops)}
    </Formik>
  );
};

export default AddInstructions;
