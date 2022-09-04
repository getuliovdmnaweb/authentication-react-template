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
import { signupSchema } from "../../validation";
import { useValidation } from "../hooks";
import { ROUTES } from "../../router/routes";
import { useSignupMutation } from "../../store/auth";
import { SnackContext } from "../../providers/SnackProvider";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const initialErrorMessages = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
};

export default function SignUp() {
  const { handleOpenSnack } = useContext(SnackContext);
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const { errorMessages, handleValidation, resetErrorMessages } =
    useValidation(initialErrorMessages);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const unvalidatedUser = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const validatedUser = await signupSchema.validate(unvalidatedUser, {
        abortEarly: false,
      });
      await signup(validatedUser);
      handleOpenSnack("User Successfully signed up!", "success");
      resetErrorMessages();
      navigate(ROUTES.LOGIN);
    } catch ({ errors }) {
      handleValidation(errors);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  error={!!errorMessages.name}
                  helperText={errorMessages.name}
                  onChange={resetErrorMessages}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!errorMessages.email}
                  helperText={errorMessages.email}
                  onChange={resetErrorMessages}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errorMessages.password}
                  helperText={errorMessages.password}
                  onChange={resetErrorMessages}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={ROUTES.LOGIN} variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
