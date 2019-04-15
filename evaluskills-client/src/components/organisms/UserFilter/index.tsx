import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import UserFilters from '../../../interfaces/UserFilter';

import { lookups } from '../../../enums';

import { LookupContextConsumer } from '../../../context/LookupContext';
import { LookupContextInterface, LookupItemInterface } from '../../../interfaces/Lookup';

interface Props {
  changeListener?: (formValues: UserFilters) => void;
}

const initialState = {
  clientId: 1,
  roleId: 1,
};

const UserFilter: React.FunctionComponent<Props> = ({ changeListener }) => {
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
      setFormState({ ...formState, [event.target.name]: parseInt(event.target.value, 10) });
    } else {
      setFormState({ ...formState, [event.target.name]: JSON.parse(event.target.value) });
    }
  }

  const renderClientsDropdown = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.clientTypesLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };

  const renderRoleDropdown = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.userRolesLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };

  return (
    <React.Fragment>
      <Form>
        <FormGroup className="row">
          <label className="col-sm-4 col-form-label font-bold">Role</label>
          <div className="col-sm-8">
            <Input type="select" name="roleId" id="plan-select" onChange={changeHandler}>
              <LookupContextConsumer>{renderRoleDropdown}</LookupContextConsumer>
            </Input>
          </div>
        </FormGroup>

        <div className="hr-line-dashed" />

        <FormGroup className="row">
          <label className="col-sm-4 col-form-label font-bold">Clients</label>
          <div className="col-sm-8">
            <Input type="select" name="clientId" id="plan-select" onChange={changeHandler}>
              <LookupContextConsumer>{renderClientsDropdown}</LookupContextConsumer>
            </Input>
          </div>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default UserFilter;
