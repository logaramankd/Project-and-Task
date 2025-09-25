import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  AvatarGroup,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { users } from "../utils/users";
import { useSelector, useDispatch } from 'react-redux';
import { addProject, deleteProject, updateProject } from "../redux/slices/projectsSlice";
import { useTheme } from "@mui/material/styles";

const statusOptions = ["Not Started", "In Progress", "Completed"];
const priorityOptions = ["Low", "Medium", "High"];

// helper for status color
const getStatusColor = (status) => {
  switch (status) {
    case "Not Started":
      return "default"; // gray
    case "In Progress":
      return "warning"; // yellow/orange
    case "Completed":
      return "success"; // green
    default:
      return "default";
  }
};

// helper for priority color
const getPriorityColor = (priority) => {
  switch (priority) {
    case "Low":
      return "info"; // blue
    case "Medium":
      return "secondary"; // purple
    case "High":
      return "error"; // red
    default:
      return "default";
  }
};

const Projects = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = loggedInUser?.role === "admin";

  const projects = useSelector(state => state.projects.projects);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [searchProject, setSearchProject] = useState("");

  const displayedProjects = (isAdmin ? projects : projects.filter(p => p.assignedUsers.includes(loggedInUser.username)))
    .filter(p => p.name.toLowerCase().includes(searchProject.toLowerCase()));

  const handleOpenModal = (project = null) => {
    setEditingProject(project);
    setAssignedUsers(project?.assignedUsers || []);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setAssignedUsers([]);
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const handleSave = () => {
    const form = document.getElementById("project-form");
    const formData = new FormData(form);
    const data = {
      id: editingProject ? editingProject.id : Date.now(),
      name: formData.get("name"),
      description: formData.get("description"),
      assignedUsers,
      status: formData.get("status"),
      priority: formData.get("priority"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      tasks: editingProject ? editingProject.tasks : [],
    };
    editingProject ? dispatch(updateProject(data)) : dispatch(addProject(data));
    handleCloseModal();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, minHeight: "100vh", width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Projects</Typography>

      {/* Top actions */}
      <Box sx={{ display: 'flex', flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "stretch", sm: "center" }, gap: 2, mb: 2 }}>
        {isAdmin && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF9800",  // Orange 500
              "&:hover": { color: "#FB8C00",bgcolor:"#fff" }, // Orange 600
              width: { xs: "100%", sm: "auto" }
            }} onClick={() => handleOpenModal()}
          >
            Add Project
          </Button>
        )}
        <TextField
          label="Search Project"
          value={searchProject}
          onChange={(e) => setSearchProject(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: { xs: "100%", sm: "250px" } }}
        />
      </Box>

      {/* Responsive rendering */}
      {isMobile ? (
        // 📱 Card view for mobile
        <Box sx={{ display: "grid", gap: 2 }}>
          {displayedProjects.map((project) => (
            <Card key={project.id} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{project.name}</Typography>
                <Typography variant="body2" color="text.secondary">{project.description}</Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Chip label={project.status} color={getStatusColor(project.status)} size="small" />
                  <Chip label={project.priority} color={getPriorityColor(project.priority)} size="small" />
                </Box>

                <Box sx={{ mt: 1 }}>
                  <AvatarGroup max={3}>
                    {project.assignedUsers.map((username) => {
                      const user = users.find(u => u.username === username);
                      if (!user) return null;
                      return <Avatar key={user.id} src={user.img} alt={user.username} />;
                    })}
                  </AvatarGroup>
                </Box>

                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  🗓 {project.startDate} → {project.endDate}
                </Typography>
              </CardContent>
              {isAdmin && (
                <CardActions>
                  <IconButton color="primary" onClick={() => handleOpenModal(project)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(project.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          ))}
        </Box>
      ) : (
        // 💻 Table view for desktop
        <TableContainer component={Paper} sx={{ bgcolor: "#ffffff", borderRadius: 2, boxShadow: 3, overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(to right, #6329c0ff, #548bf1ff)" }}>
                {["Name", "Description", "Assigned Users", "Status", "Priority", "Start Date", "End Date", "Actions"].map(header => (
                  <TableCell key={header} sx={{ color: "#fff", fontWeight: 600 }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedProjects.map((project) => (
                <TableRow key={project.id} sx={{ "&:hover": { bgcolor: "#f1f1f1" } }}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <AvatarGroup max={3}>
                      {project.assignedUsers.map((username) => {
                        const user = users.find(u => u.username === username);
                        if (!user) return null;
                        return <Avatar key={user.id} src={user.img} alt={user.username} />;
                      })}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    <Chip label={project.status} color={getStatusColor(project.status)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={project.priority} color={getPriorityColor(project.priority)} size="small" />
                  </TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>
                    {isAdmin && (
                      <>
                        <IconButton color="primary" onClick={() => handleOpenModal(project)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(project.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Modal (unchanged) */}
      {isAdmin && (
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
          <DialogTitle>{editingProject ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogContent>
            <Box component="form" id="project-form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField name="name" label="Project Name" defaultValue={editingProject?.name} required fullWidth />
              <TextField name="description" label="Description" defaultValue={editingProject?.description} multiline rows={3} required fullWidth />
              <TextField select name="status" label="Status" defaultValue={editingProject?.status || "Not Started"} fullWidth>
                {statusOptions.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
              </TextField>
              <TextField select name="priority" label="Priority" defaultValue={editingProject?.priority || "Medium"} fullWidth>
                {priorityOptions.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </TextField>
              <TextField
                select
                label="Assign Users"
                value={assignedUsers}
                onChange={(e) =>
                  setAssignedUsers(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)
                }
                SelectProps={{ multiple: true }}
                fullWidth
              >
                {users.filter(u => u.role === "employee").map(u => <MenuItem key={u.id} value={u.username}>{u.username}</MenuItem>)}
              </TextField>
              <TextField type="date" name="startDate" label="Start Date" defaultValue={editingProject?.startDate} InputLabelProps={{ shrink: true }} fullWidth />
              <TextField type="date" name="endDate" label="End Date" defaultValue={editingProject?.endDate} InputLabelProps={{ shrink: true }} fullWidth />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#115293" } }} onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Projects;
