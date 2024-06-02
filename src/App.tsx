import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme.ts";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import UserHome from "./pages/UserHome.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import SignUpPage from "./pages/SignupPage.tsx";
import CreateVentPage from "./pages/CreateVentPage.tsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Home page */}
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Logged in routes */}
        <Route path="/landing-page" element={<MainLayout />}>
          <Route index element={<UserHome />} />
          <Route path="user-profile" element={<UserProfilePage />} />
          <Route path="create-vent" element={<CreateVentPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
