import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import { lookups } from '../../../modules/Lookup/enum';
import LookupContext from '../../../modules/Lookup/context';
import FilterContext from './context';
import RadioButton from '../../../components/atoms/RadioButton';

const initialState = {
  billingPlanId: '',
  companyTypeId: 0,
  statusId: '',
};

const ClientFilter: React.FunctionComponent = () => {
  const { setModalState } = useContext(ModalContext);
  const { findKey } = useContext(LookupContext);
  const { activeFilters } = useContext(FilterContext);
  const [state, setState] = useState({
    ...initialState,
    billingPlanId: activeFilters && activeFilters.billingPlanId,
    companyTypeId: activeFilters && activeFilters.companyTypeId,
    statusId: activeFilters && activeFilters.statusId,
  });

  useEffect(() => {
    if (setModalState) {
      setModalState(state);
    }
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    // setState({ ...state, [event.target.name]: event.target.value });
    if (event.target.name !== 'statusId') {
      setState({ ...state, [event.target.name]: parseInt(event.target.value, 10) });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  }

  function renderBillingPlanDropdown() {
    if (findKey) {
      return findKey(lookups.billingPlansLookUp).map(application => {
        return (
          <option value={application.value} key={application.value}>
            {application.text}
          </option>
        );
      });
    }
  }

  return (
    <React.Fragment>
      <Form>
        <FormGroup className="row">
          <div className="col-md-6">
            <Label id="statusId" className="col-md-5 col-form-label font-bold">
              Status
            </Label>
            <div className="d-flex align-items-center">
              <RadioButton name="statusId" value="" currentSelection={state.statusId} onChange={changeHandler}>
                All
              </RadioButton>
              <RadioButton name="statusId" value="true" currentSelection={state.statusId} onChange={changeHandler}>
                Active
              </RadioButton>
              <RadioButton name="statusId" value="false" currentSelection={state.statusId} onChange={changeHandler}>
                InActive
              </RadioButton>
            </div>
          </div>
          <div className="col-md-6">
            <Label id="billingPlanId" className="col-md-5 col-form-label font-bold">
              Plan
            </Label>
            <Input type="select" name="billingPlanId" id="plan-select" onChange={changeHandler}>
              <option value="">All</option>
              {renderBillingPlanDropdown()}
            </Input>
          </div>
        </FormGroup>
        <div className="hr-line-dashed" />

        <FormGroup className="row">
          <div className="col-md-12">
            <Label id="companyTypeId" className="col-md-5 col-form-label font-bold">
              Type
            </Label>
            <div className="d-flex align-items-center">
              <RadioButton
                name="companyTypeId"
                value={0}
                currentSelection={state.companyTypeId}
                onChange={changeHandler}
              >
                All
              </RadioButton>
              <RadioButton
                name="companyTypeId"
                value={1}
                currentSelection={state.companyTypeId}
                onChange={changeHandler}
              >
                Higher Education
              </RadioButton>
              <RadioButton
                name="companyTypeId"
                value={2}
                currentSelection={state.companyTypeId}
                onChange={changeHandler}
              >
                Business/Agency
              </RadioButton>
            </div>
          </div>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default ClientFilter;
