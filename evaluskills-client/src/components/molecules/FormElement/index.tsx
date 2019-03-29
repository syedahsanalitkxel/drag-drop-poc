import React from 'react';

import { Field } from 'formik';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import FormikBag from '../../../interfaces/FormikBag';
import styles from './FormElement.module.scss';

export enum FormElementTypes {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXT = 'text',
  SELECT = 'select',
  IMAGE_UPLOAD = 'upload',
}

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  formikprops: FormikBag;
  last?: boolean;
  type?: FormElementTypes;
  noValidate?: boolean;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  validation?: boolean;
}

const FormElement: React.FunctionComponent<Props> = ({
  label,
  name,
  placeholder,
  last,
  type,
  noValidate,
  formikprops,
  children,
  validation,
}) => {
  function getValidation() {
    if (validation === undefined) {
      return !!(formikprops.touched[name] && formikprops.errors[name]);
    }
    return validation;
  }

  function getInputByType() {
    // TODO: Integrate NoValidate with every type
    // TODO: Fix select validation
    switch (type) {
      case FormElementTypes.IMAGE_UPLOAD:
        return (
          <React.Fragment>
            <img src="/img/Logo.svg" alt="logo" />
            <span className={styles['image-upload-label']}>Upload Photo</span>
          </React.Fragment>
        );

      case FormElementTypes.SELECT:
        return (
          <Input
            type="select"
            name={name}
            placeholder={placeholder}
            id="billing"
            tag={Field}
            component="select"
            invalid={getValidation()}
          >
            {children}
          </Input>
        );

      default:
        return (
          <Input
            name={name}
            placeholder={placeholder}
            tag={Field}
            id={name}
            invalid={getValidation()}
          />
        );
    }
  }

  function getValidationFeedback() {
    if (noValidate || type !== FormElementTypes.IMAGE_UPLOAD) {
      return <FormFeedback tooltip={true}>{formikprops.errors[name]}</FormFeedback>;
    }
  }

  return (
    <React.Fragment>
      <FormGroup className="row">
        <Label for={name} className="col-sm-2 col-form-label font-bold">
          {label}
        </Label>
        <div className="col-sm-3">
          {getInputByType()}
          {getValidationFeedback()}
        </div>
      </FormGroup>
      {!last && <div className="hr-line-dashed" />}
    </React.Fragment>
  );
};

FormElement.defaultProps = {
  type: FormElementTypes.TEXT,
  validation: undefined,
};

export default FormElement;
