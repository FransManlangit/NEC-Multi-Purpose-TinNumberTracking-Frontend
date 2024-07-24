import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, isemployee = false }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }

    if (isemployee === true && user.role !== "employee") {
      return <Navigate to="/" />;
    }

    return children;
  }

  return "<Loader />";
};

export default ProtectedRoute;