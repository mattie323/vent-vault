import React from "react";
import { Typography, Container, Box, Button, Paper, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: theme.spacing(6) }}>
      <Paper sx={{ height: theme.custom.paperSize.sm }}>
        <Container maxWidth="md" sx={{ marginTop: theme.spacing(2) }}>
          <Box sx={{ py: theme.spacing(5) }}> 
            <Typography variant="h4">Profile</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">
              First Name:
            </Typography>
            <Typography variant="h6">
              Last Name:
            </Typography>
            <Typography variant="h6">
              Email:
            </Typography>
          </Box>
          <Box mt={2} >
            <Button variant="contained" color="primary">
              Edit Profile
            </Button>
            <Button onClick={()=> navigate("/")} variant="contained" color="primary" sx={{  marginLeft: theme.spacing(1)  }}>
              Logout
            </Button>
          </Box>
        </Container>
      </Paper>
    </Container>
  );
};

export default UserProfilePage;
