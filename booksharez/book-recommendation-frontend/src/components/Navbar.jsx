import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const navLinkStyles = ({ isActive }) =>
    `text-sm font-semibold transition-all duration-300 ${
      isActive
        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
        : 'text-gray-600 hover:text-blue-600'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              Book<span className="text-blue-600">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <NavLink to="/" className={navLinkStyles}>
              Library
            </NavLink>
            {user && (
              <NavLink to="/dashboard" className={navLinkStyles}>
                Dashboard
              </NavLink>
            )}

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-7 py-3 rounded-2xl font-bold transition-all active:scale-95 text-sm bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-7 py-3 rounded-2xl font-bold transition-all active:scale-95 text-sm ${
                    isActive
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-100'
                    : 'bg-gray-900 text-white hover:bg-blue-600'
                  }`
                }
              >
                Sign In
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-2">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-blue-50">
            Library
          </NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-blue-50">
                Dashboard
              </NavLink>
              <div className="px-4 py-3 text-gray-700 font-semibold text-sm">
                {user.name}
              </div>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 bg-red-600 text-white font-bold rounded-xl text-center">
                Logout
              </button>
            </>
          )}
          {!user && (
            <NavLink to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 bg-blue-600 text-white font-bold rounded-xl text-center">
              Sign In
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;