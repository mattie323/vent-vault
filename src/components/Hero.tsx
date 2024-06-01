import React from "react";
import { Container, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "start" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Vent Vault: Express Yourself Freely
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        Express your thoughts, feelings, and experiences.
      </Typography>
    </Container>
  );
};
export default Hero;
