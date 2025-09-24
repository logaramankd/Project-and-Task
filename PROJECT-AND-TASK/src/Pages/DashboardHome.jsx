import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const DashboardHome = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h6">Projects</Typography>
                    <Typography variant="h4">2</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h6">Tasks</Typography>
                    <Typography variant="h4">6</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h6">Employees</Typography>
                    <Typography variant="h4">5</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;
