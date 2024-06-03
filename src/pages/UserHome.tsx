/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CardContent,
  Card,
  Pagination,
} from "@mui/material";
import useUserAuthService from "../services/user/useUserAuthService";
import useVentStore from "../services/vent/useVentStore";
// import theme from "../theme/theme";

const UserHome: React.FC = () => {
  const { user } = useUserAuthService();
  const [page, setPage] = useState(1);
  const ventsPerPage = 3;

  const indexOfLastVent = page * ventsPerPage;
  const indexOfFirstVent = indexOfLastVent - ventsPerPage;

  const { fetchVents, vents } = useVentStore();

  useEffect(() => {
    if (user) {
      fetchVents(user.id);
    }
  }, [user, fetchVents]);

  const currentVents = vents.slice(indexOfFirstVent, indexOfLastVent);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
        {user ? (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h4" gutterBottom>
              {user.firstName}'s vents:
            </Typography>
          </Box>
        ) : (
          <Typography variant="h4">Loading...</Typography>
        )}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {currentVents.map((vent) => (
          <Card
            key={vent.id}
            sx={{
              width: 300,
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {vent.title}
              </Typography>
              <Typography variant="body1">Feeling: {vent.feeling}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Message: {vent.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(vents.length / ventsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
};

export default UserHome;
