import './App.css';
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'
import FavorPage from './pages/FavorPage'
import HeaderApp from './cmps/HeaderApp'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <HeaderApp/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playlist/:id" element={<PlaylistPage />} />
            <Route path="/favorites" element={<FavorPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
