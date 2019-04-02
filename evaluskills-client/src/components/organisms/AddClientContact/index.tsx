import { Field, Formik } from 'formik';
import React from 'react';
import { FormFeedback, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { styles } from '../../pages/AddUser/style';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import { ModalContextProvider } from '../../../context';

interface Props {
  index?: number;
  formikprops: FormikBag;
  children?: React.ReactNode;
  visible?: boolean;
  toggle?: () => void;
}
export const AddClientContact: React.FunctionComponent<Props> = ({
  visible,
  toggle,
  index,
  formikprops,
}) => {
  function getContactField(key: string) {
    if (formikprops.touched.contact) {
      console.log(formikprops.touched.contact);
    }
    if (index !== undefined) {
      return `contact[${index}].${key}`;
    }
    return key;
  }

  return (
    <Modal isOpen={visible} toggle={toggle} style={styles.modal_width}>
      <ModalHeader toggle={toggle}>Add Contact</ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-md-6">
            <FormElement
              label="First Name"
              name={getContactField('firstName')}
              placeholder="Add First Name"
              formikprops={formikprops}
              nested={true}
              inline={true}
            />
          </div>
          <div className="col-md-6">
            <FormElement
              label="Last Name"
              name={getContactField('lastName')}
              placeholder="Add Last Name"
              formikprops={formikprops}
              inline={true}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormElement
              label="Email"
              name={getContactField('email')}
              placeholder="Add Email"
              formikprops={formikprops}
              inline={true}
            />
          </div>
          <div className="col-md-6">
            <FormElement
              label="Phone"
              name={getContactField('phone')}
              placeholder="Add Phone"
              formikprops={formikprops}
              inline={true}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormElement
              label="Role"
              name={getContactField('role')}
              formikprops={formikprops}
              type={FormElementTypes.SELECT}
              inline={true}
              last={true}
            >
              <option value="">Select Role</option>
              <option value="role1">Role 1</option>
              <option value="role2">Role 2</option>
            </FormElement>
          </div>
        </div>
      </ModalBody>
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
        </div>
      </ModalFooter>
    </Modal>
  );
};

AddClientContact.defaultProps = {
  visible: false,
};

export default AddClientContact;
