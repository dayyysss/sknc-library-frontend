// PrivateRoute.jsx

import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const privateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default privateRoute;
