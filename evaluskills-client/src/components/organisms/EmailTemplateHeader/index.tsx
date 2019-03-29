import React, { PureComponent, Component, Fragment } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import { Formik, Field } from 'formik';

interface props {
  key: number;
  comNumber: number;
  tag?: any;
  onChange: (event: any, key: number) => void;
  formikprops: any;
}

const EmailHeader: React.FunctionComponent = (formikprops: any) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h2 className="font-weight-light">Email Template</h2>
        </div>
      </div>

      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="ibox ">
          <div className="ibox-content">
            <div className="row">
              <div className="col-md-6">
                <label className="col-sm-12 col-form-label font-bold">Title</label>
                <div className="col-sm-8">
                  <input placeholder="Add Email Title" className="form-control" type="text" />
                </div>
              </div>
              <div className="col-md-6">
                <label className="col-sm-12 col-form-label font-bold">Type</label>
                <select className="form-control m-b col-sm-8" name="account" value="">
                  <option>Select Type</option>
                  <option>option 2</option>
                  <option>option 3</option>
                  <option>option 4</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="col-sm-12 col-form-label font-bold">Subject</label>
                <div className="col-sm-8">
                  <input placeholder="Subject" className="form-control" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailHeader;
