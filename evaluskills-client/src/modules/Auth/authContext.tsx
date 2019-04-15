import React from 'react';
import { AuthContextInterface, defaultAuthContext } from './interface';

export const AuthContext = React.createContext<AuthContextInterface>(defaultAuthContext);
export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;
