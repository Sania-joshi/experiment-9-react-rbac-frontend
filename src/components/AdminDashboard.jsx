import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, CircularProgress } from '@mui/material'
import '../App.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const username = sessionStorage.getItem('user')
  const role = sessionStorage.getItem('role')

  // Verify role on mount
  React.useEffect(() => {
    if (role !== 'ADMIN') {
      alert('Access Denied')
      navigate('/', { replace: true })
    }
  }, [role, navigate])

  const fetchDashboard = async () => {
    setLoading(true)
    setError('')
    setResponse('')

    try {
      const response = await axios.get('http://localhost:8080/api/admin/dashboard', {
        auth: {
          username: username,
          password: 'admin123' // Admin password
        },
        withCredentials: true,
      })

      setResponse(JSON.stringify(response.data, null, 2))
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to fetch dashboard: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/', { replace: true })
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>⚙️ Admin Dashboard</h1>

        <div className="profile-info">
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
        </div>

        <div className="button-group">
          <Button
            variant="contained"
            color="success"
            onClick={fetchDashboard}
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Fetch Dashboard'}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            disabled={loading}
            style={{ flex: 1 }}
          >
            Logout
          </Button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {response && (
          <div>
            <h3 style={{ marginTop: '20px', color: '#333' }}>API Response:</h3>
            <div className="response-box">{response}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
