import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import { lookups } from '../../../modules/Lookup/enum';

import LookupContext from '../../../modules/Lookup/context';
import FilterContext from './context';

const initialState = {
  clientId: '',
  roleId: '',
};

const UserFilter: React.FunctionComponent = () => {
  const { setModalState } = useContext(ModalContext);
  const { findKey } = useContext(LookupContext);
  const { activeFilters } = useContext(FilterContext);
  const [state, setState] = useState({
    ...initialState,
    clientId: activeFilters && activeFilters.clientId,
    roleId: activeFilters && activeFilters.roleId,
  });

  useEffect(() => {
    if (setModalState) {
      setModalState(state);
    }
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function renderRoleDropdown() {
    if (findKey) {
      return findKey(lookups.userRolesLookUp).map(application => {
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
      <React.Fragment>
        <FormGroup className="row">
          <label className="col-sm-4 col-form-label font-bold">Role</label>
          <div className="col-sm-8">
            <Input type="select" name="roleId" id="roleId" onChange={changeHandler} value={state.roleId}>
              <option value="">All</option>
              {renderRoleDropdown()}
            </Input>
          </div>
        </FormGroup>

        <div className="hr-line-dashed" />

        <FormGroup className="row">
          <label className="col-sm-4 col-form-label font-bold">Clients</label>
          <div className="col-sm-8">
            <Input type="select" name="clientId" id="plan-select" onChange={changeHandler} value={state.clientId}>
              <option value="">All</option>
              <option value="1">Tester 1</option>
              <option value="7">Tester 7</option>
              <option value="10">Tester 10</option>
            </Input>
          </div>
        </FormGroup>
      </React.Fragment>
    </Form>
  );
};

export default UserFilter;
