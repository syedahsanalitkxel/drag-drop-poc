import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input, Label } from 'reactstrap';
import { ModalContext } from '../../../context';
import { AssessmentFiltersInterface } from '../../../interfaces/AssessmentFilters';
import RadioButton from '../../atoms/RadioButton';

interface Props {
  changeListener?: (formValues: AssessmentFiltersInterface) => void;
}

const initialState = {
  accreditation: 'all',
  application: 'both',
  category: '2',
  competency: '1',
  status: 'all',
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

  function esChangeHandler(value: string, name?: string) {
    if (name) {
      setFormState({ ...formState, [name]: value });
    }
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  return (
    <React.Fragment>
      <Form>
        <div className="hr-line-dashed" />
        <FormGroup className="row">
          <div className="col-md-6">
            <Label for="competency-select" className="font-bold">Competency</Label>
            <Input type="select" name="competency" id="competency-select" onChange={changeHandler}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Input>
          </div>
          <div className="col-md-6">
            <Label for="category-select" className="font-bold">Category</Label>
            <Input type="select" name="category" id="category-select" onChange={changeHandler}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Input>
          </div>
        </FormGroup>

        <div className="hr-line-dashed" />
        <FormGroup className="row">
          <div className="col-md-6">
            <Label className="font-bold">Accreditation and Usage</Label>
            <div className="d-flex align-items-center">
              <RadioButton name="accreditation" value="all" currentSelection={formState.accreditation} onChange={esChangeHandler}>
                All
              </RadioButton>
              <RadioButton name="accreditation" value="yes" currentSelection={formState.accreditation} onChange={esChangeHandler}>
                Yes
              </RadioButton>
              <RadioButton name="accreditation" value="no" currentSelection={formState.accreditation} onChange={esChangeHandler}>
                No
              </RadioButton>
            </div>
          </div>
          <div className="col-md-6">
            <Label className="font-bold">Status</Label>
            <div className="d-flex align-items-center">
              <RadioButton name="status" value="all" currentSelection={formState.status} onChange={esChangeHandler}>
                All
              </RadioButton>
              <RadioButton name="status" value="published" currentSelection={formState.status} onChange={esChangeHandler}>
                Published
              </RadioButton>
              <RadioButton name="status" value="drafted" currentSelection={formState.status} onChange={esChangeHandler}>
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
              <RadioButton name="application" value="both" currentSelection={formState.application} onChange={esChangeHandler}>
                Both
              </RadioButton>
              <RadioButton name="application" value="corporate" currentSelection={formState.application} onChange={esChangeHandler}>
                Corporate
              </RadioButton>
              <RadioButton name="application" value="educational" currentSelection={formState.application} onChange={esChangeHandler}>
                Educational Institute
              </RadioButton>
            </div>
          </div>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default AssessmentFilters;
