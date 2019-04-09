import { Field, Formik } from 'formik';
import React from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ContactInterface } from '../../../interfaces/Client';
import { styles } from '../../pages/AddUser/style';
import clientContactSchema from './clientContactSchema';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import styled from 'styled-components';

interface Props {
  index?: number;
  fprops: FormikBag;
  children?: React.ReactNode;
  visible?: boolean;
  name?: string;
  toggle?: () => void;
  formValues?: any;
}

const StyledButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const AddClientContact: React.FunctionComponent<Props> = ({
  visible,
  toggle,
  index,
  fprops,
  formValues,
  name,
}) => {
  const maxNumber = (value: any) => {
    return value.length > 0 ? Math.max(...value) : 0;
  };

  function submitForm(values: ContactInterface) {
    if (fprops.initialValues.contact && toggle && name === 'Add' && values.id < 0) {
      toggle();
      const id =
        maxNumber(fprops.initialValues.contact.map((contact: ContactInterface) => contact.id)) + 1;
      values.id = id;
      fprops.initialValues.contact.push(values);
    } else if (fprops.initialValues.contact && toggle && name === 'Edit' && values.id > 0) {
      toggle();
      const contactIndex = fprops.initialValues.contact.findIndex(
        (contact: any) => contact.id === values.id
      );
      fprops.initialValues.contact[contactIndex] = values;
    }
  }

  const renderForm = (formikprops: any) => (
    <form onSubmit={formikprops.handleSubmit} className={'form'}>
      <div className="row">
        <div className="col-md-6">
          <FormElement
            label="First Name"
            name="firstName"
            placeholder="Add First Name"
            formikprops={formikprops}
            inline={true}
          />
        </div>
        <div className="col-md-6">
          <FormElement
            label="Last Name"
            name="lastName"
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
            name="email"
            placeholder="Add Email"
            formikprops={formikprops}
            inline={true}
          />
        </div>
        <div className="col-md-6">
          <FormElement
            label="Phone"
            name="phone"
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
            name="role"
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

      <PageBody>
        <div className="row m-b-2">
          <StyledButton type="button" size="lg">
            Cancel
          </StyledButton>
          <StyledButton type="submit" color="primary" size="lg">
            Save
          </StyledButton>
        </div>
      </PageBody>
    </form>
  );

  return (
    <Modal isOpen={visible} toggle={toggle} style={styles.modal_width}>
      <ModalHeader toggle={toggle}>{name} Contact</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={formValues}
          validationSchema={clientContactSchema}
          onSubmit={submitForm}
        >
          {formikprops => renderForm(formikprops)}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

AddClientContact.defaultProps = {
  visible: false,
};

export default AddClientContact;
