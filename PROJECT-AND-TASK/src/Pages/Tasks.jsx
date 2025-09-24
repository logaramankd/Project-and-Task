import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { users } from "../utils/users";

const Tasks = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = loggedInUser?.role === "admin";

  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("all");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskAssignedUser, setTaskAssignedUser] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [taskPriority, setTaskPriority] = useState("Medium");

  // Filters
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterUser, setFilterUser] = useState("");

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  const selectedProject = projects.find(p => p.id === Number(selectedProjectId));

  const updateProjects = updatedProjects => {
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  // Add Task (Admin only)
  const handleAddTask = () => {
    if (!selectedProject || !taskTitle || !taskAssignedUser) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      assignedUser: taskAssignedUser,
      status: taskStatus,
      priority: taskPriority,
    };

    const updatedProjects = projects.map(p =>
      p.id === selectedProject.id ? { ...p, tasks: [...p.tasks, newTask] } : p
    );
    updateProjects(updatedProjects);
    setOpenModal(false);
    setTaskTitle("");
    setTaskAssignedUser("");
    setTaskStatus("Pending");
    setTaskPriority("Medium");
  };

  // Edit Task (Admin & Employee: status update)
  const handleEditTask = (taskId, projectId, newStatus = null) => {
    const updatedProjects = projects.map(p =>
      p.id === projectId
        ? {
            ...p,
            tasks: p.tasks.map(t =>
              t.id === taskId
                ? isAdmin && !newStatus
                  ? { ...t, title: prompt("Edit Task Title", t.title) || t.title }
                  : { ...t, status: newStatus }
                : t
            ),
          }
        : p
    );
    updateProjects(updatedProjects);
  };

  // Delete Task (Admin only)
  const handleDeleteTask = (taskId, projectId) => {
    const updatedProjects = projects.map(p =>
      p.id === projectId ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) } : p
    );
    updateProjects(updatedProjects);
  };

  // Tasks to display (filtered & role-based)
  const tasksToShow =
    selectedProjectId === "all"
      ? projects.flatMap(p => (p.tasks || []).map(t => ({ ...t, projectId: p.id, projectName: p.name })))
      : selectedProject?.tasks.map(t => ({ ...t, projectId: selectedProject.id, projectName: selectedProject.name })) || [];

  const filteredTasks = tasksToShow.filter(task => {
    if (!isAdmin && task.assignedUser !== loggedInUser.username) return false;
    return (
      (!filterStatus || task.status === filterStatus) &&
      (!filterPriority || task.priority === filterPriority) &&
      (!filterUser || task.assignedUser === filterUser)
    );
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", fontFamily: "'Josefin Sans', sans-serif" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Task Management
      </Typography>

      {/* Top Section: Project + Filters */}
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <select className="custom-select" value={selectedProjectId} onChange={e => setSelectedProjectId(e.target.value)}>
          <option value="all">All Projects</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <Box sx={{ display: "flex", gap: 2 }}>
          <select className="custom-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select className="custom-select" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {isAdmin && (
            <select className="custom-select" value={filterUser} onChange={e => setFilterUser(e.target.value)}>
              <option value="">All Users</option>
              {selectedProjectId === "all"
                ? [...new Set(projects.flatMap(p => p.assignedUsers))].map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))
                : selectedProject?.assignedUsers.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))
              }
            </select>
          )}
        </Box>
      </Box>

      {/* Admin: Add Task Modal Button */}
      {isAdmin && selectedProjectId !== "all" && selectedProject && (
        <Button variant="contained" sx={{ mb: 3 }} onClick={() => setOpenModal(true)}>
          Add Task
        </Button>
      )}

      {/* Task List */}
      <Grid container spacing={2}>
        {filteredTasks.length === 0 && <Typography>No tasks found</Typography>}
        {filteredTasks.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
              {selectedProjectId === "all" && (
                <Typography variant="caption" sx={{ color: "gray" }}>{task.projectName}</Typography>
              )}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>{task.title}</Typography>
              <Typography variant="body2">Assigned: {task.assignedUser}</Typography>

              {/* Status (editable by employee if assigned) */}
              {(isAdmin || loggedInUser.username === task.assignedUser) ? (
                <select
                  className="custom-select"
                  value={task.status}
                  onChange={e => handleEditTask(task.id, task.projectId, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                <Typography variant="body2">Status: {task.status}</Typography>
              )}

              <Typography variant="body2" sx={{ mb: 1 }}>Priority: {task.priority}</Typography>

              {/* Admin: Edit/Delete */}
              {isAdmin && (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => handleEditTask(task.id, task.projectId)}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteTask(task.id, task.projectId)}>Delete</Button>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add Task Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Task Title"
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
            fullWidth
          />
          <Select
            value={taskAssignedUser}
            onChange={e => setTaskAssignedUser(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Select User</MenuItem>
            {selectedProject?.assignedUsers.map(u => (
              <MenuItem key={u} value={u}>{u}</MenuItem>
            ))}
          </Select>
          <Select value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <Select value={taskPriority} onChange={e => setTaskPriority(e.target.value)}>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>

      {/* Custom CSS */}
      <style>
        {`
          .custom-select, .custom-input {
            padding: 6px 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
            font-family: 'Josefin Sans', sans-serif;
            min-width: 150px;
          }
          .custom-input {
            flex: 1 1 200px;
          }
        `}
      </style>
    </Box>
  );
};

export default Tasks;
