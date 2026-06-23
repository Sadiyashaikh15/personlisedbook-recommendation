import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'; // Changed to capital L
import Navbar from './components/Navbar'; // Changed to capital N
function App() {
  return (
    <Router>
      {/* 1. Navbar stays outside Routes so it shows on every page */}
      <Navbar /> 
      
      <Routes>
        {/* 2. Define your paths */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;