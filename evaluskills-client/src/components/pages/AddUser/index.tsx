import { Field, Formik } from 'formik';
import React from 'react';
import { FormFeedback, Input, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { styles } from './style';

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface ModalProps {
  visible?: boolean;
  toggle: () => void;
}

export const AddUser: React.FunctionComponent<ModalProps> = ({ visible, toggle }) => {
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

  const renderForm = (formikprops: any) => (
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

      <ModalFooter>
        <div className="m-t-15 m-b-15">
          <button type="button" style={styles.btn} className="btn btn-default btn-lg">
            Cancel
          </button>
          <button
            type="button"
            style={styles.btn}
            id={'submit'}
            name="submit"
            className="btn btn-primary btn-lg"
          >
            Save
          </button>
          <button type="button" style={styles.btn} className="btn btn-primary btn-lg">
            Save &amp; Add More
          </button>
        </div>
      </ModalFooter>
    </form>
  );

  return (
    <Modal isOpen={visible} toggle={toggle} style={styles.modal_width}>
      <ModalHeader toggle={toggle}>Add User</ModalHeader>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', role: '' }}
        validationSchema={addUserSchema}
        onSubmit={() => {}}
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
