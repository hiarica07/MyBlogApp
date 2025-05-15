import React from "react";
import NavBar from "../components/NavBar";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar />
        {/* Drawer */}
      </Box>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
