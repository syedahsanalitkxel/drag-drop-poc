import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import { lookups } from '../../../modules/Lookup/enum';

import LookupContext from '../../../modules/Lookup/context';
import FilterContext from './context';

import InstrumentFiltersInterface from '../../../interfaces/InstrumentFilters';
import RadioButton from '../../../components/atoms/RadioButton';

const initialState = {
  instrumentApplicationId: '',
  statusId: '',
  testTypeId: 0,
};

const InstrumentFilters: React.FunctionComponent = () => {
  const { setModalState } = useContext(ModalContext);
  const { findKey } = useContext(LookupContext);
  const { activeFilters } = useContext(FilterContext);
  const [state, setState] = useState({
    ...initialState,
    instrumentApplicationId: activeFilters && activeFilters.instrumentApplicationId,
    statusId: activeFilters && activeFilters.statusId,
    testTypeId: activeFilters && activeFilters.testTypeId,
  });

  useEffect(() => {
    if (setModalState) {
      setModalState(state);
    }
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function renderInsturmentApplicationDropdown() {
    if (findKey) {
      return findKey(lookups.instrumentStatusLookUp).map((application: any) => {
        return (
          <option value={application.value} key={application.value}>
            {application.text}
          </option>
        );
      });
    }
  }

  function renderClientTypeDropdown() {
    if (findKey) {
      return findKey(lookups.clientTypesLookUp).map((application: any) => {
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
            <Label className="font-bold">Client Type</Label>
            <div className="d-flex align-items-center">
              <Input
                type="select"
                name="instrumentApplicationId"
                id="instrumentApplicationId"
                onChange={changeHandler}
                value={state.instrumentApplicationId}
              >
                <option value="">All</option>
                {renderClientTypeDropdown()}
              </Input>
            </div>
          </div>
          <div className="col-md-6">
            <Label className="font-bold">Status</Label>
            <div className="d-flex align-items-center">
              <Input type="select" name="statusId" id="statusId" onChange={changeHandler} value={state.statusId}>
                <option value="">All</option>
                {renderInsturmentApplicationDropdown()}
              </Input>
            </div>
          </div>
        </FormGroup>
        <FormGroup className="row">
          <div className="col-md-6">
            <Label id="statusId" className="col-md-6 col-form-label font-bold">
              Test Type
            </Label>
            <div className="d-flex align-items-center">
              <RadioButton name="testTypeId" value="" currentSelection={state.testTypeId} onChange={changeHandler}>
                All
              </RadioButton>
              <RadioButton name="testTypeId" value="1" currentSelection={state.testTypeId} onChange={changeHandler}>
                Pre Test
              </RadioButton>
              <RadioButton name="testTypeId" value="2" currentSelection={state.testTypeId} onChange={changeHandler}>
                Post Test
              </RadioButton>
            </div>
          </div>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default InstrumentFilters;
