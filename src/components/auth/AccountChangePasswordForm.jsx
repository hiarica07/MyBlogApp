"use client";

import { useState } from "react";
import { Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const PasswordSchema = () =>
  Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/\d+/, "Password must contain at least one number")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[@$?!%&*]+/,
        "Password must contain at least one special character"
      ),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

const AccountChangePasswordForm = ({
  id,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Create the end adornment with visibility toggle
  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={togglePasswordVisibility}
        edge="end"
        aria-label="toggle password visibility"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "576px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        borderBottom: 1,
        borderColor: "divider",
        pb: 4,
      }}
    >
      <Typography variant="h4" fontWeight="600">
        Password
      </Typography>

      <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
        {/* Current Password */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            Current Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            name="currentPassword"
            id="currentPassword"
            value={values.currentPassword}
            placeholder="Enter your current password"
            autoComplete="current-password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.currentPassword && Boolean(errors.currentPassword)}
            helperText={touched.currentPassword && errors.currentPassword}
            // InputProps={{ endAdornment }} // Changed version +v5
            slotProps={{
              input: {
                endAdornment: endAdornment,
              },
            }}
          />
        </Box>

        {/* New Password */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            New Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            value={values.newPassword}
            placeholder="Enter your new password"
            autoComplete="new-password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
            // InputProps={{ endAdornment }}
            slotProps={{
              input: {
                endAdornment: endAdornment,
              },
            }}
          />
        </Box>

        {/* Retype Password */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            Re-type New Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            name="retypePassword"
            id="retypePassword"
            value={values.retypePassword}
            placeholder="Re-enter your new password"
            autoComplete="new-password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.retypePassword && Boolean(errors.retypePassword)}
            helperText={touched.retypePassword && errors.retypePassword}
            // InputProps={{ endAdornment }}
            slotProps={{
              input: {
                endAdornment: endAdornment,
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{
            mt: 2,
            mb: 4,
            width: { xs: "100%", sm: "50%" },
            borderRadius: 1,
            fontWeight: 600,
          }}
        >
          {isSubmitting ? "Changing..." : "Change Password"}
        </Button>
      </Form>
    </Box>
  );
};

export default AccountChangePasswordForm;
