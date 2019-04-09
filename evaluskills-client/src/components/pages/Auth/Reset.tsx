import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';

import { Alert, Button, Form, Input } from 'reactstrap';

import { ErrorContext } from '../../../context';
import { ResetPasswordInterface } from '../../../interfaces/Login';

import './styles.scss';

interface Props {
  handlePasswordChange: (value: ResetPasswordInterface) => void;
}

const initialState: ResetPasswordInterface = {
  password: '',
  resetPassword: '',
};

const Reset: React.FunctionComponent<Props> = ({ handlePasswordChange }) => {
  const [formState, setFormState] = useState(initialState);
  const errorContext = useContext(ErrorContext);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handlePasswordChange(formState);
  }

  function renderError() {
    if (errorContext.error.fail) {
      return <Alert color="danger">{errorContext.error.message}</Alert>;
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
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
};

export default Reset;
