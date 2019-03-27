import React, { PureComponent, Component, Fragment } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { faThList } from '@fortawesome/free-solid-svg-icons';

import { Formik, Field } from 'formik';
//
// interface props {
//     key: number,
//     comNumber: number,
//     tag?: any,
//     onChange: (event: any, key: number) => void;
//     formikprops: any;
//
// }
const ClientContacts: React.FunctionComponent = () => {
  return (
    <Fragment>
      <div className="ibox">
        <div className="ibox-content">
          <div className="form-group row">
            <div className="col-md-6">
              <label className="col-sm-12 col-form-label font-bold">First Name</label>
              <div className="col-sm-12">
                <Input
                  type="text"
                  name="contactFirstName"
                  className="form-control"
                  placeholder="Add First Name"
                  tag={Field}
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="col-sm-12 col-form-label font-bold">Last Name</label>
              <div className="col-sm-12">
                <Input
                  type="text"
                  name="contactLastName"
                  className="form-control"
                  placeholder="Add Last Name"
                  tag={Field}
                />
              </div>
            </div>
          </div>

          <div className="hr-line-dashed" />

          <div className="form-group row">
            <div className="col-md-6">
              <label className="col-sm-12 col-form-label font-bold">Email</label>
              <div className="col-sm-12">
                <Input
                  type="text"
                  name="contactEmail"
                  className="form-control"
                  placeholder="Add Email"
                  tag={Field}
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="col-sm-12 col-form-label font-bold">Phone</label>
              <div className="col-sm-12">
                <Input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Add Phone"
                  tag={Field}
                />
              </div>
            </div>
          </div>

          <div className="hr-line-dashed" />

          <div className="form-group row">
            <div className="col-md-6">
              <label className="col-sm-12 col-form-label font-bold">Role</label>
              <div className="col-sm-12">
                <Input type="select" name="contactRole" placeholder="role" id="role-select">
                  <option value="Selected">Select Role</option>
                  <option value="role1">Role 1</option>
                  <option value="role2">Role 2</option>
                </Input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ClientContacts;
