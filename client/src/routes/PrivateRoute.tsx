import React from "react";
import { useAuth } from "../lib/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const PrivateRoute: React.FC = () => {
  // Loading context from Auth Provider
  const { user, isLoading, fatalError } = useAuth();

  // Getting the current path
  const location = useLocation();

  // If the app is getting user data then show loading
  if (isLoading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TailSpin width="100px" height="100px" />
      </div>
    );
  }

  // If the user is not authenticated
  if (!user) {
    return <Navigate to='/sign-in' state={{ from: location }} replace />
  }

  // If any error occurs while fetching the user
  if (fatalError) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span className="error">{fatalError}</span>
      </div>
    );
  }

  // User is authenticated
  return <Outlet />;
};

export default PrivateRoute;
