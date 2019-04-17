import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';

import RadioButton from '../../components/atoms/RadioButton';
import ModalContext from '../../context/ModalContext';
import { USER_ROLE } from '../../utils';
import LookupContext from '../Lookup/context';
import { lookups } from '../Lookup/enum';
import FilterContext from './context';

const initialState = {
  recommendedApplicationId: '',
  type: 'all',
};

const InstrumentTemplateFilters: React.FunctionComponent = () => {
  const { setModalState } = useContext(ModalContext);
  const { findKey } = useContext(LookupContext);
  const { activeFilters } = useContext(FilterContext);
  const [state, setState] = useState({
    ...initialState,
    recommendedApplicationId: activeFilters && activeFilters.recommendedApplicationId,
    type: activeFilters && activeFilters.type,
  });

  useEffect(() => {
    if (setModalState) {
      setModalState(state);
    }
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function renderRecommendedApplicationFilter() {
    if (findKey) {
      return findKey(lookups.recommendedApplicationsLookUp).map(application => {
        return (
          <option value={application.value} key={application.value}>
            {application.text}
          </option>
        );
      });
    }
  }

  return (
    <Form>
      <FormGroup className="row">
        <Label for="recommended-application" className="col-md-5 col-form-label font-bold">
          Recommended Application
        </Label>
        <div className="col-md-7">
          <Input
            type="select"
            name="recommendedApplicationId"
            value={state.recommendedApplicationId}
            id="recommended-application"
            onChange={changeHandler}
          >
            <option value="">Select One</option>
            {renderRecommendedApplicationFilter()}
          </Input>
        </div>
      </FormGroup>
      {USER_ROLE.isClientAdmin() && (
        <React.Fragment>
          <div className="hr-line-dashed" />
          <FormGroup className="row">
            <Label id="status" className="col-md-5 col-form-label font-bold">
              Type
            </Label>
            <div className="col-md-7">
              <RadioButton name="type" value="all" currentSelection={state.type} onChange={changeHandler}>
                All
              </RadioButton>
              <RadioButton name="type" value="standard" currentSelection={state.type} onChange={changeHandler}>
                Standard
              </RadioButton>
              <RadioButton name="type" value="customized" currentSelection={state.type} onChange={changeHandler}>
                Customized
              </RadioButton>
            </div>
          </FormGroup>
        </React.Fragment>
      )}
    </Form>
  );
};

export default InstrumentTemplateFilters;
