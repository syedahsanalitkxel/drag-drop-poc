import React from 'react';

import classNames from 'classnames';
import { Field } from 'formik';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import FormikBag from '../../../interfaces/FormikBag';
import styles from './FormElement.module.scss';

export enum FormElementTypes {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXT = 'text',
  TEXT_AREA = 'text-area',
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
  inline?: boolean;
  fullLength?: boolean;
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
  inline,
  fullLength,
}) => {
  function getValidation() {
    if (noValidate) {
      return;
    }
    if (validation === undefined) {
      return !!(formikprops.touched[name] && formikprops.errors[name]);
    }
    return validation;
  }

  function getInputByType() {
    // TODO: Integrate NoValidate with every type
    // TODO: Fix select validation color
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

      case FormElementTypes.TEXT_AREA:
        return (
          <Input
            type="textarea"
            name={name}
            placeholder={placeholder}
            id={name}
            invalid={getValidation()}
          />
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
      return <FormFeedback>{formikprops.errors[name]}</FormFeedback>;
    }
  }

  function getInputContainer() {
    if (inline) {
      return (
        <React.Fragment>
          {getInputByType()}
          {getValidationFeedback()}
        </React.Fragment>
      );
    }

    return (
      <div className={classNames({ 'col-md-3': !inline && !fullLength, 'col-md-10': fullLength })}>
        {getInputByType()}
        {getValidationFeedback()}
      </div>
    );
  }

  return (
    <React.Fragment>
      <FormGroup className={classNames({ row: !inline })}>
        <Label
          for={name}
          className={classNames({ 'col-md-2 col-form-label': !inline }, 'font-bold')}
        >
          {label}
        </Label>
        {getInputContainer()}
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
