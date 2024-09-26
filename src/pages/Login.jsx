import { Avatar, Box, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import { loginScheme } from "../components/auth/LoginForm";
import { Link } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {

  const  {login} = useAuthCall()

  return (
    <Container maxWidth="lg" >
      <Grid container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography textAlign="center">Register</Typography>
          <Formik
            initialValues={{
              email: "",
              password:"",
              
            }}
            validationSchema={loginScheme}
            onSubmit={(values) => {
              login(values)
              console.log(values)
              console.log(values);
            }}
            component={(props) => <LoginForm {...props} />}
          ></Formik>
        
        <Box sx={{ textAlign: "center", mt: 2, color: "secondary.main" }}>
          <Link to="/register">Don't you have a account? Sign in</Link>
        </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
