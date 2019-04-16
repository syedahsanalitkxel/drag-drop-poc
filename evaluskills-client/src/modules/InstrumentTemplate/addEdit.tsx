import React, { useContext, useState } from 'react';

import { Formik } from 'formik';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import styled from 'styled-components';

import PageBody from '../../components/atoms/PageBody';
import PageHeader from '../../components/atoms/PageHeader';
import RadioButton from '../../components/atoms/RadioButton';
import FormElement, { FormElementTypes } from '../../components/molecules/FormElement';
import FormikBag from '../../interfaces/FormikBag';
import LookupContext, { LookupContextConsumer } from '../Lookup/context';
import { lookups } from '../Lookup/enum';
import { LookupContextInterface, LookupItemInterface } from '../Lookup/interface';
import { InstrumentTemplateInterface } from './interface';

interface Props {
  defaultValue?: InstrumentTemplateInterface;
  copy?: boolean;
}

const initialState: InstrumentTemplateInterface = {
  description: '',
  recommendedApplicationId: 0,
  status: false,
  templateItems: [],
  title: '',
};

const StyledButton = styled(Button)`
  margin-right: 5px;
`;

const AddEditInstrumentTemplate: React.FunctionComponent<Props> = ({ defaultValue, copy }) => {
  const [formState, setFormState] = useState(defaultValue || initialState);
  const lookupContext = useContext(LookupContext);

  console.log(lookupContext);

  function submitForm(values: InstrumentTemplateInterface) {
    setFormState({ ...formState, ...values });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, status: JSON.parse(event.target.value) });
  }

  function deleteInstrument(event: React.MouseEvent) {
    event.preventDefault();
    if (defaultValue) {
      alert(defaultValue.id);
    }
  }

  function getPageHeader() {
    if (defaultValue && defaultValue.id) {
      const title = copy ? 'Copy' : 'Edit';
      return (
        <PageHeader
          title={`${title} Instrument Template`}
          actionButtonText="Delete Template"
          actionHandler={deleteInstrument}
        />
      );
    }

    return <PageHeader title="Instrument Template" />;
  }

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
            last={!!defaultValue}
          >
            <LookupContextConsumer>{renderInstrumentDropdown}</LookupContextConsumer>
          </FormElement>
        </PageBody>
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

  return (
    <PageBody>
      {getPageHeader()}
      <Formik initialValues={formState} onSubmit={submitForm}>
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
    </PageBody>
  );
};

AddEditInstrumentTemplate.defaultProps = {
  copy: false,
};

export default AddEditInstrumentTemplate;
