/**
 * Home.jsx — BookWise Virtual Library Index Redesign (API Bound)
 * Stack: React + Tailwind v4 + Soft CSS Micro-Interactions
 * Aesthetic: Walking down a cozy wooden bookstore aisle
 */

import React, { useState, useEffect, useContext } from 'react';
import BookCard from '../components/bookcard/BookCard';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [activeGenre, setActiveGenre] = useState('All');

  // ─── LIVE BACKEND DATA SYNC PIPELINE ───────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [fetch('http://localhost:5000/api/books')];
        if (user) requests.push(fetch(`http://localhost:5000/api/favorites/${user.id}`));

        const results = await Promise.all(requests);
        if (!results[0].ok) throw new Error('Failed to fetch books from server');

        const booksData = await results[0].json();
        setBooks(booksData);

        if (user && results[1]?.ok) {
          const favData = await results[1].json();
          setFavorites((favData.favorites || []).map((f) => f.id));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => setIsLoading(false), 600);
      }
    };

    fetchData();
  }, [user]);

  // Dynamic extract for available genres
  const genres = ['All', ...new Set(books.map((b) => b.genre).filter(Boolean))];

  // Search logic match pipeline
  const filteredBooks = books.filter((book) => {
    const searchStr = searchTerm.toLowerCase();
    const matchesSearch =
      book.title?.toLowerCase().includes(searchStr) ||
      book.genre?.toLowerCase().includes(searchStr) ||
      book.author?.toLowerCase().includes(searchStr);
    const matchesGenre = activeGenre === 'All' || book.genre === activeGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="bg-[#F8F3EA] min-h-screen text-[#3E3024] font-sans antialiased pt-28 pb-16 px-6 selection:bg-[#A3B18A]/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="border-b border-[#3E3024]/10 pb-5">
          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#3E3024]">
            The Grand Archive
          </h1>
          <p className="font-sans text-xs font-bold text-[#556B2F] tracking-widest uppercase mt-2">
            🪵 Walk between the cases & discover your next volume
          </p>
        </div>

        {/* Custom Input Search Bar Row */}
        <div className="w-full max-w-xl">
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm opacity-40 pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search by title, author, or genre..."
              className="w-full bg-[#FFFDF8] border border-[#3E3024]/10 rounded-full pl-12 pr-10 py-3.5 text-xs sm:text-sm text-[#3E3024] focus:outline-hidden focus:border-[#556B2F] focus:bg-[#FFFDF8] transition-all font-medium placeholder-[#3E3024]/30 shadow-2xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3E3024]/40 hover:text-[#3E3024] transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Database Error Banner Panel */}
        {error && (
          <div className="flex items-start gap-3 bg-[#B66A50]/10 border border-[#B66A50]/20 text-[#B66A50] p-5 rounded-2xl max-w-xl">
            <span className="text-lg mt-0.5">⚠️</span>
            <div>
              <p className="font-serif font-bold text-sm">Sanctuary Register Warning</p>
              <p className="text-xs text-[#B66A50]/80 mt-0.5">{error}. Ensure backend registers are operational on port 5000.</p>
            </div>
          </div>
        )}

        {/* ─── LOADING STATE ────────────────────────────────────────────────── */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-10 h-10 border-4 border-[#556B2F]/20 border-t-[#556B2F] rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#3E3024]/40 animate-pulse">
              Consulting library logs...
            </p>
          </div>
        ) : (
          <>
            {/* Genre Filter Horizon Strip */}
            {!searchTerm && genres.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-none">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider border whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                      activeGenre === genre
                        ? 'bg-[#556B2F] border-[#556B2F] text-[#F8F3EA] shadow-xs'
                        : 'bg-[#FFFDF8] border-[#3E3024]/10 text-[#3E3024]/70 hover:bg-[#F3E6D0]'
                    }`}
                  >
                    {genre === 'All' ? 'All Shelves' : genre}
                  </button>
                ))}
              </div>
            )}

            {/* Results Count Line */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#3E3024]/50 font-bold uppercase tracking-wider font-sans">
                {searchTerm
                  ? `${filteredBooks.length} entry found for "${searchTerm}"`
                  : `${filteredBooks.length} volume available on active shelf`}
              </p>
            </div>

            {/* ─── MAIN DOCKING ARCHIVE GRID ──────────────────────────────────── */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.book_id || book.id}
                    book={book}
                    isFavorited={favorites.includes(book.id)}
                  />
                ))}
              </div>
            ) : (
              /* Handcrafted Empty Shelf Canvas View */
              <div className="bg-[#FFFDF8] border border-[#3E3024]/10 rounded-2xl p-12 text-center max-w-md mx-auto shadow-2xs">
                <div className="w-12 h-12 bg-[#F8F3EA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#3E3024]/5">
                  <span className="text-xl opacity-60">🪶</span>
                </div>
                <p className="font-serif text-lg font-bold text-[#3E3024] mb-1">
                  Silence in the aisles
                </p>
                <p className="font-sans text-xs text-[#3E3024]/60 font-medium mb-6">
                  {searchTerm ? `Nothing cataloged matches "${searchTerm}"` : `No records match shelf selection`}
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveGenre('All'); }}
                  className="px-5 py-2.5 bg-[#B66A50] text-[#FFFDF8] rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#A25B42] transition-colors shadow-xs cursor-pointer"
                >
                  Clear Catalog Filters
                </button>
              </div>
            )}
          </>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
        
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;
