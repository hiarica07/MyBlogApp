import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
