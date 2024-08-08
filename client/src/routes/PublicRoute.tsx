import React from "react";
import { useAuth } from "../lib/context/AuthContext";
import { TailSpin } from "react-loader-spinner";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  // Getting all context variables
  const { user, isLoading, fatalError } = useAuth();
  const location = useLocation();

  // If the data is loading
  if (isLoading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TailSpin width="100px" height="100px" />
      </div>
    );
  }

  // User is authenticated
  if (user) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  // If any error occurs during data fetching
  if (fatalError) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span className="error">{fatalError}</span>
      </div>
    );
  }

  // User is not authenticated
  return <Outlet />;
};

export default PublicRoute;
