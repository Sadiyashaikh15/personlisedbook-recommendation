import React from 'react';

const BookCard = ({ book }) => {
  // Why this fallback? 
  // It ensures that even if the external image link is broken, 
  // your UI stays clean and doesn't show a broken icon.
  const fallbackImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=600&auto=format&fit=crop";

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
        <img 
          src={book.cover_image} 
          alt={book.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          // Safety logic for broken links
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        
        {/* Hover Overlay - Appears when parent 'group' is hovered */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button className="bg-white text-gray-900 px-6 py-2 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-50">
            View Details
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
            {book.genre || "General"}
          </span>
          <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-md">
            <span className="text-xs font-bold text-yellow-700">{book.rating || "N/A"}</span>
            <span className="ml-1 text-[10px] text-yellow-500">★</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {book.title}
        </h3>
        
        <p className="text-sm text-gray-500 mt-1 italic">
          by {book.author}
        </p>

        {/* This spacer pushes the footer to the bottom */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium">
          <span>Added recently</span>
          <span className="hover:text-blue-500 uppercase tracking-tighter">Read More →</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;