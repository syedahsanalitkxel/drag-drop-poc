import React from 'react';

import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';

interface Props {
  formikprops: FormikBag;
  children?: React.ReactNode;
}

const ClientContacts: React.FunctionComponent<Props> = ({ formikprops }) => {
  return (
    <PageBody card={true} className="m-t-15">
      <FormElement
        label="First Name"
        name="firstName"
        placeholder="Add First Name"
        formikprops={formikprops}
      />

      <FormElement
        label="Last Name"
        name="lastName"
        placeholder="Add Last Name"
        formikprops={formikprops}
      />

      <FormElement label="Email" name="email" placeholder="Add Email" formikprops={formikprops} />

      <FormElement label="Phone" name="phone" placeholder="Add Phone" formikprops={formikprops} />

      <FormElement
        label="Role"
        name="role"
        formikprops={formikprops}
        type={FormElementTypes.SELECT}
      >
        <option value="">Select Role</option>
        <option value="role1">Role 1</option>
        <option value="role2">Role 2</option>
      </FormElement>
    </PageBody>
  );
};

export default ClientContacts;
