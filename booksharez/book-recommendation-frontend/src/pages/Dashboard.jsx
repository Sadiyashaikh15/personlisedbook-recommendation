import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import BookCard from '../components/bookcard/BookCard';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recommendations/${user.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(err.message);
        console.error('Recommendations fetch error:', err);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchRecommendations();
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse text-lg">
          Loading your recommendations...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* User Profile Header */}
      <div className="bg-white py-12 shadow-sm border-b border-gray-100 mb-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-600 p-4 rounded-full">
              <span className="text-white font-bold text-3xl">
                {user?.name?.charAt(0) || '?'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Welcome, <span className="text-blue-600">{user?.name}</span>!
              </h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                Favorite Genre: <span className="font-semibold text-gray-700">{user?.favorite_genre}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            📚 Books In Your Genre
          </h2>
          <p className="text-gray-600">
            We found {recommendations.length} book{recommendations.length !== 1 ? 's' : ''} matching your favorite genre
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center mb-8">
            <p className="font-bold">Error Loading Recommendations:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Recommendations Grid */}
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recommendations.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-2xl text-gray-400 font-medium">
              No recommendations found for your genre
            </p>
            <p className="text-gray-500 mt-2">
              Check back soon for new books in {user?.favorite_genre}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
