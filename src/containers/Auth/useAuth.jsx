import { useDispatch } from 'react-redux';

import { signIn, registration } from './authSlice';
import { getAccessToken } from '../../utils';

export const useAuth = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
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
