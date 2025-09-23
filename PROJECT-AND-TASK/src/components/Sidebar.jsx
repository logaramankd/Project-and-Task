import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TaskIcon from '@mui/icons-material/Task';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = ({ mobileopen, handleSidebar, username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        navigate('/')
    }

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
                borderRight:'1px solid black'
            }}
        >
            <Box>
                
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Admin Panel
                </Typography>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    welcome {username}
                </Typography>
                <Button sx={{ color: "black", justifyContent: "flex-start", gap: 5, }} fullWidth>
                    <IconButton> <SpaceDashboardIcon /></IconButton>
                    Dashboard
                </Button>
                <Button sx={{ color: "black", justifyContent: "flex-start", gap: 5 }} fullWidth>
                    <IconButton><AccountTreeIcon /></IconButton>
                    Projects
                </Button>
                <Button sx={{ color: "black", justifyContent: "flex-start", gap: 5 }} fullWidth>
                    <IconButton><TaskIcon /></IconButton>
                    Tasks
                </Button>
                <Button sx={{ color: "black", justifyContent: "flex-start", gap: 5 }} fullWidth>
                    <IconButton><BadgeIcon /></IconButton>
                    Employees
                </Button>
            </Box>

            <Box>

                <Button
                    variant="contained"
                    onClick={handleLogout}
                    fullWidth
                    sx={{ gap: 5 ,bgcolor:"#e57373"}}
                >
                    <IconButton><LogoutIcon /></IconButton>
                    Logout
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            {/* desktop */}
            <Box
                sx={{
                    display: { xs: "none", sm: "block" },
                    width: { sm: 240 },
                    flexShrink: 0,
                }}
            >
                {drawerContent}
            </Box>
            <Drawer
                variant="temporary"
                open={mobileopen}
                onClose={handleSidebar}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" }, "&.MuiDrawer-paper": { boxSizing: "border-box", width: 200 }
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    )
}
export default Sidebar