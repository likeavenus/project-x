import { useDispatch } from 'react-redux';

import { signIn, registration } from './authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  return {
    login(auth, email, password) {
      return dispatch(signIn({ auth, email, password }));
    },
    registration(auth, email, password) {
      return dispatch(registration({ auth, email, password }));
    },
    logout() {},
  };
};
