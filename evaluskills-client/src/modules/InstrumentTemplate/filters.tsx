import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';

import RadioButton from '../../components/atoms/RadioButton';
import ModalContext from '../../context/ModalContext';
import { USER_ROLE } from '../../utils';
import LookupContext from '../Lookup/context';
import { lookups } from '../Lookup/enum';

const initialState = {};

const InstrumentTemplateFilters: React.FunctionComponent = () => {
  const [state, setState] = useState(initialState);
  const { setModalState } = useContext(ModalContext);
  const { findKey } = useContext(LookupContext);

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
              Status
            </Label>
            <div className="col-md-7">
              <RadioButton
                name="status"
                value="all"
                currentSelection="all"
                onChange={changeHandler}
              >
                All
              </RadioButton>
              <RadioButton
                name="status"
                value="standard"
                currentSelection="all"
                onChange={changeHandler}
              >
                Standard
              </RadioButton>
              <RadioButton
                name="status"
                value="customized"
                currentSelection="all"
                onChange={changeHandler}
              >
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
