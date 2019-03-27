import React from 'react';
import { ErrorContextInterface } from "../interfaces/ErrorContext";
import ModalContextInterface from "../interfaces/ModalContext";

// Modal Context
export const ModalContext = React.createContext<ModalContextInterface>({
  setModalState: (formState: any) => { alert() }
});
export const ModalContextProvider = ModalContext.Provider;
export const ModalContextConsumer = ModalContext.Consumer;

// Error Context
export const ErrorContext = React.createContext<ErrorContextInterface | null>(null);
export const ErrorContextProvider = ErrorContext.Provider;
export const ErrorContextConsumer = ErrorContext.Consumer;
