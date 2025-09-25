import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask, selectProjects } from "../redux/slices/projectsSlice";

const Tasks = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = loggedInUser?.role === "admin";
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const [selectedProjectId, setSelectedProjectId] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskAssignedUser, setTaskAssignedUser] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [taskPriority, setTaskPriority] = useState("Medium");

  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [mobileStatus, setMobileStatus] = useState("Pending");

  const selectedProject = projects.find((p) => p.id === Number(selectedProjectId));

  // Add Task
  const handleAddTask = () => {
    if (!selectedProject || !taskTitle || !taskAssignedUser) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      assignedUser: taskAssignedUser,
      status: taskStatus,
      priority: taskPriority,
    };
    dispatch(addTask({ projectId: selectedProject.id, task: newTask }));

    setOpenModal(false);
    setTaskTitle("");
    setTaskAssignedUser("");
    setTaskStatus("Pending");
    setTaskPriority("Medium");
  };

  // Edit Task
  const handleEditTask = (taskId, projectId, newStatus = null) => {
    const project = projects.find((p) => p.id === projectId);
    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task };
    if (isAdmin && !newStatus) {
      const newTitle = prompt("Edit Task Title", task.title);
      if (!newTitle) return;
      updatedTask.title = newTitle;
    } else if (newStatus) {
      updatedTask.status = newStatus;
    }
    dispatch(updateTask({ projectId, task: updatedTask }));
  };

  // Delete Task
  const handleDeleteTask = (taskId, projectId) => {
    dispatch(deleteTask({ projectId, taskId }));
  };

  // Tasks to display
  const tasksToShow =
    selectedProjectId === "all"
      ? projects.flatMap((p) => (p.tasks || []).map((t) => ({ ...t, projectId: p.id, projectName: p.name })))
      : selectedProject?.tasks.map((t) => ({ ...t, projectId: selectedProject.id, projectName: selectedProject.name })) || [];

  const filteredTasks = tasksToShow.filter((task) => {
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

      {/* Filters Section */}
      <Grid container spacing={2} sx={{ mb: 3, p: 2, background: "linear-gradient(to right, #6329c0ff, #548bf1ff)", borderRadius: 2, boxShadow: 2 }}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Project</InputLabel>
            <Select
              value={selectedProjectId}
              label="Project"
              onChange={(e) => setSelectedProjectId(e.target.value)}
              sx={{ "& .MuiSelect-select": { bgcolor: "#f0f0f0", color: "#000" } }}
            >
              <MenuItem value="all">All Projects</MenuItem>
              {projects.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={2}>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              autoWidth
              value={filterPriority}
              label="Priority"
              onChange={(e) => setFilterPriority(e.target.value)}
              sx={{ "& .MuiSelect-select": { bgcolor: "#f0f0f0", color: "#000" } }}
            >
              <MenuItem value="">All Priority</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {isAdmin && (
          <Grid item xs={12} sm={3}>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel>User</InputLabel>
              <Select
                value={filterUser}
                label="User"
                onChange={(e) => setFilterUser(e.target.value)}
                sx={{ "& .MuiSelect-select": { bgcolor: "#f0f0f0", color: "#000" } }}
              >
                <MenuItem value="">All Users</MenuItem>
                {selectedProjectId === "all"
                  ? [...new Set(projects.flatMap((p) => p.assignedUsers || []))].map((u) => (
                    <MenuItem key={u} value={u}>
                      {u}
                    </MenuItem>
                  ))
                  : selectedProject?.assignedUsers.map((u) => (
                    <MenuItem key={u} value={u}>
                      {u}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>

      {/* Add Task Button */}
      {isAdmin && selectedProjectId !== "all" && selectedProject && (
        <Button
          variant="contained"
          sx={{
            mb: 3, "&:hover": { color: "#FB8C00", color: "#fff" }, // Orange 600 on hover
            color: "#fff",
          }}
          onClick={() => setOpenModal(true)}
        >
          Add Task
        </Button>
      )}

      {/* Task Cards */}
      <Box sx={{ p: 2 }}>
        {/* Mobile Status Selector */}
        <Box sx={{ display: { xs: "block", sm: "none" }, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={mobileStatus}
              onChange={(e) => setMobileStatus(e.target.value)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {["Pending", "In Progress", "Completed"].map((status, index, arr) => {
            if (window.innerWidth < 600 && status !== mobileStatus) return null; // mobile only selected status

            const statusColor =
              status === "Pending"
                ? "#FF9800"
                : status === "In Progress"
                  ? "#2196F3"
                  : "#4CAF50";

            const taskCount = filteredTasks.filter(
              (task) => task.status === status
            ).length;

            return (
              <React.Fragment key={status}>
                {/* Column */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 250,
                    bgcolor: "#f7f7f7",
                    borderRadius: 2,
                    p: 2,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    // hide scrollbar cross-browser
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
                    msOverflowStyle: "none", // IE + Edge
                  }}
                >
                  {/* Professional Status Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: "#f9f9f9",
                      boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.08)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        mr: 1.5,
                        bgcolor: statusColor,
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "#2D3748" }}
                    >
                      {status} ({taskCount})
                    </Typography>
                  </Box>

                  {/* Task Cards */}
                  {filteredTasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <Paper
                        key={task.id}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          width: "100%",
                          minHeight: 200,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transition: "0.3s",
                          "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                          borderBottomColor: status === "Pending"
                            ? "#FF9800"
                            : status === "In Progress"
                              ? "#2196F3"
                              : "#4CAF50"
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            {selectedProjectId === "all" && (
                              <Typography variant="subtitle2">
                                {task.projectName}
                              </Typography>
                            )}
                            <Typography
                              variant="caption"
                              sx={{
                                bgcolor: "gainsboro",
                                p: 1,
                                borderRadius: 2,
                              }}
                            >
                              24hrs ago
                            </Typography>
                          </Box>

                          <Typography
                            variant="body1"
                            sx={{
                              mb: 1,
                              fontSize: "1.1rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              fontWeight: 600
                            }}
                          >
                            {task.title} <span style={{ fontWeight: 600, }}>▼</span>
                          </Typography>

                          <Typography variant="body2" sx={{ mb: 1, color: "dimgrey" }}>
                            Assigned: {task.assignedUser}
                          </Typography>

                          <FormControl fullWidth sx={{ mb: 1 }}>
                            <Select
                              value={task.status}
                              onChange={(e) =>
                                handleEditTask(
                                  task.id,
                                  task.projectId,
                                  e.target.value
                                )
                              }
                            >
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="In Progress">In Progress</MenuItem>
                              <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>

                        {isAdmin && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Box>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                Priority: {task.priority}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => handleEditTask(task.id, task.projectId)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() =>
                                  handleDeleteTask(task.id, task.projectId)
                                }
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Paper>
                    ))}
                </Box>

                {/* Divider*/}
                {index < arr.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ display: { xs: "none", sm: "block", borderWidth: "1px", borderColor: "gainsboro" } }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Box>

      </Box>
      {/* Add Task Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Assign User</InputLabel>
            <Select value={taskAssignedUser} onChange={(e) => setTaskAssignedUser(e.target.value)}>
              {selectedProject?.assignedUsers.map((u) => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks;
