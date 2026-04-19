import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ element, requiredRole }) => {
  const user = sessionStorage.getItem('user')
  const role = sessionStorage.getItem('role')

  if (!user || !role) {
    return <Navigate to="/" replace />
  }

  if (requiredRole && role !== requiredRole) {
    alert('Access Denied')
    return <Navigate to="/" replace />
  }

  return element
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/user"
          element={<ProtectedRoute element={<UserDashboard />} requiredRole="USER" />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard />} requiredRole="ADMIN" />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
