import { Box, Button, TextField } from '@mui/material';
import { Form } from 'formik';
import React from 'react'
import * as Yup from "yup"

export const loginScheme = Yup.object().shape({
 email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required()
});

const LoginForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isSubmitting,
}) => {




  return (
    <div>
      <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
            required
          />
          
          <TextField
            label="Password"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.password && errors.password}
            error={touched.password && Boolean(errors.password)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Log in"}
          </Button>
        </Box>
      </Form>
    </div>
  )
}


export default LoginForm