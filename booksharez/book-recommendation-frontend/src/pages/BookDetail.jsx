import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BookCard from '../components/bookcard/BookCard';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  const fallbackImage =
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=600&auto=format&fit=crop';

  useEffect(() => {
    // Reset state when id changes (user navigates between books)
    setIsLoading(true);
    setError(null);
    setImgError(false);
    setBook(null);
    setRelated([]);

    const fetchBook = async () => {
      try {
        const [bookRes, relatedRes] = await Promise.all([
          fetch(`http://localhost:5000/api/books/${id}`),
          fetch(`http://localhost:5000/api/books/${id}/related`),
        ]);

        if (!bookRes.ok) {
          if (bookRes.status === 404) {
            throw new Error('Book not found.');
          }
          throw new Error('Failed to fetch book details.');
        }

        const bookData = await bookRes.json();
        setBook(bookData.book);

        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          setRelated(relatedData.books || []);
        }
      } catch (err) {
        setError(err.message);
        console.error('BookDetail fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // ──────────────── LOADING STATE ────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse text-lg">
          Loading book details...
        </p>
      </div>
    );
  }

  // ──────────────── ERROR STATE ────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-24 px-4">
        <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // ──────────────── MAIN RENDER ────────────────
  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 font-medium transition-colors">
            Library
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate">{book.title}</span>
        </div>
      </div>

      {/* ── Book Hero Section ── */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* Cover Image */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-300 aspect-[2/3] bg-gray-200">
                <img
                  src={imgError ? fallbackImage : (book.image_url || fallbackImage)}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="flex-1">

              {/* Genre Badge */}
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                {book.genre || 'General'}
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                {book.title}
              </h1>

              {/* Author */}
              <p className="text-lg text-gray-500 italic mb-6">
                by{' '}
                <span className="text-gray-700 font-semibold not-italic">
                  {book.author}
                </span>
              </p>

              {/* Rating */}
              {book.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center bg-yellow-50 border border-yellow-100 px-3 py-1.5 rounded-xl">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="ml-1.5 font-bold text-yellow-700">
                      {book.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">Rating</span>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Genre
                  </p>
                  <p className="text-gray-900 font-bold">{book.genre || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Author
                  </p>
                  <p className="text-gray-900 font-bold">{book.author || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Book ID
                  </p>
                  <p className="text-gray-900 font-bold">#{book.id}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  ← Back
                </button>
                <button className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98]">
                  + Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Books Section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            More in {book.genre}
          </h2>
          <p className="text-gray-500 text-sm">
            Other books you might enjoy in this genre
          </p>
        </div>

        {related.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {related.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium text-lg">
              No other books in this genre yet.
            </p>
            <Link
              to="/"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm"
            >
              Browse All Books
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
