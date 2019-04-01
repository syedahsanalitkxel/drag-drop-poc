import React from 'react';
import ErrorContextInterface from '../interfaces/ErrorContext';
import ErrorObjectInterface from '../interfaces/ErrorObject';
import ModalContextInterface from '../interfaces/ModalContext';

// Modal Context
export const ModalContext = React.createContext<ModalContextInterface>({
  setModalState: (formState: any) => {
    alert();
  },
});
export const ModalContextProvider = ModalContext.Provider;
export const ModalContextConsumer = ModalContext.Consumer;

// Error Context
const defaultErrorContextState: ErrorContextInterface = {
  error: {
    fail: false,
    message: '',
    statusCode: '',
  },
  setError: (error: ErrorObjectInterface) => {
    alert(error);
  },
};
export const ErrorContext = React.createContext<ErrorContextInterface>(defaultErrorContextState);
export const ErrorContextProvider = ErrorContext.Provider;
export const ErrorContextConsumer = ErrorContext.Consumer;
