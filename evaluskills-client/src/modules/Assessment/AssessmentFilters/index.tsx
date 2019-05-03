import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import RadioButton from '../../../components/atoms/RadioButton';
import Checkbox from '../../../components/atoms/CheckBox';
import { LookupContextConsumer } from '../../../modules/Lookup/context';
import { lookups } from '../../../modules/Lookup/enum';
import FilterContext from './context';
import { AssessmentTemplateFilterInterface } from '../interface';
import { LookupContextInterface, LookupItemInterface } from '../../../modules/Lookup/interface';
interface Props {
  changeListener?: (formValues: any) => void;
}

const initialState: AssessmentTemplateFilterInterface = {
  TypeIds: [],
};

const AssessmentFilters: React.FunctionComponent<Props> = ({ changeListener }) => {
  //const [formState, setFormState] = useState(initialState);

  const { setModalState } = useContext(ModalContext);
  const { activeFilters } = useContext(FilterContext);
  const [formState, setFormState] = useState({
    ...initialState,
    accreditation: activeFilters && activeFilters.accreditation,
    application: activeFilters && activeFilters.application,
    categoryId: activeFilters && activeFilters.categoryId,
    competencyId: activeFilters && activeFilters.competencyId,
    ItemsStatusIds: activeFilters && activeFilters.ItemsStatusIds,
    TypeIds: activeFilters && activeFilters.TypeIds,
  });
  useEffect(() => {
    if (setModalState) {
      setModalState(formState);
    }
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }
  function lookupchangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: parseInt(event.target.value, 10) });
  }
  function checkboxChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const number = parseInt(event.target.value, 10);
    let arr = formState.TypeIds;
    let check = arr.includes(number);

    if (check) {
      var index = arr.indexOf(number);
      arr.splice(index, 1);
    } else {
      arr.push(number);
    }

    setFormState({
      ...formState,
      TypeIds: arr,
    });
  }
  const TypeLookUp = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.assessmentTypesLookUp).map((lookup: LookupItemInterface, index) => (
        <Checkbox
          name="TypeIds"
          value={lookup.value}
          isChecked={
            lookup.value && formState && formState.TypeIds && formState.TypeIds.includes(lookup.value) ? true : false
          }
          onChange={checkboxChangeHandler}
        >
          {lookup.text}
        </Checkbox>
      ));
    }
  };
  const renderAssessmentCategory = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.categoriesLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const renderCompitency = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.competenciesLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const renderAssessmentRecommend = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.recommendedApplicationsLookUp).map((lookup: LookupItemInterface) => (
        <RadioButton
          name="application"
          value={lookup.value}
          currentSelection={formState.application}
          onChange={lookupchangeHandler}
        >
          {lookup.text}
        </RadioButton>
      ));
    }
  };

  return (
    <React.Fragment>
      <Form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label font-bold">Type</label>

          <div className="col-sm-10">
            <LookupContextConsumer>{TypeLookUp}</LookupContextConsumer>
          </div>
        </div>
        <div className="hr-line-dashed" />
        <FormGroup className="row">
          <div className="col-md-6">
            <Label for="competency-select" className="font-bold">
              Competency
            </Label>
            <Input
              type="select"
              name="competencyId"
              value={formState.competencyId}
              id="competency-select"
              onChange={lookupchangeHandler}
            >
              <option value="0">Select One</option>
              <LookupContextConsumer>{renderCompitency}</LookupContextConsumer>
            </Input>
          </div>
          <div className="col-md-6">
            <Label for="category-select" className="font-bold">
              Category
            </Label>
            <Input
              type="select"
              value={formState.categoryId}
              name="categoryId"
              id="competency-select"
              onChange={lookupchangeHandler}
            >
              <option value="0">Select One</option>
              <LookupContextConsumer>{renderAssessmentCategory}</LookupContextConsumer>
            </Input>
          </div>
        </FormGroup>

        <div className="hr-line-dashed" />
        <FormGroup className="row">
          <div className="col-md-6">
            <Label className="font-bold">Accreditation and Usage</Label>
            <div className="d-flex align-items-center">
              <RadioButton
                name="accreditation"
                value=""
                currentSelection={formState.accreditation}
                onChange={changeHandler}
              >
                All
              </RadioButton>
              <RadioButton
                name="accreditation"
                value={'1'}
                currentSelection={formState.accreditation}
                onChange={changeHandler}
              >
                Yes
              </RadioButton>
              <RadioButton
                name="accreditation"
                value={'2'}
                currentSelection={formState.accreditation}
                onChange={changeHandler}
              >
                No
              </RadioButton>
            </div>
          </div>
          <div className="col-md-6">
            <Label className="font-bold">Status</Label>
            <div className="d-flex align-items-center">
              <RadioButton
                name="ItemsStatusIds"
                value=""
                currentSelection={formState.ItemsStatusIds}
                onChange={changeHandler}
              >
                All
              </RadioButton>
              <RadioButton
                name="ItemsStatusIds"
                value={'1'}
                currentSelection={formState.ItemsStatusIds}
                onChange={changeHandler}
              >
                Drafted
              </RadioButton>
              <RadioButton
                name="ItemsStatusIds"
                value={'2'}
                currentSelection={formState.ItemsStatusIds}
                onChange={changeHandler}
              >
                Published
              </RadioButton>
            </div>
          </div>
        </FormGroup>

        <div className="hr-line-dashed" />
        <FormGroup className="row">
          <div className="col-md-12">
            <Label className="font-bold">Industry And Recommended Application</Label>

            <div className="d-flex align-items-center">
              <RadioButton
                name="application"
                value=""
                currentSelection={formState.application}
                onChange={changeHandler}
              >
                All
              </RadioButton>

              <LookupContextConsumer>{renderAssessmentRecommend}</LookupContextConsumer>
            </div>
          </div>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default AssessmentFilters;
