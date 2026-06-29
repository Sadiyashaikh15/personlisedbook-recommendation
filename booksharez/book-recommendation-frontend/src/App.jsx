import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookDetail from './pages/BookDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
