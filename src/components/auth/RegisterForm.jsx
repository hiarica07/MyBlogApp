import { Box, Button, TextField } from '@mui/material';
import { Form } from 'formik';
import React from 'react'
import * as Yup from "yup"

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Bu alan zorunludur!")
    .min(3, "Username en az 3 karakter olmalıdır!"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required()
    .min(8)
    .matches(/\d+/, "En az bir rakam içermelidir!")
    .matches(/[a-z]/, "En az bir küçük harf içermelidir!")
    .matches(/[A-Z]/, "En az bir büyük harf içermelidir!")
    .matches(
      /[@$%&?!*]+/,
      "(@$%&?!*) özel karakterlerinden en az bir tanesini içermelidir!"
    ),
});

const RegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  // handleSubmit,
  isSubmitting,
  /* and other goodies */
}) => {
  return (
    <div>
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
            name="username"
            label="Username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            required
          />
          <TextField
            id="firstName"
            name="firstName"
            label="FirstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            required
          />
          <TextField
            id="lastName"
            name="lastName"
            label="LastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            required
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            required
          />
          <TextField
            id="image"
            name="image"
            label="Image"
            type="url"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.image && Boolean(errors.image)}
            helperText={touched.image && errors.image}
          />
          <TextField
            id="bio"
            name="bio"
            label="Bio"
            type="text"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.bio && Boolean(errors.bio)}
            helperText={touched.bio && errors.bio}
          />
          <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            required
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Sign Up"}
          </Button>
        </Box>
      </Form>
    </div>
  )
}

export default RegisterForm