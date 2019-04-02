import React from 'react';

import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';

interface Props {
  index?: number;
  formikprops: FormikBag;
  children?: React.ReactNode;
}

const ClientContacts: React.FunctionComponent<Props> = ({ index, formikprops }) => {
  function getContactField(key: string) {
    if (index !== undefined) {
      return `contact[${index}].${key}`;
    }
    return key;
  }

  return (
    <PageBody card={true} wrapper={true} className="m-t-15">
      <div className="row">
        <div className="col-md-6">
          <FormElement
            label="First Name"
            name={getContactField('firstName')}
            placeholder="Add First Name"
            formikprops={formikprops}
            noValidate={true}
            inline={true}
          />
        </div>
        <div className="col-md-6">
          <FormElement
            label="Last Name"
            name={getContactField('lastName')}
            placeholder="Add Last Name"
            formikprops={formikprops}
            noValidate={true}
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
            noValidate={true}
            inline={true}
          />
        </div>
        <div className="col-md-6">
          <FormElement
            label="Phone"
            name={getContactField('phone')}
            placeholder="Add Phone"
            formikprops={formikprops}
            noValidate={true}
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
            noValidate={true}
            inline={true}
            last={true}
          >
            <option value="">Select Role</option>
            <option value="role1">Role 1</option>
            <option value="role2">Role 2</option>
          </FormElement>
        </div>
      </div>
    </PageBody>
  );
};

ClientContacts.defaultProps = {
  index: undefined,
};

export default ClientContacts;
