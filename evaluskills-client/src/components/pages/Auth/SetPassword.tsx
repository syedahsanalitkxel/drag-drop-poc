import React, { ChangeEvent, useContext, useState } from 'react';
import { Alert, Button, Form, Input } from 'reactstrap';
import ErrorContext from '../../../context/ErrorContext';

interface Props {
  code: string;
  userId: string;
  verifyUser: (userId: string, code: string, password: string) => void;
}

const SetPassword: React.FunctionComponent<Props> = ({ userId, code, verifyUser }) => {
  const initialState: any = {
    code: '',
    password: '',
    resetPassword: '',
    userId: '',
  };
  const [formState, setFormState] = useState(initialState);
  const errorContext = useContext(ErrorContext);

  function confirmEmail(event: any) {
    event.preventDefault();
    verifyUser(userId, encodeURIComponent(code), formState.password);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function renderPasswordChangeNotification() {
    if (formState.password && formState.resetPassword && formState.password !== formState.resetPassword) {
      return <div className="password-notification mb-4">* Both fields should match</div>;
    }
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

  function checkDisabled() {
    return !formState.password || !formState.resetPassword || formState.password !== formState.resetPassword;
  }

  return (
    <Form className="form w-100 pl-22" onSubmit={confirmEmail}>
      {renderError()}
      <h1 className="font-bold mb-4 mt-0">Set Password</h1>
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
export default SetPassword;
