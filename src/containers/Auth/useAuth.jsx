import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signIn, registration } from './authSlice';

const authContext = createContext();

export const useAuth = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  console.log('useAuth accessToken: ', accessToken)
  return {
    accessToken,
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
