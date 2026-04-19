import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import '../App.css'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  // Redirect if already logged in
  useEffect(() => {

    const user = sessionStorage.getItem('user')
    const role = sessionStorage.getItem('role')

    if (user && role) {

      if (role === 'ADMIN') {

        navigate('/admin', { replace: true })

      } else {

        navigate('/user', { replace: true })

      }
    }

  }, [navigate])


  // LOGIN FUNCTION
  const handleLogin = async (e) => {

    e.preventDefault()

    setError('')
    setLoading(true)

    if (!username || !password) {

      setError('Username and password are required')
      setLoading(false)
      return
    }

    try {

      // Encode credentials for Basic Auth
      const encodedCredentials = btoa(`${username}:${password}`)

      // Call public endpoint for authentication
      await axios.get('http://localhost:8080/api/public/hello', {

        headers: {

          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',

        },

        withCredentials: true,

      })


      // Determine role based on username
      const role = username === 'admin' ? 'ADMIN' : 'USER'


      // Save session
      sessionStorage.setItem('user', username)
      sessionStorage.setItem('role', role)


      // Redirect based on role
      if (role === 'ADMIN') {

        navigate('/admin', { replace: true })

      } else {

        navigate('/user', { replace: true })

      }

    } catch (err) {

      console.error('Login Error:', err)

      setError('Invalid Credentials')

      setLoading(false)

    }
  }


  return (

    <div className="app-container">

      <div className="login-container">

        <h2
          style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, #6BB6FF 0%, #E0B0FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '30px',
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}
        >
          ✨ Experiment 9 - RBAC Login ✨
        </h2>


        {error &&

          <div className="error-message">

            {error}

          </div>

        }


        <form onSubmit={handleLogin}>


          <div className="form-group">

            <label>Username</label>

            <input

              type="text"

              value={username}

              onChange={(e) => setUsername(e.target.value)}

              placeholder="Enter username"

              disabled={loading}

            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <input

              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              placeholder="Enter password"

              disabled={loading}

            />

          </div>


          <button

            type="submit"

            className="login-button"

            disabled={loading}

            style={{

              display: 'flex',

              alignItems: 'center',

              justifyContent: 'center'

            }}

          >

            {loading

              ?

              <>

                <CircularProgress
                  size={20}
                  style={{
                    marginRight: '8px',
                    color: 'white'
                  }}
                />

                Logging in...

              </>

              :

              'Login'

            }

          </button>

        </form>


        <div

          style={{

            marginTop: '30px',

            padding: '20px',

            background: 'linear-gradient(135deg, #F0F8FF 0%, #FFF8DC 100%)',

            borderRadius: '12px',

            border: '2px solid rgba(173, 216, 230, 0.5)',

            boxShadow: '0 4px 15px rgba(173, 216, 230, 0.2)'

          }}
        >

          <p

            style={{

              color: '#6BB6FF',

              fontSize: '14px',

              margin: '5px 0',

              fontWeight: '600',

              letterSpacing: '0.3px'

            }}
          >

            ✨ Test Credentials ✨

          </p>


          <p

            style={{

              color: '#4A9FFF',

              fontSize: '14px',

              margin: '8px 0',

              fontFamily: 'monospace',

              fontWeight: '500'

            }}
          >

            👤 User: <code style={{ background: 'rgba(107, 182, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>user</code> / Pass: <code style={{ background: 'rgba(107, 182, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>1234</code>

          </p>


          <p

            style={{

              color: '#4A9FFF',

              fontSize: '14px',

              margin: '8px 0',

              fontFamily: 'monospace',

              fontWeight: '500'

            }}
          >

            👑 Admin: <code style={{ background: 'rgba(107, 182, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>admin</code> / Pass: <code style={{ background: 'rgba(107, 182, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>admin123</code>

          </p>

        </div>

      </div>

    </div>

  )

}

export default Login
