import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { users } from '../utils/users';
import { Container, Card, StyledButton } from '../Styles/Login';
import { Alert, Box, Button, Paper, Snackbar, TextField, Typography } from '@mui/material';
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormdata] = useState({
        username: '',
        password: '',
    })

    const [snackbar, setSnack] = useState({
        open: false,
        message: '',
        severity: 'success',
    })

    const handleChange = (e) => {
        setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setSnack({ open: false, message: "", severity: "success" });

        const user = users.find(
            (u) => u.username === formData.username && u.password === formData.password
        )

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user))

            setSnack({
                open: true,
                message: "Login Successful 🎉",
                severity: "success",
            });
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000);
        } else {
            setSnack({
                open: true,
                message: "Invalid credentials ❌",
                severity: "error",
            });
        }

    };
    const handleCloseSnackbar = () => {
        setSnack((prev) => ({ ...prev, open: false }))
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    bgcolor: "#EF9C66",
                    px: 2
                }}
            >
                <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, width: { xs: "100%", sm: "420px" }, maxWidth: "500px", boxShadow: 3 }}>
                    <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
                        Project & Task Management
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: { xs: 1.5, sm: 2 },
                                alignItems: "center",
                            }}
                        >
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
                                    backgroundColor: "#EF9C66",
                                    "&:hover": { backgroundColor: "#ba8c6cff" },
                                    py: { xs: 1, sm: 1.2 },
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>

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
    )
}

export default Login
