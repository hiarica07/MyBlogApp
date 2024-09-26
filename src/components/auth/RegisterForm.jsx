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
    .matches(/\d+/, "Digit karakter içermelidir!")
    .matches(/[a-z]/, "Küçük harf içermelidir!")
    .matches(/[A-Z]/, "Büyük harf içermelidir!")
    .matches(/[@$?!%&*]+/, "Özel karakter içermelidir(@$?!%&*)")
});

const RegisterForm = ({
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
            name="username" //formik name attributedından eşleştirme yapıyor.
            label="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur} // kullanıcının input alanından ayrıldığını yaklayan event
            helperText={touched.username && errors.username} //validationda verdiğimiz kalıba uymazsa ilgili mesajları göstermesi için errors dan gelen mesajı yakalıyoruz.
            error={touched.username && Boolean(errors.username)} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için error attribute ı benden false/true degeri bekliyor ondan dolayı daha sağlıklı olması için boolean deger döndürüyoruz.
            // touched da kullanıcının inputa tıklayıp tıklamadığını yakalıyor
            required
          />
          <TextField
            label="First Name"
            name="firstName"
            type="text"
            variant="outlined"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.firstName && errors.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            type="text"
            variant="outlined"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.lastName && errors.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            required
          />
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
            label="Image"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.image && errors.image}
            error={touched.image && Boolean(errors.image)}
          />
           <TextField
            label="Bio"
            name="bio"
            id="bio"
            type="img"
            variant="outlined"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.bio && errors.bio}
            error={touched.bio && Boolean(errors.bio)}
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
            {isSubmitting ? "Loading..." : "Sign Up"}
          </Button>
        </Box>
      </Form>
    </div>
  )
}


export default RegisterForm