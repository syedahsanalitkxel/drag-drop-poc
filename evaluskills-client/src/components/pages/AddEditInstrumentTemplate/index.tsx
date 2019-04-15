import React, { useState } from 'react';

import { Formik } from 'formik';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import styled from 'styled-components';

import AssessmentFiltersInterface from '../../../interfaces/AssessmentFilters';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import FormikBag from '../../../interfaces/FormikBag';
import InstrumentTemplateInterface from '../../../interfaces/InstrumentTemplate';
import { LookupContextConsumer } from '../../../modules/Lookup/context';
import { lookups } from '../../../modules/Lookup/enum';
import { LookupContextInterface, LookupItemInterface } from '../../../modules/Lookup/interface';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import RadioButton from '../../atoms/RadioButton';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import ESModal from '../../molecules/Modal';
import ListCardItems from '../../organisms/ListCardItems';
import DashboardTemplate from '../../templates/DashboardTemplate';
import AssessmentItemsList from './AssessmentItemsList';

const StyledButton = styled(Button)`
  margin-right: 5px;
`;

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
  const [modalVisible, setModalVisible] = useState(false);

  function applyFilters(filters: AssessmentFiltersInterface) {
    console.log(filters);
  }

  function toggleFilterModal() {
    setModalVisible(!modalVisible);
  }

  function submitForm(values: InstrumentTemplateInterface) {
    setFormState({ ...formState, ...values });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, status: JSON.parse(event.target.value) });
  }

  const showAssessmentSelector = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  function renderForm(formikprops: FormikBag) {
    const renderAddElements = () => (
      <div className="row">
        <div className="col-sm-2 col-form-label font-bold">Assessment Items</div>
        <div className="col-sm-10">
          <Button onClick={toggleFilterModal} size="lg" color="primary">
            Add Assessment Items
          </Button>
        </div>
      </div>
    );

    const renderAssessmentList = () => (
      <React.Fragment>
        <div className="form-header row">
          <div className="col-sm-6">
            <h3 className="m-l-10 p-t-20">Assessment Items {formState.assessmentItemsCount}</h3>
          </div>
          <div className="col-sm-6">
            <Button
              className="mt-3 float-right"
              color="primary"
              size="lg"
              onClick={toggleFilterModal}
            >
              Edit Assessment Items
            </Button>
          </div>
        </div>

        <ListCardItems titleKey="definition" listData={assessments} />
      </React.Fragment>
    );

    const renderInstrumentDropdown = (props: LookupContextInterface) => {
      const { findKey } = props;
      if (findKey) {
        return findKey(lookups.recommendedApplicationsLookUp).map((lookup: LookupItemInterface) => (
          <option key={lookup.value} value={lookup.value}>
            {lookup.text}
          </option>
        ));
      }
    };

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
            <LookupContextConsumer>{renderInstrumentDropdown}</LookupContextConsumer>
          </FormElement>

          {!defaultValues && renderAddElements()}
        </PageBody>

        {!!defaultValues && renderAssessmentList()}

        <div className="form-group row">
          <div className="col-sm-4 col-sm-offset-2">
            <StyledButton color="white">Cancel</StyledButton>
            <StyledButton color="primary" type="submit">
              Save Changes
            </StyledButton>
          </div>
        </div>
      </Form>
    );
  }

  function deleteInstrument(event: React.MouseEvent) {
    event.preventDefault();
    if (defaultValues) {
      alert(defaultValues.id);
    }
  }

  function getPageHeader() {
    if (defaultValues && defaultValues.id) {
      return (
        <PageHeader
          title="Instrument Template"
          actionButtonText="Delete Template"
          actionHandler={deleteInstrument}
        />
      );
    }

    return <PageHeader title="Instrument Template" />;
  }

  return (
    <DashboardTemplate>
      <PageBody>
        {getPageHeader()}
        <Formik initialValues={formState} onSubmit={submitForm}>
          {(formikprops: FormikBag) => renderForm(formikprops)}
        </Formik>
      </PageBody>
      <ESModal
        title="Add Assessment Items"
        visible={modalVisible}
        toggle={toggleFilterModal}
        primaryAction={applyFilters}
        primaryText="Add"
        secondaryText="Cancel"
        secondaryAction="dismiss"
        size="lg"
        parentClass="addassessModal"
      >
        <AssessmentItemsList mode="edit" />
      </ESModal>
    </DashboardTemplate>
  );
};

export default AddEditInstrumentTemplate;
