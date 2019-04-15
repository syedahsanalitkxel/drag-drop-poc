import React, { useContext, useEffect, useState } from 'react';

import { Form, Label } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import InstrumentFiltersInterface from '../../../interfaces/InstrumentFilters';
import CheckBox from '../../atoms/CheckBox';

interface Props {
  changeListener?: (formValues: InstrumentFiltersInterface) => void;
}

const initialState = {
  type: 'corporate',
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

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  return (
    <React.Fragment>
      <Form>
        <div className="col-md-12">
          <Label className="font-bold">Type</Label>
          <div className="d-flex align-items-center">
            <CheckBox name="type" value="higherEducation" currentSelection={formState.type} onChange={changeHandler}>
              Higher Education
            </CheckBox>
            <CheckBox name="type" value="corporate" currentSelection={formState.type} onChange={changeHandler}>
              Corporate
            </CheckBox>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default InstrumentFilters;
