// src/pages/Projects.jsx
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { projects as initialProjects } from "../utils/projects";
import { users } from "../utils/users";

const statusOptions = ["Not Started", "In Progress", "Completed"];
const priorityOptions = ["Low", "Medium", "High"];

const Projects = () => {
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('projects');
        return saved ? JSON.parse(saved) : initialProjects
    });
    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects))
    }, [projects])
    const [openModal, setOpenModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // Open modal for add/edit
    const handleOpenModal = (project = null) => {
        setEditingProject(project);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setEditingProject(null);
        setOpenModal(false);
    };

    // Delete project
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            setProjects(projects.filter((p) => p.id !== id));
        }
    };

    // Save project (add or edit)
    const handleSave = () => {
        const form = document.getElementById("project-form");
        const formData = new FormData(form);
        const data = {
            id: editingProject ? editingProject.id : Date.now(),
            name: formData.get("name"),
            description: formData.get("description"),
            assignedUsers: formData.getAll("assignedUsers"),
            status: formData.get("status"),
            priority: formData.get("priority"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            tasks: editingProject ? editingProject.tasks : [],
        };

        if (editingProject) {
            setProjects(projects.map((p) => (p.id === data.id ? data : p)));
        } else {
            setProjects([...projects, data]);
        }

        handleCloseModal();
    };

    return (
        <Box sx={{ p: 3, }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Projects
            </Typography>
            <Button variant="contained" sx={{ mb: 2 }} onClick={() => handleOpenModal()}>
                Add Project
            </Button>

            {/* Projects Table */}
            <TableContainer sx={{ bgcolor: '#F9F5F0' }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Assigned Users</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <AvatarGroup max={3}>
                                            {project.assignedUsers.map((username) => {
                                                const user = users.find((u) => u.username === username);
                                                if (!user) return null;
                                                return (
                                                    <Avatar key={user.id} src={user.img} alt={user.username} />
                                                );
                                            })}
                                        </AvatarGroup>
                                    </Box>
                                </TableCell>
                                <TableCell>{project.status}</TableCell>
                                <TableCell>{project.priority}</TableCell>
                                <TableCell>{project.startDate}</TableCell>
                                <TableCell>{project.endDate}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenModal(project)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(project.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle>{editingProject ? "Edit Project" : "Add Project"}</DialogTitle>
                <DialogContent>
                    <Box component="form" id="project-form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField name="name" label="Project Name" defaultValue={editingProject?.name} required />
                        <TextField name="description" label="Description" defaultValue={editingProject?.description} multiline rows={3} required />
                        <TextField
                            select
                            name="status"
                            label="Status"
                            defaultValue={editingProject?.status || "Not Started"}
                        >
                            {statusOptions.map((status) => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="priority"
                            label="Priority"
                            defaultValue={editingProject?.priority || "Medium"}
                        >
                            {priorityOptions.map((p) => (
                                <MenuItem key={p} value={p}>{p}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="assignedUsers"
                            label="Assign Users"
                            defaultValue={editingProject?.assignedUsers || []}
                            SelectProps={{ multiple: true }}
                        >
                            {users.filter(u => u.role === "employee").map(u => (
                                <MenuItem key={u.id} value={u.username}>{u.username}</MenuItem>
                            ))}
                        </TextField>
                        <TextField type="date" name="startDate" label="Start Date" defaultValue={editingProject?.startDate} InputLabelProps={{ shrink: true }} />
                        <TextField type="date" name="endDate" label="End Date" defaultValue={editingProject?.endDate} InputLabelProps={{ shrink: true }} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Projects;
