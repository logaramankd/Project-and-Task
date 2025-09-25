import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../utils/users";
import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({ username: "", password: "" });
  const [snackbar, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSnack({ open: false, message: "", severity: "success" });

    const user = users.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setSnack({
        open: true,
        message: "Login Successful 🎉",
        severity: "success",
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      setSnack({
        open: true,
        message: "Invalid credentials ❌",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "linear-gradient(135deg, #f4f7fb 0%, #e9eef5 100%)",
          px: 2,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            background: "#fff",
          }}
        >
          {/* Branding / Title */}
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#1A202C",
                fontSize: { xs: "1.4rem", sm: "1.7rem" },
              }}
            >
              Project & Task Management
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              Sign in with your credentials to continue
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 1,
                  py: 1.2,
                  fontSize: "1rem",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#125ea2" },
                }}
              >
                Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
