import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwt from "jwt-decode";

import { SnackContext } from "../providers/SnackProvider";
import { ROUTES } from "./routes";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { handleOpenSnack } = useContext(SnackContext);

  const { token, role } = useSelector((state) => state.user);

  if (!token) {
    handleOpenSnack("You must be logged in to proceed!", "warning");
    return <Navigate to={ROUTES.LOGIN} />;
  }

  const { exp: expireDate } = jwt(token);

  if (Date.now() >= expireDate * 1000) {
    handleOpenSnack("Your access has expired. Please login again!", "warning");
    return <Navigate to={ROUTES.LOGIN} />;
  }

  if (!allowedRoles.includes(role)) {
    handleOpenSnack("User is not authorized to access this page!", "error");
    return <Navigate to={ROUTES.HOME} />;
  }

  return children;
};

export default PrivateRoute;
