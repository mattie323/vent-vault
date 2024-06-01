import React from "react";
import { Box } from "@mui/material";
import Hero from "../components/Hero";
import Login from "../components/Login";

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        padding: 2,
      }}
    >
      <Hero />
      <Login />
    </Box>
  );
};

export default HomePage;
