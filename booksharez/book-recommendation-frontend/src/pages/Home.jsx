import React, { useState, useEffect } from 'react';
import BookCard from '../components/bookcard/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Connect to your MySQL Backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Replace with your backend URL (Port 5000)
        const response = await fetch('http://localhost:5000/api/books');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data from database');
        }
        
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
        console.error("Database connection error:", err);
      } finally {
        // Artificial delay just to show off your beautiful loader
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchBooks();
  }, []);

  // Professional Search Logic: Filters by title, author, or genre
  const filteredBooks = books.filter((book) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      book.title?.toLowerCase().includes(searchStr) ||
      book.genre?.toLowerCase().includes(searchStr) ||
      book.author?.toLowerCase().includes(searchStr)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Dynamic Search Header */}
      <div className="bg-white py-12 shadow-sm border-b border-gray-100 mb-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6 tracking-tight">
            Sadiya's <span className="text-blue-600">Smart</span> Library
          </h1>
          <div className="relative group">
            <input
              type="text"
              placeholder="Search by title, genre, or author..."
              className="w-full p-4 pl-12 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-4 text-xl grayscale group-focus-within:grayscale-0 transition-all">🔍</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center">
            <p className="font-bold">Database Error:</p>
            <p>{error}. Please ensure your Node server is running on port 5000.</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
            <p className="mt-6 text-gray-500 font-medium animate-pulse text-lg">
              Fetching books from MySQL...
            </p>
          </div>
        ) : (
          <>
            {/* Grid State */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredBooks.map((book) => (
                  <BookCard key={book.book_id || book.id} book={book} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-2xl text-gray-400 font-medium">No results for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                >
                  Show All Books
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;