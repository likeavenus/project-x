import React, { createContext } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';

import { signIn } from './authSlice';

const authContext = createContext();

export const useAuth = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return {
    login(auth, email, password) {
      return dispatch(signIn({ auth, email, password }));
    },
    logout() {},
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
