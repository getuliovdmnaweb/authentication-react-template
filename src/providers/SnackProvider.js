import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";

const defaultValue = {
  handleOpenSnack: () => {},
};

export const SnackContext = createContext(defaultValue);

const SnackProvider = ({ children }) => {
  const [snackSeverity, setSnackSeverity] = useState("info");
  const [snackMessage, setSnackMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const handleOpenSnack = (message, severity) => {
    setOpenSnack(true);
    setSnackMessage(message);
    setSnackSeverity(severity);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
    resetSnack();
  };

  const resetSnack = () => {
    setSnackMessage("");
    setSnackSeverity("info");
  };

  return (
    <SnackContext.Provider value={{ handleOpenSnack }}>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      {children}
    </SnackContext.Provider>
  );
};

export default SnackProvider;
