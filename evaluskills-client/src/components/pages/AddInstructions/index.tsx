import { Field, Formik, FormikActions, FormikValues } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import InsturmentsInterface from '../../../interfaces/Instruments';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import DashboardTemplate from '../../templates/DashboardTemplate';
import instrcutionFormSchema from './Instruction';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
interface Props {
  changeListener?: (formValues: InsturmentsInterface) => void;
  edit?: boolean;
  list?: any;
}

const initialState: InsturmentsInterface = {
  instrumentsTitle: '',
  editorState: '',
  componentName: 'Add Instructions',
  // editorState:
  //   "Lorem Ipsum is simply  dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Remaining essentially unchanged Make a type specimen bookUnknown printer",
};

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;
const StyledPageBody = styled(PageBody)`
  height: 355px;
`;
export const AddInstructions: React.FunctionComponent<Props> = ({ list, edit, changeListener }) => {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
    if (edit) {
      setFormState({ ...formState, instrumentsTitle: 'update subject' });
      setFormState({ ...formState, editorState: 'billing-1' });
      setFormState({ ...formState, componentName: 'Edit Instructions' });
    }
  }, []);

  function submitForm(
    values: InsturmentsInterface,
    formikActions: FormikActions<InsturmentsInterface>
  ) {
    setFormState({ ...formState, ...values });
  }

  function onEditorStateChange(editorState: any) {
    setFormState({ ...formState, editorState });
  }

  const renderForm = (formikprops: FormikBag) => {
    // TODO: Create render from group component and suppoert select, radio and checkbox
    const { editorState } = formState;

    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <div className="PageHeader">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="font-weight-light">{formState.componentName}</h2>
            </div>
          </div>
        </div>
        <PageBody card={true}>
          <div className="row">
            <div className="col-sm-12">
              <FormElement
                label="Instruction Title"
                name="instructionTitle"
                placeholder="Add Name"
                formikprops={formikprops}
                last={true}
                inline={true}
              />
            </div>
          </div>
        </PageBody>
        <StyledPageBody card={true} className="m-t-15">
          <label className="col-sm-3 col-form-label font-bold">Instruction Detail</label>

          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </StyledPageBody>
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
    <DashboardTemplate>
      <Formik
        initialValues={formState}
        enableReinitialize={true}
        validationSchema={instrcutionFormSchema}
        onSubmit={submitForm}
      >
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
    </DashboardTemplate>
  );
};

export default AddInstructions;
