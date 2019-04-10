import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../components/atoms/Spinner';
import ErrorContext from '../context/ErrorContext';
import { LookupContextProvider } from '../context/LookupContext';
import { lookupInitialState } from '../interfaces/Lookup';
import { getLookups } from '../services/lookupService';

const LookupContainer: React.FunctionComponent = ({ children }) => {
  const [lookups, setLookups] = useState(lookupInitialState);
  const [loading, setLoading] = useState(true);

  const errorContext = useContext(ErrorContext);

  useEffect(() => {
    fetchLookups();
  }, []);

  const findByValue = (id: number, key: string) => {
    console.log('find', id, key, lookups);
  };

  const fetchLookups = async () => {
    try {
      const newLookups = await getLookups();
      setLookups(newLookups);
      setLoading(false);
    } catch (e) {
      errorContext.setError(e, true);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return <LookupContextProvider value={{ findByValue, lookups }}>{children}</LookupContextProvider>;
};

export default LookupContainer;
