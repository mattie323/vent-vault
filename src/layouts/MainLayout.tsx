import NavBar from "../components/NavBar"
import { Outlet } from "react-router-dom";
import React from "react";


const MainLayout: React.FC = () => {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  )
}
export default MainLayout