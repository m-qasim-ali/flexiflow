import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from './store';

const PrivateOnlyRoute = ({ Component }) => {
  const { isLoggedIn } = useStore();

  return isLoggedIn ? <Component /> : <Navigate to="/" replace />
  
}

export default PrivateOnlyRoute
