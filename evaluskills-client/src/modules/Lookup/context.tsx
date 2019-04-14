import React from 'react';
import { LookupContextInitialState, LookupContextInterface } from './interface';

// Lookup Context
const LookupContext = React.createContext<LookupContextInterface>(LookupContextInitialState);
export const LookupContextProvider = LookupContext.Provider;
export const LookupContextConsumer = LookupContext.Consumer;

export default LookupContext;
