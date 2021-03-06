import React, { useContext, useEffect, useState } from 'react';

import { Form, FormGroup, Input } from 'reactstrap';
import ModalContext from '../../../context/ModalContext';
import { lookups } from '../../../modules/Lookup/enum';

import LookupContext from '../../../modules/Lookup/context';
import FilterContext from './context';
import { USER_ROLE } from '../../../utils';

interface Props {
  clientLookUp?: any;
}
const initialState = {
  clientId: '',
  roleId: '',
};

const UserFilter: React.FunctionComponent<Props> = ({ clientLookUp }) => {
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
      return findKey(lookups.userRolesLookUp).map((application: any) => {
        return (
          <option value={application.value} key={application.value}>
            {application.text}
          </option>
        );
      });
    }
  }

  function renderClientDropdown() {
    if (clientLookUp) {
      return clientLookUp.map((application: any) => {
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
        {USER_ROLE.isSuperAdmin() && (
          <React.Fragment>
            <div className="hr-line-dashed" />
            <FormGroup className="row">
              <label className="col-sm-4 col-form-label font-bold">Clients</label>
              <div className="col-sm-8">
                <Input type="select" name="clientId" id="plan-select" onChange={changeHandler} value={state.clientId}>
                  <option value="">All</option>
                  {renderClientDropdown()}
                </Input>
              </div>
            </FormGroup>
          </React.Fragment>
        )}
      </React.Fragment>
    </Form>
  );
};

export default UserFilter;
