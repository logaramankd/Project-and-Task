import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
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

        {/* namma inga than render panna porom */}
        <Outlet />
      </Box>
    </Box>
  )
}

export default Dashboard
