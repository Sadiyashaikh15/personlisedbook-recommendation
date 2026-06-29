/**
 * BookCard.jsx — BookWise Reusable Hardcover Card Component
 * Stack: React + Tailwind v4 + Soft CSS Micro-Interactions
 * Aesthetic: Real dimensional book jacket with spine highlights and soft paper textures
 */

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const BookCard = ({ book, isFavorited = false, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [favorited, setFavorited] = useState(isFavorited);
  const [favLoading, setFavLoading] = useState(false);

  // Sync internal state when parent updates the isFavorited prop asynchronously
  useEffect(() => {
    setFavorited(isFavorited);
  }, [isFavorited]);

  const fallbackImage =
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=600&auto=format&fit=crop';

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    setFavLoading(true);
    try {
      if (favorited) {
        const res = await fetch(`http://localhost:5000/api/favorites/${book.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user.id }),
        });
        if (res.ok) {
          setFavorited(false);
          onFavoriteToggle && onFavoriteToggle(book.id, false);
        }
      } else {
        const res = await fetch('http://localhost:5000/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user.id, book_id: book.id }),
        });
        if (res.ok || res.status === 409) {
          setFavorited(true);
          onFavoriteToggle && onFavoriteToggle(book.id, true);
        }
      }
    } catch (err) {
      console.error('Favorite toggle error:', err);
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-[#FFFDF8] border border-[#3E3024]/10 rounded-2xl p-4 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col h-full justify-between relative cursor-pointer overflow-hidden"
    >
      
      {/* ─── FLOATING ACTION CORNER (FAVORITE BUTTON) ────────────────────── */}
      <button
        type="button"
        onClick={handleFavoriteClick}
        disabled={favLoading}
        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full border flex items-center justify-center shadow-2xs cursor-pointer transition-all active:scale-90 ${
          favorited
            ? 'bg-[#B66A50] border-[#B66A50] text-[#FFFDF8]'
            : 'bg-[#FFFDF8]/90 text-[#3E3024]/40 hover:text-[#B66A50] border-[#3E3024]/10'
        }`}
        title={favorited ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        {favLoading ? (
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </button>

      {/* ─── TACTILE JACKET VISUAL ELEMENT ──────────────────────────────── */}
      <div className="w-full h-48 bg-[#F8F3EA]/50 border border-[#3E3024]/5 rounded-xl flex items-center justify-center relative overflow-hidden p-4 mb-4">
        {/* Soft background ambient gradient drop */}
        <div className="absolute inset-0 bg-radial from-white/30 to-transparent pointer-events-none" />
        
        {/* Layered Hardcover Wrapper Architecture */}
        <div className="w-28 h-40 bg-[#FFFDF8] rounded-r-md rounded-l-xs border-y border-r border-[#3E3024]/15 shadow-md relative overflow-hidden transition-transform duration-500 group-hover:scale-102 group-hover:rotate-1 flex flex-col justify-between">
          <img
            src={book.image_url || book.cover_image}
            alt={book.title}
            className="w-full h-full object-cover absolute inset-0 -z-10 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />

          {/* Deep Spine Binding Indent Line Overlay */}
          <div className="absolute left-0 inset-y-0 w-1.5 bg-gradient-to-r from-black/20 via-black/5 to-transparent border-r border-white/5" />
          
          {/* Subtle Fallback Title Plate Typography overlay if img layer fails */}
          <div className="absolute inset-0 bg-black/5 p-2.5 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <span className="text-[10px] text-white/40 font-mono font-bold">✦</span>
            <div className="space-y-1">
              <h4 className="font-serif text-[10px] font-bold text-white leading-tight line-clamp-2">
                {book.title}
              </h4>
              <p className="text-[8px] font-sans text-white/60 truncate">
                {book.author}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── META & CONTENT DETAILS SECTION ────────────────────────────── */}
      <div className="flex flex-col flex-grow space-y-2">
        <div className="flex justify-between items-center gap-2">
          <span className="px-2.5 py-0.5 bg-[#A3B18A]/20 text-[#556B2F] text-[9px] font-bold uppercase tracking-wider rounded-sm">
            {book.genre || 'General'}
          </span>
          {book.rating && (
            <div className="flex items-center gap-1 bg-[#FFFDF8] px-1.5 py-0.5 rounded font-mono text-[10px] font-bold text-[#C89B3C]">
              <span>★</span>
              <span>{book.rating}</span>
            </div>
          )}
        </div>

        <div className="space-y-0.5">
          <h3 className="font-serif text-base font-black text-[#3E3024] leading-snug tracking-tight group-hover:text-[#B66A50] transition-colors line-clamp-1">
            {book.title}
          </h3>
          <p className="font-sans text-xs text-[#3E3024]/60 font-medium italic">by {book.author}</p>
        </div>

        {/* Card Footer Operational Links */}
        <div className="mt-auto pt-3 border-t border-[#3E3024]/5 flex items-center justify-between text-[11px] font-bold tracking-wide uppercase font-sans">
          <span className={`flex items-center gap-1.5 ${favorited ? 'text-[#B66A50]' : 'text-[#3E3024]/30'}`}>
            <span className="text-xs">{favorited ? '♥' : '♡'}</span>
            <span className="text-[10px]">{favorited ? 'Saved' : 'Save Volume'}</span>
          </span>
          <span className="text-[#556B2F] group-hover:text-[#B66A50] transition-colors">
            Inspect →
          </span>
        </div>
      </div>

    </div>
  );
};

export default BookCard;