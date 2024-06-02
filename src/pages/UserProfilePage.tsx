import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Paper,
  useTheme,
  Theme,
  Alert,
} from "@mui/material";

import { useUserStore } from "../services/user/useUserStore";
import useUserAuthService from "../services/user/useUserAuthService";
import useUserProfile from "../services/user/useUserProfile";
import { updateUserProfile } from "../services/user/ventUsers";
import { ventUserInputs } from "../models/ventUser";
import { useNavigate } from "react-router-dom";

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const theme: Theme = useTheme();
  const { logOut } = useUserAuthService();
  const { userProfile } = useUserProfile(user?.id);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ventUserInputs>({
    firstName: userProfile?.firstName ?? "",
    lastName: userProfile?.lastName ?? "",
    email: userProfile?.email ?? "",
  });

  useEffect(() => {
    // Set the edited profile whenever the userProfile changes
    setEditedProfile({
      firstName: userProfile?.firstName ?? "",
      lastName: userProfile?.lastName ?? "",
      email: userProfile?.email ?? "",
    });
  }, [userProfile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateProfile = async () => {
    try {
      // Call the updateUserProfile function to update the profile
      await updateUserProfile(user?.id, editedProfile);

      // If the update is successful, provide feedback to the user
      setFeedbackMessage("Profile updated successfully!");
    } catch (error) {
      // If there's an error during the update, handle it gracefully
      console.error("Failed to update profile:", error);
      // Display an error message to the user
      setFeedbackMessage(
        "An error occurred while updating the profile. Please try again later.",
      );
    }

    // Delay the redirection by 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: theme.spacing(6) }}>
      <Paper sx={{ height: theme.custom.paperSize.sm }}>
        <Container maxWidth="md" sx={{ marginTop: theme.spacing(2) }}>
          <Box sx={{ py: theme.spacing(5) }}>
            <Typography variant="h4">Profile</Typography>
          </Box>
          <Box mt={2}>
            {!isEditing ? (
              <>
                <Typography variant="h6">
                  First Name: {userProfile?.firstName ?? "Not provided"}
                </Typography>
                <Typography variant="h6">
                  Last Name: {userProfile?.lastName ?? "Not provided"}
                </Typography>
                <Typography variant="h6">
                  Email: {userProfile?.email ?? "Not provided"}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    onClick={handleEditClick}
                    variant="contained"
                    color="secondary"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    onClick={logOut}
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: theme.spacing(1) }}
                  >
                    Logout
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {feedbackMessage && (
                    <Alert
                      severity={
                        feedbackMessage.includes("successfully")
                          ? "success"
                          : "error"
                      }
                    >
                      {feedbackMessage}
                    </Alert>
                  )}
                  <TextField
                    label="First Name"
                    value={editedProfile?.firstName ?? ""}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Last Name"
                    value={editedProfile?.lastName ?? ""}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        lastName: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Email"
                    value={editedProfile?.email ?? ""}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        email: e.target.value,
                      })
                    }
                    disabled
                  />
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      onClick={handleCancelEdit}
                      variant="contained"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdateProfile}
                      variant="contained"
                      color="secondary"
                      sx={{ marginLeft: theme.spacing(1) }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Paper>
    </Container>
  );
};

export default UserProfilePage;
