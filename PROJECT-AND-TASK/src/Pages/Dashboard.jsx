import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
const Dashboard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
  const [mobileopen, setMobileOpen] = useState(false);

  const handleSidebar = () => {
    setMobileOpen(!mobileopen)
  }
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        mobileopen={mobileopen}
        handleSidebar={handleSidebar}
        username={loggedInUser?.username}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Top bar (mobile menu button) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">Dashboard</Typography>
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={handleSidebar}
          >
            <MenuIcon />
          </IconButton>
        </Box>
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
      </Box>
    </Box>
  )
}

export default Dashboard
