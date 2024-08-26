import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const HeaderApp = () => {
  const navigate = useNavigate()
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])


  const toggleTheme = (() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  })

  return (
    <nav className="navbar fixed-top header">
      <div className="container-fluid">
        <div className="navbar-item" onClick={() => navigate(`/`)} style={{ cursor: 'pointer', color: '#c6c6c6' }}>
          Spoty
        </div>
        <div className="d-flex justify-content-end">
          <div className=" navbar-item" onClick={toggleTheme} style={{ cursor: 'pointer', color: '#c6c6c6' }}>
            {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
          </div>
          <div className="nav-item ms-4" onClick={() => navigate(`/`)} style={{ cursor: 'pointer', color: '#c6c6c6' }}>
            Home
          </div>
          <div className="nav-item ms-4" onClick={() => navigate(`/favorites`)} style={{ cursor: 'pointer', color: '#c6c6c6' }}>
            Favorites 🤍
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderApp