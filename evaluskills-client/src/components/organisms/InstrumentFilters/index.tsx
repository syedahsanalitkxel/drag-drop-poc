import React, { useContext, useEffect, useState, Fragment } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';
import { ModalContext } from '../../../context';
import AssessmentFiltersInterface from '../../../interfaces/AssessmentFilters';
import Checkbox from '../../atoms/CheckBox';
import RadioButton from '../../atoms/RadioButton';

interface Props {
  changeListener?: (formValues: AssessmentFiltersInterface) => void;
}

const initialState = {
  recommendAppHigher: false,
  recommendAppCorporate: false,
  category: '2',
  competency: '1',
  status: 'all',
};

const InstrumentFilters: React.FunctionComponent<Props> = ({ changeListener }) => {
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
  const isClientAdmin = () =>
    !window.localStorage.getItem('role') || window.localStorage.getItem('role') === 'CLIENT_ADMIN';

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }
  function checkboxChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'recommendAppHigher') {
      setFormState({ ...formState, recommendAppHigher: !formState.recommendAppHigher });
    } else {
      setFormState({ ...formState, recommendAppCorporate: !formState.recommendAppCorporate });
    }
  }
  const Clientfilter = () => {
    return (
      <Fragment>
        <div className="hr-line-dashed" />
        <div className="col-md-6">
          <Label className="font-bold">Status</Label>
          <div className="d-flex align-items-center">
            <RadioButton
              name="status"
              value="all"
              currentSelection={formState.status}
              onChange={changeHandler}
            >
              All
            </RadioButton>
            <RadioButton
              name="status"
              value="standard"
              currentSelection={formState.status}
              onChange={changeHandler}
            >
              Standard
            </RadioButton>
            <RadioButton
              name="status"
              value="customized"
              currentSelection={formState.status}
              onChange={changeHandler}
            >
              Customized
            </RadioButton>
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <React.Fragment>
      <Form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label font-bold">Type</label>

          <div className="col-sm-10">
            <Checkbox
              name="recommendAppHigher"
              value="edval"
              isChecked={formState.recommendAppHigher}
              onChange={checkboxChangeHandler}
            >
              Higher Education
            </Checkbox>
            <Checkbox
              name="recommendAppCorporate"
              value="Corporateval"
              isChecked={formState.recommendAppCorporate}
              onChange={checkboxChangeHandler}
            >
              Corporate
            </Checkbox>
          </div>
        </div>

        {isClientAdmin() && <Clientfilter />}
      </Form>
    </React.Fragment>
  );
};

export default InstrumentFilters;
