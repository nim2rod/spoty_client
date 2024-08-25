import React from 'react'
import {useNavigate} from 'react-router-dom'


const HeaderApp = () => {
  const navigate = useNavigate()

  return (
    <nav className="navbar fixed-top bg-dark">
    <div className="container-fluid">
      <div className="navbar-brand" onClick={() => navigate(`/`)} style={{ cursor: 'pointer', color: '#c6c6c6' }}>
        Spoty
      </div>
      <div className="d-flex justify-content-end">
        <div className="nav-item" onClick={() => navigate(`/favorites`)} style={{ cursor: 'pointer', color: '#c6c6c6' }}>
          Favorites 🤍
        </div>
      </div>
    </div>
  </nav>
  );
}

export default HeaderApp