import React from "react";
import { Typography, Container, Box, Button, Paper, useTheme, Theme } from "@mui/material";
import { useUserStore } from "../services/user/useUserStore";
import useUserAuthService from "../services/user/useUserAuthService";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const UserProfilePage: React.FC = () => {
  const { user } = useUserStore();
  const theme: Theme = useTheme();
  const { logOut } = useUserAuthService();

  // Early return if user is null
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: theme.spacing(6) }}>
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: theme.spacing(3) }}>
          You are not logged in.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: theme.spacing(6) }}>
      <Paper sx={{ height: theme.custom.paperSize.sm }}>
        <Container maxWidth="md" sx={{ marginTop: theme.spacing(2) }}>
          <Box sx={{ py: theme.spacing(5) }}>
            <Typography variant="h4">Profile</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">
              First Name: {user.firstName ?? "Not provided"}
            </Typography>
            <Typography variant="h6">
              Last Name: {user.lastName ?? "Not provided"}
            </Typography>
            <Typography variant="h6">
              Email: {user.email ?? "Not provided"}
            </Typography>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary">
              Edit Profile
            </Button>
            <Button onClick={logOut} variant="contained" color="secondary" sx={{ marginLeft: theme.spacing(1) }}>
              Logout
            </Button>
          </Box>
        </Container>
      </Paper>
    </Container>
  );
};

export default UserProfilePage;
