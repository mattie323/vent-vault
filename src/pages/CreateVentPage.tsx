/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ventInputs } from "../models/Vent";
import { VentSchema } from "../models/Vent";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import theme from "../theme/theme";
import useVentStore from "../services/vent/useVentStore";
// import { useUserStore } from "../services/user/useUserStore";
import useUserAuthService from "../services/user/useUserAuthService";

const CreateVentPage: React.FC = () => {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ventInputs>({
    resolver: zodResolver(VentSchema),
  });
  const { user } = useUserAuthService();
  const addVent = useVentStore((state) => state.addVent);

  if (!user) {
    navigate('/')
  }
  const onSubmit: SubmitHandler<ventInputs> = async (data) => {
    try {
      // Deconstructing data object
      const { title, feeling, message } = data;

      // Add the new vent
      await addVent({
        title,
        feeling,
        message,
      });

      // Update the alertInfo state to show a success message
      setAlertInfo({ type: "success", message: "Vent created successfully!" });
      setTimeout(() => navigate("/"), 2000); // Navigate after showing the message
    } catch (error) {
      // Update the alertInfo state to show an error message
      setAlertInfo({ type: "error", message: "Failed to create vent" });
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
          alignItems: "start",
          marginTop: theme.custom.spacing.large,
        }}
      >
        {alertInfo && (
          <Alert severity={alertInfo.type} sx={{ width: "80%", mb: 2 }}>
            {alertInfo.message}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            mt: theme.custom.spacing.medium,
            mb: theme.custom.spacing.medium,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: theme.palette.secondary.main }}
          >
            Create a vent
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
            label="Title"
            variant="standard"
            color="primary"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ marginBottom: theme.custom.spacing.medium }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Feeling"
            variant="standard"
            color="primary"
            {...register("feeling")}
            error={!!errors.feeling}
            helperText={errors.feeling?.message}
            sx={{ marginBottom: theme.custom.spacing.medium }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Message"
            placeholder="Input how you feel here"
            variant="outlined"
            color="primary"
            multiline
            rows={4}
            {...register("message")}
            error={!!errors.message}
            helperText={errors.message?.message}
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
              Save Vent
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateVentPage;
