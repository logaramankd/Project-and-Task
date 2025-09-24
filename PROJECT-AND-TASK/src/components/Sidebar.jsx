import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TaskIcon from '@mui/icons-material/Task';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({ mobileopen, handleSidebar, username }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate('/');
  };

  const menuItems = [
    { name: "Dashboard", icon: <SpaceDashboardIcon />, path: "/dashboard" },
    { name: "Projects", icon: <AccountTreeIcon />, path: "/dashboard/projects" },
    { name: "Tasks", icon: <TaskIcon />, path: "/dashboard/tasks" },
    { name: "Employees", icon: <BadgeIcon />, path: "/dashboard/employees" },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: { xs: 220, sm: 240 },
        bgcolor: "#F9F5F0",
        color: "black",
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: '1px solid black'
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Admin Panel
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Welcome {username}
        </Typography>

        {menuItems.map((item) => (
          <Button
            key={item.name}
            sx={{
              color: location.pathname === item.path ? "#1976d2" : "black",
              justifyContent: "flex-start",
              gap: 2,
              mb: 1,
              bgcolor: location.pathname === item.path ? "#e0e0e0" : "transparent",
            }}
            fullWidth
            onClick={() => {
              navigate(item.path);
              if (mobileopen) handleSidebar(); // close sidebar on mobile
            }}
          >
            <IconButton>{item.icon}</IconButton>
            {item.name}
          </Button>
        ))}
      </Box>

      <Box>
        <Button
          variant="contained"
          onClick={handleLogout}
          fullWidth
          sx={{ gap: 2, bgcolor: "#e57373" }}
        >
          <IconButton><LogoutIcon /></IconButton>
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          width: { sm: 240 },
          flexShrink: 0,
        }}
      >
        {drawerContent}
      </Box>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileopen}
        onClose={handleSidebar}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 200 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
export default Sidebar