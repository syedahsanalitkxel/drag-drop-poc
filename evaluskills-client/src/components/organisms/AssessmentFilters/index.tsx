import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import AssessmentFiltersInterface from '../../../interfaces/AssessmentFilters';
import RadioButton from '../../atoms/RadioButton';
import Checkbox from '../../atoms/CheckBox';
import InstrumentTemplateInterface from '../../../interfaces/InstrumentTemplate';
import { LookupContextConsumer } from '../../../modules/Lookup/context';
import { lookups } from '../../../modules/Lookup/enum';
import { LookupContextInterface, LookupItemInterface } from '../../../modules/Lookup/interface';
interface Props {
  changeListener?: (formValues: any) => void;
}

const initialState = {
  accreditation: 1,
  application: 1,
  categoryId: 2,
  competencyId: 1,
  itemsStatusIds: 1,
  itemRecomendedApplications: [1],
};

const AssessmentFilters: React.FunctionComponent<Props> = ({ changeListener }) => {
  const [formState, setFormState] = useState(initialState);

  const { setModalState } = useContext(ModalContext);

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
    if (setModalState) {
      setModalState(formState);
    }
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: parseInt(event.target.value, 10) });
  }
  function lookupchangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: parseInt(event.target.value, 10) });
  }
  function checkboxChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const number = parseInt(event.target.value, 10);
    let arr = formState.itemRecomendedApplications;
    let check = arr.includes(number);

    if (check) {
      var index = arr.indexOf(number);
      arr.splice(index, 1);
    } else {
      arr.push(number);
    }

    setFormState({
      ...formState,
      itemRecomendedApplications: arr,
    });
  }
  const recommendedApplicationsLookUp = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.recommendedApplicationsLookUp).map(
        (lookup: LookupItemInterface, index) => (
          <Checkbox
            name="itemRecomendedApplications"
            value={lookup.value}
            isChecked={
              lookup.value && formState.itemRecomendedApplications.includes(lookup.value)
                ? true
                : false
            }
            onChange={checkboxChangeHandler}
          >
            {lookup.text}
          </Checkbox>
        )
      );
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
        <div className="hr-line-dashed" />
        <div className="form-group row">
          <label className="col-sm-2 col-form-label font-bold">Type</label>

          <div className="col-sm-10">
            <LookupContextConsumer>{recommendedApplicationsLookUp}</LookupContextConsumer>
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
              id="competency-select"
              onChange={changeHandler}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Input>
          </div>
          <div className="col-md-6">
            <Label for="category-select" className="font-bold">
              Category
            </Label>
            <Input type="select" name="categoryId" id="category-select" onChange={changeHandler}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
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
                value={3}
                currentSelection={formState.accreditation}
                onChange={changeHandler}
              >
                All
              </RadioButton>
              <RadioButton
                name="accreditation"
                value={1}
                currentSelection={formState.accreditation}
                onChange={changeHandler}
              >
                Yes
              </RadioButton>
              <RadioButton
                name="accreditation"
                value={2}
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
                name="itemsStatusIds"
                value={3}
                currentSelection={formState.itemsStatusIds}
                onChange={changeHandler}
              >
                All
              </RadioButton>
              <RadioButton
                name="itemsStatusIds"
                value={1}
                currentSelection={formState.itemsStatusIds}
                onChange={changeHandler}
              >
                Published
              </RadioButton>
              <RadioButton
                name="itemsStatusIds"
                value={2}
                currentSelection={formState.itemsStatusIds}
                onChange={changeHandler}
              >
                Drafted
              </RadioButton>
            </div>
          </div>
        </FormGroup>

        <div className="hr-line-dashed" />
        <FormGroup className="row">
          <div className="col-md-12">
            <Label className="font-bold">Industry And Recommended Application</Label>
            <div className="d-flex align-items-center">
              <LookupContextConsumer>{renderAssessmentRecommend}</LookupContextConsumer>
            </div>
          </div>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default AssessmentFilters;
