import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'
import Projects from '../Pages/Projects'
const AppRoutes  = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/projects" element={<Projects />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes 
