// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import logo from '/images/image.png'
const Dashboard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [mobileopen, setMobileOpen] = useState(false);

  const handleSidebar = () => {
    setMobileOpen(!mobileopen);
  };
  return (

    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5', color: "#3f3b3bff" }}>
      {/* Sidebar */}
      <Sidebar
        mobileopen={mobileopen}
        handleSidebar={handleSidebar}
        username={loggedInUser?.username}
      />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',

        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: '#ffffff',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Project and Task Management
          </Typography>
          <IconButton
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={handleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              display: { xs: 'none', sm: 'block' }, // hidden on mobile (xs), visible on sm+ (desktop)
              height: 40, // optional: adjust size
              ml: 2 // optional: margin-left
            }}
          />

        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            overflowY: 'auto',
            bgcolor: '#f5f5f5',
            // minHeight:'100vh'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
