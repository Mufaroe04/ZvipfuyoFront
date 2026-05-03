import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Props, RoleRouteProps } from '../types/types';



const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
   console.log('isAuthenticated',isAuthenticated)
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;

export const RoleProtectedRoute: React.FC<RoleRouteProps> = ({ 
  component: Component, allowedRoles, userRole, isAuthenticated, ...rest 
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }
        if (!allowedRoles.includes(userRole)) {
          return <Redirect to="/dashboard" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};