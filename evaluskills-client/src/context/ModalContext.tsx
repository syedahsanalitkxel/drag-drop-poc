import React from 'react';
import ModalContextInterface from '../interfaces/ModalContext';

// Modal Context
const ModalContext = React.createContext<ModalContextInterface>({
  setModalState: (formState: any) => {
    alert();
  },
});
export const ModalContextProvider = ModalContext.Provider;
export const ModalContextConsumer = ModalContext.Consumer;

export default ModalContext;
