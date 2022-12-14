import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useValidation } from "../hooks";
import { loginSchema } from "../../validation";
import { ROUTES } from "../../router/routes";
import { useLoginMutation } from "../../store/auth";
import { SnackContext } from "../../providers/SnackProvider";

import { useNavigate } from "react-router-dom";

const initialErrorMessages = {
  email: "",
  password: "",
};

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const { handleOpenSnack } = useContext(SnackContext);
  const [login] = useLoginMutation();
  const { errorMessages, handleValidation, resetErrorMessages } =
    useValidation(initialErrorMessages);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const unvalidatedUser = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const validatedUser = await loginSchema.validate(unvalidatedUser, {
        abortEarly: false,
      });
      resetErrorMessages();

      const response = await login(validatedUser).unwrap();
      handleOpenSnack(response.message, "success");
      navigate(ROUTES.HOME);
    } catch (error) {
      if (error.status === 400) {
        handleOpenSnack(error.data.message, "error");
      } else if (error.errors) {
        handleValidation(error.errors);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errorMessages.email}
              error={!!errorMessages.email}
              onChange={resetErrorMessages}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errorMessages.password}
              error={!!errorMessages.password}
              onChange={resetErrorMessages}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href={ROUTES.SIGNUP} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
