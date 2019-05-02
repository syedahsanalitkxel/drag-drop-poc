import React, { Fragment, useEffect, useState } from 'react';

import { Formik } from 'formik';
import { Button, Form } from 'reactstrap';
import styled from 'styled-components';

import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import * as Yup from 'yup';
import InstrumentReminderCard from '../../molecules/InstrumentRemindersCard';

interface Props {
  changeListener?: (formValues: any) => void;
  defaultValues?: any;
  action?: string;
}

const initialState: any = [];

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const CreateInstruments: React.FunctionComponent<Props> = ({ changeListener, defaultValues, action }) => {
  const [formState, setFormState] = useState(defaultValues || initialState);
  const [prevState, setPrevStateState] = useState(0);
  // const [nextState, setNextStateState] = useState(defaultValues || initialState);

  useEffect(() => {}, [prevState]);

  function submitForm() {
    if (changeListener) {
      changeListener(formState);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, index: any) {
    if (event.target.name.includes('emailTemplateId')) {
      const newState = formState;
      newState[index].emailTemplateId = parseInt(event.target.value, 10);
      setFormState(newState);
    } else if (event.target.name.includes('reminderDate')) {
      const newState = formState;
      newState[index].reminderDate = event.target.value;
      setFormState(newState);
    }
    setPrevStateState(prevState + 1);
  }

  const remindersFormSchema = Yup.object().shape({
    emailTemplate1: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    emailTemplate2: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    emailTemplate3: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const renderForm = (formikprops: FormikBag) => {
    const renderRemindersList = (reminder: any, index: number) => (
      <Fragment key={index}>
        <InstrumentReminderCard formikprops={formikprops} index={index} handleChange={handleChange} />
      </Fragment>
    );

    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <div className="PageHeader">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <h2 className="font-weight-light">Set Reminder</h2>
            </div>
          </div>
        </div>

        <PageBody card={true} wrapper={true}>
          {formState && formState.map(renderRemindersList)}
        </PageBody>

        <PageBody>
          <div className="row m-b-25">
            <StyledButton type="button" size="lg">
              Cancel
            </StyledButton>
            <StyledButton type="submit" name="submit" color="primary" size="lg" onClick={submitForm}>
              Save
            </StyledButton>
          </div>
        </PageBody>
      </Form>
    );
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={formState}
        validationSchema={remindersFormSchema}
        onSubmit={submitForm}
      >
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
    </React.Fragment>
  );
};

export default CreateInstruments;
