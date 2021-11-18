import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './useAuth';

export const RequireAuth = ({ children }) => {
    const { authState } = useAuth();
    return authState
      ? children 
      : <Navigate to="/auth" replace />;
  }