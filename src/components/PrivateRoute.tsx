import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const pathname = location.pathname;
  
  if (pathname === "/" && token) {
    return <Navigate to="/dashboard" />;
  }
  if (!token && pathname !== "/") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
