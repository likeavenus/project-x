import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './useAuth';

export const RequireAuth = ({ children }) => {
    const { authState } = useAuth();
    return children
    // return authState
    //   ? children 
    //   : <Navigate to="/auth" replace />;
  }