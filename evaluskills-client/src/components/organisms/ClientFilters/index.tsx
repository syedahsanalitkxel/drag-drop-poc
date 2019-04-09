import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';
import { ModalContext } from '../../../context';
import { ClientFilters } from '../../../interfaces/ClientFilter';
import CheckBox from '../../atoms/CheckBox';

interface Props {
  changeListener?: (formValues: ClientFilters) => void;
}

const initialState = {
  billingPlanId: 1,
  companyTypeId: 1,
  statusId: false,
};

const ClientFilter: React.FunctionComponent<Props> = ({ changeListener }) => {
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
    if (event.target.name !== 'statusId') {
      setFormState({ ...formState, [event.target.name]: parseInt(event.target.value, 10) });
    } else {
      setFormState({ ...formState, [event.target.name]: JSON.parse(event.target.value) });
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
                name="statusId"
                value="true"
                isChecked={formState.statusId}
                onChange={changeHandler}
              >
                Active
              </CheckBox>
              <CheckBox
                name="statusId"
                value="false"
                onChange={changeHandler}
                isChecked={formState.statusId !== true}
              >
                InActive
              </CheckBox>
            </div>
          </div>
          <div className="col-md-6">
            <Label for="plan-select" className="font-bold">
              Plan
            </Label>
            <Input type="select" name="billingPlanId" id="plan-select" onChange={changeHandler}>
              <option value="Select Plan">Select Plan</option>
              <option value="1">Billing option 1</option>
              <option value="2">Billing option 2</option>
            </Input>
          </div>
        </FormGroup>

        <div className="hr-line-dashed" />
        <FormGroup className="row">
          <div className="col-md-12">
            <Label className="font-bold">Type</Label>
            <div className="d-flex align-items-center">
              <CheckBox
                name="companyTypeId"
                value="1"
                onChange={changeHandler}
                isChecked={formState.companyTypeId === 1}
              >
                Higher Education
              </CheckBox>
              <CheckBox
                name="companyTypeId"
                value="2"
                onChange={changeHandler}
                isChecked={formState.companyTypeId === 2}
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

export default ClientFilter;
