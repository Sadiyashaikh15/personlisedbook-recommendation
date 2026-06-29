import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();

      if (data.success && data.user) {
        login(data.user);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid login response');
      }
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <div className="text-center mb-10">
          <div className="inline-block bg-blue-600 p-3 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to sync your library across devices</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center mb-5">
            <p className="font-semibold text-sm">{error}</p>
            <p className="text-xs mt-1">Try: sadiya@email.com</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="sadiya@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have an account? <Link to="/" className="text-blue-600 font-bold hover:underline">Start Reading</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;