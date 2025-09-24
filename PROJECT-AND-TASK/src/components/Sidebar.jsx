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
        bgcolor: "#263238", // professional dark gray/blue
        color: "#ffffff",
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top Section */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 3, color: "#b0bec5" }}>
          Welcome, {username}
        </Typography>

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.name}
              sx={{
                color: isActive ? "#263238" : "#eceff1",  // active text dark, default light
                bgcolor: isActive ? "#80cbc4" : "transparent", // teal accent for active
                justifyContent: "flex-start",
                gap: 2,
                mb: 1,
                borderRadius: 1,
                textTransform: "none",
                "&:hover": {
                  bgcolor: isActive ? "#4db6ac" : "rgba(255,255,255,0.1)", // subtle hover
                },
              }}
              fullWidth
              onClick={() => {
                navigate(item.path);
                if (mobileopen) handleSidebar();
              }}
            >
              <IconButton sx={{ color: isActive ? "#263238" : "#eceff1" }}>
                {item.icon}
              </IconButton>
              {item.name}
            </Button>
          );
        })}
      </Box>

      {/* Bottom Logout */}
      <Button
        variant="contained"
        onClick={handleLogout}
        fullWidth
        sx={{
          gap: 2,
          bgcolor: "#d32f2f",       // professional deep red
          "&:hover": { bgcolor: "#b71c1c" },
          color: "#fff",
          textTransform: "none",
        }}
      >
        <IconButton sx={{ color: "#fff" }}>
          <LogoutIcon />
        </IconButton>
        Logout
      </Button>
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
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 220 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
