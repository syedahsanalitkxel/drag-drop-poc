import React from 'react';

import classNames from 'classnames';
import { ErrorMessage, Field } from 'formik';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import FormikBag from '../../../interfaces/FormikBag';
import styles from './FormElement.module.scss';

export enum FormElementTypes {
  TEXT = 'text',
  TEXT_AREA = 'text-area',
  SELECT = 'select',
  IMAGE_UPLOAD = 'upload',
  PASSWORD = 'password',
  DATE = 'date',
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

      case FormElementTypes.PASSWORD:
        return (
          <Input
            type="password"
            name={name}
            tag={Field}
            placeholder={placeholder}
            id={name}
            invalid={getValidation()}
          />
        );

      case FormElementTypes.TEXT_AREA:
        return (
          <Input
            type="textarea"
            name={name}
            tag={Field}
            placeholder={placeholder}
            id={name}
            invalid={getValidation()}
          />
        );
      case FormElementTypes.DATE:
        return (
          <Input
            type="date"
            name={name}
            tag={Field}
            placeholder={placeholder}
            id={name}
            invalid={getValidation()}
          />
        );
      case FormElementTypes.TEXT:
        return (
          <Input
            name={name}
            tag={Field}
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
    if (FormElementTypes.TEXT) {
      return (
        <ErrorMessage
          name={name}
          render={msg => {
            if (msg.toString().includes('.email')) {
              return (
                <div className="isa_error">
                  <span className="error text-danger">Must be a valid email</span>
                </div>
              );
            }
            return (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            );
          }}
        />
      );
    }
    if ((noValidate || type !== FormElementTypes.IMAGE_UPLOAD) && !FormElementTypes.TEXT) {
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
