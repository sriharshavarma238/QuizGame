import React from 'react'
import './index.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  return (
    <header className="header-container">
      <div className="header-left">
        <div className="header-title" onClick={() => navigate('/')}>
          <h1 className="header-logo">Q</h1>
          <span className="header-subtitle">NXT Quiz</span>
        </div>
      </div>
      <div className="header-right">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  )
}

export default Navbar