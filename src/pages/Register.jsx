import { Avatar, Box, Container, Typography } from "@mui/material";
import React from "react";
import Grid from '@mui/material/Grid2';
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import RegisterForm, { SignupSchema } from "../components/auth/RegisterForm";
import { Link } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";

const Register = () => {

  const {register} = useAuthCall()

  return (
    <Container>
      <Grid 
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
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
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              image:"",
              bio: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              // console.log(values)
              register(values)
              // console.log(actions);
            }}
            component={(props) => <RegisterForm {...props} />}
          ></Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/login">Already have an account? Sign in</Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
