// src/pages/Employee.jsx
import React from "react";
import { users } from "../utils/users";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";

const Employee = () => {
  const employees = users.filter((u) => u.role === "employee");

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          textAlign: "center",
          color: "#1A202C",
        }}
      >
        Employees
      </Typography>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflowX: "auto",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#1976d2", }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600,color:"white" }}>Avatar</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white" }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow
                    key={emp.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>
                      <Avatar
                        src={emp.img}
                        alt={emp.username}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {emp.username}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={emp.role}
                        color="secondary"
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell>{emp.email || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Employee;
