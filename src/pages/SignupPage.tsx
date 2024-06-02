import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignUpFormInputs } from "../models/SignUp";
import { signUpSchema } from "../models/SignUp";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import supabase from "../lib/helper/supabaseClient";
import theme from "../theme/theme";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = async ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    try {
      const { data: user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName: firstName,
            lastName: lastName,
          },
        },
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      setAlertInfo({
        type: "success",
        message: "Successfully signed up, check your email to confirm",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000); // Navigate after showing the success message for a little while
    } catch (error) {
      setAlertInfo({
        type: "error",
        message: `Error signing up: ${error.message}`,
      });
    }
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mr: theme.custom.spacing.medium }}
      >
        Back
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: theme.custom.spacing.large,
        }}
      >
        {alertInfo && (
          <Alert severity={alertInfo.type} sx={{ width: "100%", mb: 2 }}>
            {alertInfo.message}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "justify-between",
            mt: theme.custom.spacing.medium,
            mb: theme.custom.spacing.medium,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: theme.palette.secondary.main }}
          >
            Sign Up
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: theme.custom.spacing.small }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="First Name"
            variant="outlined"
            color="primary"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ marginBottom: theme.custom.spacing.medium }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Last Name"
            variant="outlined"
            color="primary"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{ marginBottom: theme.custom.spacing.medium }}
          />
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: theme.custom.spacing.medium,
              mb: theme.custom.spacing.medium,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ width: "40%" }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
