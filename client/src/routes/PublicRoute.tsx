import React from "react";
import { useAuth } from "../lib/context/AuthContext";
import { TailSpin } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Getting all context variables
  const { user, isLoading, serverError } = useAuth();
  const location = useLocation();

  // If the data is loading
  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TailSpin width="100px" height="100px" />
      </div>
    );
  }

  // User is authenticated
  if (user) {
    <Navigate to='/' state={{ from: location }} replace />
  }

  // If any error occurs during data fetching
  if (serverError) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span className="error">{serverError}</span>
      </div>
    );
  }

  // User is not authenticated
  return <>{children}</>;
};

export default PublicRoute;
