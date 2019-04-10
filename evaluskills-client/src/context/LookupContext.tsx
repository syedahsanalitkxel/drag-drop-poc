import React from 'react';

// Lookup Context
const LookupContext = React.createContext({});
export const LookupContextProvider = LookupContext.Provider;
export const LookupContextConsumer = LookupContext.Consumer;

export default LookupContext;
