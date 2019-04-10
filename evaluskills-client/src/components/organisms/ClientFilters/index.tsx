import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import { IClientFilters } from '../../../interfaces/ClientFilter';
import CheckBox from '../../atoms/CheckBox';

interface Props {
  changeListener?: (formValues: IClientFilters) => void;
}

const initialState = {
  plan: 'option 2',
  status: 'Active',
  type: 'Higher Education',
};

const ClientFilters: React.FunctionComponent<Props> = ({ changeListener }) => {
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
    if (event.target.name) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
    }
  }

  return (
    <React.Fragment>
      <Form>
        <FormGroup className="row">
          <div className="col-md-6">
            <Label className="font-bold">Status</Label>
            <div className="d-flex align-items-center">
              <CheckBox
                name="status"
                value="Active"
                currentSelection={formState.status}
                onChange={changeHandler}
              >
                Active
              </CheckBox>
              <CheckBox
                name="status"
                value="InActive"
                currentSelection={formState.status}
                onChange={changeHandler}
              >
                InActive
              </CheckBox>
            </div>
          </div>
          <div className="col-md-6">
            <Label for="plan-select" className="font-bold">
              Plan
            </Label>
            <Input type="select" name="plan" id="plan-select" onChange={changeHandler}>
              <option value="Select Plan">Select Plan</option>
              <option value="option 2">option 2</option>
              <option value="option 3">option 3</option>
              <option value="option 4">option 4</option>
            </Input>
          </div>
        </FormGroup>

        <div className="hr-line-dashed" />
        <FormGroup className="row">
          <div className="col-md-12">
            <Label className="font-bold">Type</Label>
            <div className="d-flex align-items-center">
              <CheckBox
                name="type"
                value="Higher Education"
                currentSelection={formState.type}
                onChange={changeHandler}
              >
                Higher Education
              </CheckBox>
              <CheckBox
                name="type"
                value="Business/Agency"
                currentSelection={formState.type}
                onChange={changeHandler}
              >
                Business/Agency
              </CheckBox>
            </div>
          </div>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default ClientFilters;
