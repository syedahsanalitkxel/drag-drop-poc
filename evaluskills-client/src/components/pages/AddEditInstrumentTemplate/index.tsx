import React, { useState } from 'react';

import { Formik } from 'formik';

import { Button, Form, FormGroup, Label } from 'reactstrap';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import FormikBag from '../../../interfaces/FormikBag';
import InstrumentTemplateInterface from '../../../interfaces/InstrumentTemplate';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import RadioButton from '../../atoms/RadioButton';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import Pager from '../../molecules/Pager';
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, status: JSON.parse(event.target.value) });
  }

  const showAssessmentSelector = (editable?: boolean) => (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('clicked', editable);
  };

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

          <FormGroup className="row">
            <Label className="col-sm-2 col-form-label font-bold">Status</Label>
            <div className="col-md-10">
              <RadioButton
                name="status"
                value="true"
                currentSelection={formState.status ? formState.status.toString() : ''}
                onChange={handleChange}
              >
                Active
              </RadioButton>
              <RadioButton
                name="status"
                value="false"
                currentSelection={formState.status !== undefined ? formState.status.toString() : ''}
                onChange={handleChange}
              >
                Inactive
              </RadioButton>
            </div>
          </FormGroup>
          <div className="hr-line-dashed" />

          <FormElement
            label="Instrument Application"
            name="application"
            fullLength={true}
            formikprops={formikprops}
            type={FormElementTypes.SELECT}
            last={!!defaultValues}
          >
            <option value="selected">Select Type</option>
            <option value="co-oprate">Co-oprate</option>
            <option value="Educational Institute">Educational Institute</option>
          </FormElement>

          <div className="row">
            <div className="col-sm-2 col-form-label font-bold">Assessment Items</div>
            <div className="col-sm-10">
              <Button onClick={showAssessmentSelector()} size="lg" color="primary">
                Add Assessment Items
              </Button>
            </div>
          </div>
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
          <h3 className="m-l-10 p-t-20">Assessment Items {formState.assessmentItemsCount}</h3>
        </div>
        <div className="col-sm-6">
          <Button
            className="mt-3 float-right"
            color="primary"
            size="lg"
            onClick={showAssessmentSelector(true)}
          >
            Edit Assessment Items
          </Button>
        </div>
      </div>
      <ListCardItems titleKey="definition" listData={assessments} />
    </DashboardTemplate>
  );
};

export default AddEditInstrumentTemplate;
