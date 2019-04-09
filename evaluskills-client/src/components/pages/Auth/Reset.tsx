import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';

import { Alert, Button, Form, Input } from 'reactstrap';

import { ErrorContext } from '../../../context';
import { ResetPasswordInterface } from '../../../interfaces/Login';

import './styles.scss';

interface Props {
  email?: string;
  token?: string;
  handlePasswordChange: (value: ResetPasswordInterface) => void;
  sendPasswordResetEmail: (email: string) => void;
}

const Reset: React.FunctionComponent<Props> = ({
  email,
  token,
  handlePasswordChange,
  sendPasswordResetEmail,
}) => {
  const initialState: ResetPasswordInterface = {
    email,
    password: '',
    resetPassword: '',
    token,
  };
  const [formState, setFormState] = useState(initialState);
  const errorContext = useContext(ErrorContext);
  const [userEmail, setUserEmail] = useState('');

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handlePasswordChange(formState);
  }

  function getPasswordLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendPasswordResetEmail(userEmail);
  }

  function renderError() {
    if (errorContext.error.fail) {
      if (errorContext.error.data && Object.keys(errorContext.error.data).length) {
        return Object.keys(errorContext.error.data).map((errorKey, key) => (
          <Alert key={key} color="danger">
            {errorContext.error.data[errorKey][0]}
          </Alert>
        ));
      }
      return <Alert color="danger">{errorContext.error.message}</Alert>;
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'email') {
      setUserEmail(event.target.value);
    } else {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value,
      });
    }
  }

  function checkDisabled() {
    return (
      !formState.password ||
      !formState.resetPassword ||
      formState.password !== formState.resetPassword
    );
  }

  function renderPasswordChangeNotification() {
    if (
      formState.password &&
      formState.resetPassword &&
      formState.password !== formState.resetPassword
    ) {
      return <div className="password-notification mb-4">* Both fields should match</div>;
    }
  }

  if (email && token) {
    return (
      <Form className="form w-100 pl-22" onSubmit={submitForm}>
        {renderError()}
        <h1 className="font-bold mb-4 mt-0">Reset Password</h1>
        <div className="input-holder mb-4">
          <Input
            type="password"
            name="password"
            value={formState.password}
            className="form-control border-left-0 border-right-0 border-top-0 bg-transparent p-10"
            placeholder="Type new password"
            onChange={handleChange}
          />
        </div>
        <div className="input-holder mb-4">
          <Input
            type="password"
            name="resetPassword"
            value={formState.resetPassword}
            className="form-control border-left-0 border-right-0 border-top-0 bg-transparent p-10"
            placeholder="Re-type new password"
            onChange={handleChange}
          />
        </div>
        {renderPasswordChangeNotification()}
        <Button
          disabled={checkDisabled()}
          color="success"
          size="lg"
          type="submit"
          className="btn-rounded font-size-18 pl-5 pr-5"
        >
          Submit
        </Button>
      </Form>
    );
  }

  return (
    <Form className="form w-100 pl-22" onSubmit={getPasswordLink}>
      <h1 className="font-bold mb-4 mt-0">Reset Password</h1>
      {renderError()}
      <div className="input-holder mb-4">
        <Input
          type="email"
          name="email"
          value={userEmail}
          className="form-control border-left-0 border-right-0 border-top-0 bg-transparent p-10"
          placeholder="Email to receive password link"
          onChange={handleChange}
        />
      </div>
      <Button
        disabled={!userEmail}
        color="success"
        size="lg"
        type="submit"
        className="btn-rounded font-size-18 pl-5 pr-5"
      >
        Submit
      </Button>
    </Form>
  );
};

export default Reset;
