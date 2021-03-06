import React, { useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { Alert, Button, Form } from 'reactstrap';
import * as Yup from 'yup';
import styled from 'styled-components';

import ErrorContext from '../../../context/ErrorContext';
import FormikBag from '../../../interfaces/FormikBag';
import LoginInterface from '../../../interfaces/Login';

interface Props {
  handleLogin: (loginDetails: LoginInterface) => void;
}

const initialState = {
  loginName: '',
  password: '',
};

const LoginSchema = Yup.object().shape({
  loginName: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const Login: React.FunctionComponent<Props> = ({ handleLogin }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const errorContext = useContext(ErrorContext);

  function submitForm(values: LoginInterface) {
    handleLogin(values);
  }

  function toggleVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  function renderError() {
    if (errorContext.error.fail) {
      return <Alert color="danger">{errorContext.error.message}</Alert>;
    }
  }

  function renderForm(formikprops: FormikBag) {
    const { errors, touched } = formikprops;
    return (
      <Form className="form w-100 pl-22" onSubmit={formikprops.handleSubmit}>
        {renderError()}
        <h1 className="font-bold mb-4 mt-0">Sign In</h1>
        <div className="input-holder mb-4">
          <Field
            type="email"
            name="loginName"
            className="form-control border-left-0 border-right-0 border-top-0 bg-transparent p-10"
            placeholder="Email"
          />
          {errors.loginName && touched.loginName ? <ErrorMessage>{errors.loginName}</ErrorMessage> : null}
        </div>
        <div className="input-holder mb-2">
          <Field
            type={!passwordVisibility ? 'password' : 'text'}
            name="password"
            className="form-control border-left-0 border-right-0 border-top-0 bg-transparent p-10"
            placeholder="Password"
          />
          {errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : null}
          <span className="visibility" onClick={toggleVisibility}>
            {!passwordVisibility && <FontAwesomeIcon icon="eye" />}
            {passwordVisibility && <FontAwesomeIcon icon="eye-slash" />}
          </span>
        </div>
        <div className="input-holder mb-5">
          <NavLink className="forget-password d-inline-block clr-inherit" to="/account/reset-password">
            Forgot password?
          </NavLink>
        </div>
        <Button
          color="success"
          size="lg"
          type="submit"
          className="btn-rounded font-size-18 pl-5 pr-5"
          disabled={(!formikprops.values.loginName && !formikprops.values.password) || Object.keys(errors).length > 0}
        >
          Sign In
        </Button>
      </Form>
    );
  }

  return (
    <Formik initialValues={initialState} validationSchema={LoginSchema} onSubmit={submitForm}>
      {(formikprops: FormikBag) => renderForm(formikprops)}
    </Formik>
  );
};

export default Login;
