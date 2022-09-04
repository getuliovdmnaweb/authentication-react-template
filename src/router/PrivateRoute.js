import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SnackContext } from "../providers/SnackProvider";
import { ROUTES } from "./routes";

const PrivateRoute = ({ children }) => {
  const { handleOpenSnack } = useContext(SnackContext);
  const token = useSelector((state) => state?.auth?.token);

  if (!token) {
    handleOpenSnack("You must be logged in to proceed!", "warning");
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return children;
};

export default PrivateRoute;
