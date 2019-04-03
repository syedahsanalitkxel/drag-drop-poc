import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { Button, Form, FormGroup } from 'reactstrap';

import FormikBag from '../../../interfaces/FormikBag';
import LoginInterface from '../../../interfaces/Login';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';

interface Props {
  handleLogin: (loginDetails: LoginInterface) => void;
}

const Login: React.FunctionComponent<Props> = ({ handleLogin }) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);

  function submitForm(values: LoginInterface) {
    setLoginForm({ ...loginForm, ...values });
    handleLogin(values);
  }

  function renderForm(formikprops: FormikBag) {
    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <FormElement
          label="Email"
          name="email"
          placeholder="name@domain.com"
          inline={true}
          last={true}
          formikprops={formikprops}
        />
        <FormElement
          label="Password"
          name="password"
          inline={true}
          type={FormElementTypes.PASSWORD}
          placeholder="*******"
          last={true}
          formikprops={formikprops}
        />
        <NavLink to="/reset-password">Forgot Password?</NavLink>
        <FormGroup className="m-t-20">
          <Button type="submit" size="lg" color="primary" className="login-button m-t-20">
            Sign in
          </Button>
        </FormGroup>
      </Form>
    );
  }

  return (
    <PageBody>
      <h1 className="m-b-40">Sign In</h1>
      <Formik initialValues={loginForm} onSubmit={submitForm}>
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>
    </PageBody>
  );
};

export default Login;
