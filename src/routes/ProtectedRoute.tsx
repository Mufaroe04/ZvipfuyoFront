import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Props, RoleRouteProps } from '../types/types';

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log('isAuthenticated', isAuthenticated);

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
  component: Component, 
  allowedRoles, 
  userRole, 
  isAuthenticated, 
  ...rest 
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // 1. If not logged in, go to login
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }

        // 2. Safely check if the userRole has finished loading. 
        // Returning a fallback component instead of null prevents the router from matching the default route.
        if (!userRole) {
          return <div>Loading...</div>; 
        }

        // 3. If unauthorized, go to dashboard
        if (!allowedRoles.includes(userRole)) {
          return <Redirect to="/dashboard" />;
        }

        // 4. Authorized
        return <Component {...props} />;
      }}
    />
  );
};