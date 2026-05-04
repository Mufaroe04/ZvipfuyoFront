import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { UserRole } from '../types/types';

// Add the props we expect for authentication and role checking
export interface RoleRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  allowedRoles: UserRole[];
  userRole: UserRole | null | undefined;
  isAuthenticated: boolean;
}

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

        // 2. Wait for user profile/role state to fully load
        if (!userRole) {
          return <div>Loading...</div>; // Or your LoadingSpinner
        }

        // 3. If unauthorized, go to dashboard
        if (!allowedRoles.includes(userRole)) {
          return <Redirect to="/dashboard" />;
        }

        // 4. Authorized: Pass route props AND userRole directly to the component
        return <Component {...props} userRole={userRole} />;
      }}
    />
  );
};