import React, { useState } from 'react';

import { Formik } from 'formik';

import { Button, Form } from 'reactstrap';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import FormikBag from '../../../interfaces/FormikBag';
import InstrumentTemplateInterface from '../../../interfaces/InstrumentTemplate';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import ListCardItems from '../../organisms/ListCardItems';
import DashboardTemplate from '../../templates/DashboardTemplate';

interface Props {
  defaultValues?: InstrumentTemplateInterface;
}

const initialState: InstrumentTemplateInterface = {
  description: '',
  recommendedApplicationId: '',
  status: false,
  templateItems: [],
  title: '',
};
const assessments: AssessmentItemInterface[] = [
  {
    category: 'Character',
    competency: 'Team Player',
    definition: 'Receive feedback from others and uses the feedback to improve performance',
    id: 'uuid-12-321',
    type: 'Competency',
  },
  {
    category: 'Action',
    competency: 'Good Coder',
    definition:
      'Has a set of moral principles used in job in accordance with the culture of organization',
    id: 'uuid-11-111',
    type: 'Influential',
  },
];

const AddEditInstrumentTemplate: React.FunctionComponent<Props> = ({ defaultValues }) => {
  const [formState, setFormState] = useState(defaultValues || initialState);

  function submitForm(values: InstrumentTemplateInterface) {
    setFormState({ ...formState, ...values });
  }

  function renderForm(formikprops: FormikBag) {
    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <PageBody card={true} wrapper={true} className="m-t-15">
          <FormElement
            label="Instrument Name"
            name="title"
            placeholder="Add Name"
            fullLength={true}
            formikprops={formikprops}
          />

          <FormElement
            label="Description"
            name="description"
            placeholder="Add Detail"
            fullLength={true}
            formikprops={formikprops}
            type={FormElementTypes.TEXT_AREA}
          />

          <FormElement
            label="Instrument Application"
            name="application"
            fullLength={true}
            formikprops={formikprops}
            type={FormElementTypes.SELECT}
          >
            <option value="selected">Select Type</option>
            <option value="co-oprate">Co-oprate</option>
            <option value="Educational Institute">Educational Institute</option>
          </FormElement>
        </PageBody>
      </Form>
    );
  }

  return (
    <DashboardTemplate>
      <PageHeader title="Instrument Template" />
      <Formik initialValues={formState} onSubmit={submitForm}>
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
      <div className="form-header row">
        <div className="col-sm-6">
          <h2>Assessment Items {formState.assessmentItemsCount}</h2>
        </div>
        <div className="col-sm-6">
          <Button className="mt-3 float-right" color="primary" size="lg">
            Edit Assessment Items
          </Button>
        </div>
      </div>
      <ListCardItems titleKey="definition" listData={assessments} />
    </DashboardTemplate>
  );
};

export default AddEditInstrumentTemplate;
