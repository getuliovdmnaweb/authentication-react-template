import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "./routes";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state?.auth?.token);

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return children;
};

export default PrivateRoute;
