import { useNavigate, NavLink } from "react-router-dom";
import {
  Typography,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import theme from "../theme/theme";
import venvaultLogo from "../images/vaultimg.png";
import React from "react";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            component={NavLink}
            to="/landing-page"
            disableRipple={true}
          >
            <img
              src={venvaultLogo}
              style={{
                width: theme.custom.imageSize.width,
                height: theme.custom.imageSize.height,
              }}
              alt="vent-vault-logo"
            />

            <Typography
              variant="h6"
              component="div"
              sx={{
                marginLeft: 2,
                display: { xs: "block", md: "block" },
              }}
            >
              Vent Vault
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/landing-page")}
              variant="contained"
              color="secondary"
              sx={{ marginRight: 1 }} // Add margin to the right
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("user-profile")}
              variant="contained"
              color="secondary"
              sx={{ marginRight: 1 }} // Add margin to the right
            >
              Profile
            </Button>
            <Button
              onClick={() => navigate("create-vent")}
              variant="contained"
              color="secondary"
            >
              Add Vent
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NavBar;
