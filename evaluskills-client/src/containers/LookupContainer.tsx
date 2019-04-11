import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../components/atoms/Spinner';
import ErrorContext from '../context/ErrorContext';
import { LookupContextProvider } from '../context/LookupContext';
import { lookupInitialState, LookupItemInterface } from '../interfaces/Lookup';
import { getLookups } from '../services/lookupService';

const LookupContainer: React.FunctionComponent = ({ children }) => {
  const [lookupState, setLookupState] = useState({ lookups: lookupInitialState, loading: true });

  const errorContext = useContext(ErrorContext);

  useEffect(() => {
    fetchLookups();
  }, []);

  const findByValue = (id: number, key: string) => {
    console.log('find', id, key, lookupInitialState);
  };

  const findKey = (key: string) => {
    return lookupState.lookups[key];
  };

  const fetchLookups = async () => {
    try {
      const newLookups = await getLookups();
      setLookupState({ ...lookupState, lookups: newLookups, loading: false });
    } catch (e) {
      setLookupState({ ...lookupState, loading: false });
      errorContext.setError(e, true);
    }
  };

  if (lookupState.loading) {
    return <Spinner />;
  }

  return (
    <LookupContextProvider value={{ findByValue, findKey, lookups: lookupState.lookups }}>
      {children}
    </LookupContextProvider>
  );
};

export default LookupContainer;
