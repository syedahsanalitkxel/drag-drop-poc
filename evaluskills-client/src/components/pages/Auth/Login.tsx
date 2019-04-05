import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'reactstrap';

import FormikBag from '../../../interfaces/FormikBag';
import LoginInterface from '../../../interfaces/Login';

interface Props {
  handleLogin: (loginDetails: LoginInterface) => void;
}

const Login: React.FunctionComponent<Props> = ({ handleLogin }) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  function submitForm(values: LoginInterface) {
    setLoginForm({ ...loginForm, ...values });
    handleLogin(values);
  }

  function toggleVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  function renderForm(formikprops: FormikBag) {
    return (
      <Form className="form w-100 pl-22" onSubmit={formikprops.handleSubmit}>
        <h1 className="font-bold mb-4 mt-0">Sign In</h1>
        <div className="input-holder mb-4">
          <Field
            type="email"
            name="email"
            className="form-control border-left-0 border-right-0 border-top-0 bg-transparent p-10"
            placeholder="Email"
          />
        </div>
        <div className="input-holder mb-2">
          <Field
            type={!passwordVisibility ? 'password' : 'text'}
            name="password"
            className="form-control border-left-0 border-right-0 border-top-0 bg-transparent p-10"
            placeholder="Password"
          />
          <span className="visibility" onClick={toggleVisibility}>
            {!passwordVisibility && <FontAwesomeIcon icon="eye" />}
            {passwordVisibility && <FontAwesomeIcon icon="eye-slash" />}
          </span>
        </div>
        <div className="input-holder mb-5">
          <NavLink className="forget-password d-inline-block clr-inherit" to="/reset-password">
            Forgot password?
          </NavLink>
        </div>
        <Button
          color="success"
          size="lg"
          type="submit"
          className="btn-rounded font-size-18 pl-5 pr-5"
        >
          Sign In
        </Button>
      </Form>
    );
  }

  return (
    <Formik initialValues={loginForm} onSubmit={submitForm}>
      {(formikprops: FormikBag) => renderForm(formikprops)}
    </Formik>
  );
};

export default Login;
