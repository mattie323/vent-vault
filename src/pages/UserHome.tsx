import React from "react";
import { Container, Typography, Box } from "@mui/material";
import useUserAuthService from "../services/user/useUserAuthService";

const UserHome: React.FC = () => {
  const { user, logOut } = useUserAuthService();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {user ? (
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h4" gutterBottom>
            Welcome, {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
        </Box>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </Container>
  );
};

export default UserHome;
