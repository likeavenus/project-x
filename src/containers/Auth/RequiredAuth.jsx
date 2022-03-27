import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './useAuth';

export const RequiredAuth = ({ children }) => {
    const { accessToken } = useAuth();
    // console.log('required accessToken: ', accessToken)
    return accessToken
      ? children 
      : <Navigate to="/auth" replace />;
  }