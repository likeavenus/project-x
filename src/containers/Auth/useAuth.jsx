import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signIn, registration } from './authSlice';

const authContext = createContext();

export const useAuth = () => {
  const authState = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  return {
    authState,
    login(auth, email, password) {
      return dispatch(signIn({ auth, email, password }));
    },
    registration(auth, email, password) {
      return dispatch(registration({ auth, email, password }));
    },
    logout() {},
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
