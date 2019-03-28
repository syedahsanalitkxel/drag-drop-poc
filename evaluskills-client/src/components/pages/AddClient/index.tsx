import { Field, Formik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import styled from 'styled-components';
import * as Yup from 'yup';
import IAddClient from '../../../interfaces/AddClient';
import ClientContacts from '../../organisms/ClientContacts/ClientContacts';
import DashboardTemplate from '../../templates/DashboardTemplate';

interface Props {
  changeListener?: (formValues: IAddClient) => void;
}

const initialState = {
  address: ' ',
  billing: 'plan 2',
  city: ' ',
  clientInformation: ' ',
  clientName: 'Maria Gracia',
  clientType: 'Type 1',
  contact: [
    {
      email: 'Ali@tkxel.com',
      firstName: 'Ali',
      lastName: 'Raza',
      phone: '+923334567891',
      role: 'user',
    },
  ],
  phone: '+888 667 999 ',
  school: ' ',
  state: ' ',
  userEmail: 'rizwan@tkxel.com',
  userFirstName: 'rizwan',
  userLastName: 'shah',
  zip: ' ',
};

const StyledButton = styled.button`
    marginLeft: 2,
    marginRight: 2,
`;

export const AddClient: React.FunctionComponent<Props> = ({ changeListener }) => {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (changeListener) {
      changeListener(formState);
    }
  });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    console.log(event.target.name);
    if (event.target.name) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
    }
  }

  const onClickaddcontact = (event: any) => {
    // let length = Object.getOwnPropertyNames(this.state.lists).length;
    // let obj: any = {};
    // obj['excstatement'] = ''
    // this.state.excstatement.push(obj)
    // const list = this.state.lists;
    // list[length + 1] = this.state.itemsElements
    // this.setState({ lists: list })
    // this.setState({ countAssetelement: this.state.countAssetelement + 1 })

    const { contact } = formState;
    const contactObj: any = {};
    contact.push(contactObj);
    setFormState({ ...formState, contact });
  };

  const addClientSchema = Yup.object().shape({
    address: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    billing: Yup.string().required('Required'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    clientInformation: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    clientName: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    school: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    state: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    zip: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    phone: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    clientType: Yup.string().required('Required'),
    contactEmail: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    contactFirstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    contactLastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    contactPhone: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    contactRole: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    userEmail: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    userFirstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    userLastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const renderForm = (formikprops: any) => (
    <form onSubmit={formikprops.handleSubmit} className={'form'}>
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="ibox">
          <div className="ibox-content">
            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Client Name</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="clientName"
                  className="form-control"
                  placeholder="Add Client Name"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.clientName && formikprops.errors.clientName)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.clientName}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Logo</label>
              <div className="col-sm-3">
                <img src="img/Logo.svg" alt="logo" />
                <span className="txt">Upload Photo</span>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Address</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Add Address"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.address && formikprops.errors.address)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.address}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">City</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="Add City"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.city && formikprops.errors.city)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.city}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">State</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder="Add State"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.state && formikprops.errors.state)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.state}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Zip</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="zip"
                  className="form-control"
                  placeholder="Add Zip"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.zip && formikprops.errors.zip)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.zip}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">School/Subsidiary</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="school"
                  className="form-control"
                  placeholder="school"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.school && formikprops.errors.school)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.school}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Client Information</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="clientInformation"
                  className="form-control"
                  placeholder="Add Clients Information"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={
                    !!(
                      formikprops.touched.clientInformation && formikprops.errors.clientInformation
                    )
                  }
                />

                <FormFeedback tooltip={true}>{formikprops.errors.clientInformation}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Billing</label>
              <div className="col-sm-3">
                <Input
                  type="select"
                  name="billing"
                  placeholder="Add Biling"
                  id="billing-select"
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.billing && formikprops.errors.billing)}
                >
                  <option value="Add Billing">Add Biling</option>
                  <option value="Add Billing">Add Biling</option>
                </Input>

                <FormFeedback tooltip={true}>{formikprops.errors.billing}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Client Type</label>
              <div className="col-sm-3">
                <Input
                  type="select"
                  name="clientType"
                  placeholder="Client Type"
                  id="billing-select"
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.clientType && formikprops.errors.clientType)}
                >
                  <option value="selected">Select Type</option>
                  <option value="co-oprate">Co-oprate</option>
                  <option value="Educational Institute">Educational Institute</option>
                </Input>

                <FormFeedback tooltip={true}>{formikprops.errors.clientType}</FormFeedback>
              </div>
            </div>
          </div>
        </div>

        <div className="form-header row">
          <div className="col-sm-6">
            <h3>Contact</h3>
          </div>
          <div className="col-sm-6">
            <button
              type="submit"
              id="helper"
              onClick={onClickaddcontact}
              data-toggle="tooltip"
              className="btn btn-primary float-right"
            >
              Add Contact
            </button>
          </div>
        </div>

        <div className="">
          {formState.contact &&
            formState.contact.map((contact, index) => {
              return (
                <Fragment key={index}>
                  <ClientContacts />
                </Fragment>
              );
            })}
        </div>

        <div className="form-header row">
          <div className="col-sm-6">
            <h3>User Information</h3>
          </div>
        </div>

        <div className="ibox userInformation">
          <div className="ibox-content">
            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">First Name</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="userFirstName"
                  className="form-control"
                  placeholder="Add First Name"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={
                    !!(formikprops.touched.userFirstName && formikprops.errors.userFirstName)
                  }
                />

                <FormFeedback tooltip={true}>{formikprops.errors.userFirstName}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Last Name</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="userLastName"
                  className="form-control"
                  placeholder="Add Last Name"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.userLastName && formikprops.errors.userLastName)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.userLastName}</FormFeedback>
              </div>
            </div>

            <div className="hr-line-dashed" />

            <div className="form-group  row">
              <label className="col-sm-2 col-form-label font-bold">Email</label>
              <div className="col-sm-3">
                <Input
                  type="text"
                  name="userEmail"
                  className="form-control"
                  placeholder="Add Email"
                  tag={Field}
                  onChange={changeHandler}
                  invalid={!!(formikprops.touched.userEmail && formikprops.errors.userEmail)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.userEmail}</FormFeedback>
              </div>
            </div>
          </div>
        </div>

        <div className="m-t-15 m-b-15">
          <StyledButton type="button" className="btn btn-default btn-lg">
            Cancel
          </StyledButton>
          <StyledButton
            type="button"
            id={'submit'}
            name="submit"
            className="btn btn-primary btn-lg"
          >
            Save
          </StyledButton>
          <StyledButton type="button" className="btn btn-primary btn-lg">
            Save &amp; Add More
          </StyledButton>
        </div>
      </div>
    </form>
  );

  return (
    <DashboardTemplate>
      <Formik
        initialValues={{ initialState }}
        validationSchema={addClientSchema}
        onSubmit={() => {}}
      >
        {formikprops => renderForm(formikprops)}
      </Formik>
    </DashboardTemplate>
  );
};

export default AddClient;
