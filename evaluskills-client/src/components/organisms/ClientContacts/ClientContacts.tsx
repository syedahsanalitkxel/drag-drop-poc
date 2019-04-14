import React from 'react';

import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';

import { LookupContextConsumer } from '../../../modules/Lookup/context';
import { lookups } from '../../../modules/Lookup/enum';
import { LookupContextInterface, LookupItemInterface } from '../../../modules/Lookup/interface';

interface Props {
  index?: number;
  formikprops: FormikBag;
  children?: React.ReactNode;
}

const ClientContacts: React.FunctionComponent<Props> = ({ index, formikprops }) => {
  function getContactField(key: string) {
    if (index !== undefined) {
      return `clientContacts[${index}].${key}`;
    }
    return key;
  }

  const renderUserRoleDropdown = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.userRolesLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };

  return (
    <PageBody card={true} wrapper={true} className="m-t-15">
      <div className="row">
        <div className="col-md-6">
          <FormElement
            label="First Name"
            name={getContactField('firstName')}
            placeholder="Add First Name"
            formikprops={formikprops}
            type={FormElementTypes.TEXT}
            inline={true}
          />
        </div>
        <div className="col-md-6">
          <FormElement
            label="Last Name"
            name={getContactField('lastName')}
            placeholder="Add Last Name"
            formikprops={formikprops}
            type={FormElementTypes.TEXT}
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
            type={FormElementTypes.TEXT}
            inline={true}
          />
        </div>
        <div className="col-md-6">
          <FormElement
            label="Phone"
            name={getContactField('phone')}
            placeholder="Add Phone"
            formikprops={formikprops}
            type={FormElementTypes.TEXT}
            inline={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <FormElement
            label="Role"
            name={getContactField('title')}
            formikprops={formikprops}
            type={FormElementTypes.SELECT}
            noValidate={true}
            inline={true}
            last={true}
          >
            <LookupContextConsumer>{renderUserRoleDropdown}</LookupContextConsumer>
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
