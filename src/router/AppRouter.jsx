import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Home from "../pages/Home";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
        <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About/>} />
          <Route path="register" element={<Register />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
