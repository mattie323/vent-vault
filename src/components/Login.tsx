import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Container,
  Box,
  Divider,
  Alert,
} from "@mui/material";

import supabase from "../lib/helper/supabaseClient";
import theme from "../theme/theme";
import { useNavigate } from "react-router-dom";
import type { LoginFormInputs } from "../models/Login";
import { loginSchema } from "../models/Login";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({
    email,
    password,
  }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      if (error.message.includes("invalid login credentials")) {
        // Display error alert for invalid credentials
        setAlert({
          show: true,
          message: "Invalid login credentials.",
          severity: "error",
        });
      } else if (
        error.message.includes("No existing user with this email address")
      ) {
        // Display error alert for unauthenticated email
        setAlert({
          show: true,
          message: "No existing user with this email address.",
          severity: "error",
        });
      } else {
        // Display generic error alert
        setAlert({ show: true, message: error.message, severity: "error" });
      }
    } else {
      console.log("Successfully logged in!");
      navigate("/landing-page");
      setAlert({
        show: true,
        message: "Successfully logged in!",
        severity: "success",
      });
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
    console.log("Navigate to Sign Up");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: theme.custom.backgroundColor.default,
        padding: theme.custom.spacing.medium,
        borderRadius: theme.custom.borderRadius.medium,
        marginTop: theme.custom.spacing.large,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: theme.custom.spacing.large,
        }}
      >
        {alert.show && (
          <Alert severity={alert.severity} sx={{ width: "100%", mb: 2 }}>
            {alert.message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            variant="outlined"
            color="primary"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ marginBottom: theme.custom.spacing.medium }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            color="primary"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ marginBottom: theme.custom.spacing.medium }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              fullWidth
              color="primary"
              sx={{ mt: 1, mb: 5, width: "250px", alignItems: "center" }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
