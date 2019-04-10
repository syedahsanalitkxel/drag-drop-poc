import React from 'react';
import ErrorContextInterface from '../interfaces/ErrorContext';
import ErrorObjectInterface from '../interfaces/ErrorObject';

const defaultErrorContextState: ErrorContextInterface = {
  error: {
    fail: false,
    message: '',
    statusCode: '',
  },
  setError: (error: ErrorObjectInterface, show?: boolean) => {
    if (show) {
      alert(error);
    }
  },
};

const ErrorContext = React.createContext<ErrorContextInterface>(defaultErrorContextState);

export const ErrorContextProvider = ErrorContext.Provider;
export const ErrorContextConsumer = ErrorContext.Consumer;

export default ErrorContext;
