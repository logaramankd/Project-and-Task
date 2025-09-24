import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'
import Projects from '../Pages/Projects'
import Tasks from '../Pages/Tasks'
import DashboardHome from '../Pages/DashboardHome'
import Employees from '../Pages/Employees'
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DashboardHome />}/>
                    <Route path="projects" element={<Projects />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="employees" element={<Employees />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes 
