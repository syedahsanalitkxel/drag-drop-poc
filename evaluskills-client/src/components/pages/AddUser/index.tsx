import { Field, Formik } from 'formik';
import React from 'react';
import { Button, FormFeedback, Input, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { styles } from './style';
import PageBody from '../../atoms/PageBody';
import styled from 'styled-components';
import FormikBag from '../../../interfaces/FormikBag';

interface ModalProps {
  visible?: boolean;
  toggle: () => void;
  submitHandler: (values: any) => void;
  name?: string;
  FormValues: any;
}

const StyledButton = styled(Button)`
  margin-left: 20px;
  margin-right: 5px;
`;

export const AddUser: React.FunctionComponent<ModalProps> = ({
  visible,
  toggle,
  name,
  FormValues,
  submitHandler,
}) => {
  function submitForm(values: any) {
    console.log(values);
    // if (fprops.initialValues.clientContacts && toggle && name === 'Add') {
    //   toggle();
    //   fprops.initialValues.clientContacts.push(values);
    // } else if (fprops.initialValues.clientContacts && toggle && name === 'Edit') {
    //   toggle();
    //   const contactIndex = fprops.initialValues.clientContacts.findIndex(
    //       (contact: any) => contact.id === values.id
    //   );
    //   fprops.initialValues.clientContacts[contactIndex] = values;
    // }
  }

  const addUserSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email(),
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    role: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const renderForm = (formikprops: FormikBag) => (
    <form onSubmit={formikprops.handleSubmit} className={'form'}>
      <div className=" ">
        <div className="no-borders">
          <div className="form-group row">
            <div className="col-sm-6">
              <label className="col-sm-10 col-form-label font-bold">First Name</label>
              <div className="col-sm-10">
                <Input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  tag={Field}
                  invalid={!!(formikprops.touched.firstName && formikprops.errors.firstName)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.firstName}</FormFeedback>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-10 col-form-label font-bold">Last Name</label>
              <div className="col-sm-10">
                <Input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  tag={Field}
                  invalid={!!(formikprops.touched.lastName && formikprops.errors.lastName)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.lastName}</FormFeedback>
              </div>
            </div>
          </div>
          <div className="hr-line-dashed" />
          <div className="form-group row">
            <div className="col-sm-6">
              <label className="col-sm-10 col-form-label font-bold">Email</label>
              <div className="col-sm-10">
                <Input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  tag={Field}
                  invalid={!!(formikprops.touched.email && formikprops.errors.email)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.email}</FormFeedback>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-10 col-form-label font-bold">Role</label>
              <div className="col-sm-10">
                <Input
                  type="text"
                  name="role"
                  className="form-control"
                  placeholder="Role"
                  tag={Field}
                  invalid={!!(formikprops.touched.role && formikprops.errors.role)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.role}</FormFeedback>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PageBody>
        <div className="row m-b-25">
          <StyledButton type="button" size="lg">
            Cancel
          </StyledButton>
          <StyledButton type="submit" color="primary" size="lg">
            Save
          </StyledButton>
          {name === 'add' && (
            <StyledButton type="button" color="primary" size="lg">
              Save &amp; Add More
            </StyledButton>
          )}
        </div>
      </PageBody>
    </form>
  );

  return (
    <Modal isOpen={visible} toggle={toggle} style={styles.modal_width}>
      <ModalHeader toggle={toggle}>{name} User</ModalHeader>
      <Formik
        enableReinitialize={true}
        initialValues={FormValues}
        validationSchema={addUserSchema}
        onSubmit={submitForm}
      >
        {formikprops => renderForm(formikprops)}
      </Formik>
    </Modal>
  );
};

AddUser.defaultProps = {
  visible: false,
};

export default AddUser;
