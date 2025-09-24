// src/pages/Employee.jsx
import React from "react";
import { users } from "../utils/users";
import {
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";

const Employee = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
      >
        Employees
      </Typography>

      <Grid container spacing={3}>
        {users
          .filter((u) => u.role === "employee")
          .map((emp) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={emp.id}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: 4,
                  "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
                }}
              >
                <Avatar
                  src={emp.img}
                  alt={emp.username}
                  sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                />
                <Typography variant="h6" fontWeight="600">
                  {emp.username}
                </Typography>
                <Chip
                  label={emp.role}
                  color="secondary"
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Employee;
