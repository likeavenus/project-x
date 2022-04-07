import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const RequiredAuth = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/auth')
    }
  }, [loading, navigate, user]);
  return children;
};