// src/pages/DashboardHome.jsx
import React from "react";
import dayjs from "dayjs";
import { Card, Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DashboardHome = () => {
  const projects = useSelector((state) => state.projects.projects);

  // Count tasks by status and priority
  let pending = 0,
    inProgress = 0,
    completed = 0;
  let low = 0,
    medium = 0,
    high = 0;

  projects.forEach((project) => {
    project.tasks?.forEach((task) => {
      if (task.status === "Pending") pending++;
      else if (task.status === "In Progress") inProgress++;
      else if (task.status === "Completed") completed++;

      if (task.priority === "Low") low++;
      else if (task.priority === "Medium") medium++;
      else if (task.priority === "High") high++;
    });
  });

  const totalTasks = pending + inProgress + completed;

  const statusData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [pending, inProgress, completed],
        backgroundColor: ["#f39c12", "#3498db", "#2ecc71"],
        borderWidth: 1,
      },
    ],
  };

  const priorityData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [low, medium, high],
        backgroundColor: ["#f1c40f", "#9b59b6", "#e74c3c"],
      },
    ],
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, width: "100%" }}>
      {/* Welcome Card */}
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          background: "linear-gradient(to right, #2968c0ff, #6f99d3ff)", // warm gradient
          color: "#ffffff",
          mb: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.85 }}>
          {dayjs().format("dddd, D MMMM")}
        </Typography>

        {/* Task Stats */}
        <Grid container spacing={2}>
          {[
            { label: "Total Tasks", value: totalTasks, color: "#fff" },
            { label: "Pending", value: pending, color: "#fff" },
            { label: "In Progress", value: inProgress, color: "#fff" },
            { label: "Completed", value: completed, color: "#fff" },
          ].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transition: "0.3s",
                  textAlign: "center",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                  
                }}
              >
                <Typography variant="subtitle2">{item.label}</Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: item.color }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Task Status Pie */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              height: { xs: "auto", md: 400 },
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
              
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tasks Status
            </Typography>
            <Box sx={{ height: { xs: 250, md: 300 } }}>
              <Pie data={statusData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Card>
        </Grid>

        {/* Task Priority Bar */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              height: { xs: "auto", md: 400 },
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tasks Priority
            </Typography>
            <Box sx={{ height: { xs: 250, md: 300 } }}>
              <Bar
                data={priorityData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
