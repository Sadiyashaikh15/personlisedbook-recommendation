/**
 * Dashboard.jsx — BookWise Personal Reading Diary Redesign
 * Stack: React + Tailwind v4 + Native CSS Shapes
 * Aesthetic: Personal Linen Journal x Dark Academia Workspace
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── HIGH-QUALITY PLACEHOLDER DATA ───────────────────────────────────────────

const MOCK_CURRENT_BOOKS = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', progress: 65, coverBg: 'bg-[#B66A50]', text: 'text-[#FFFDF8]', badge: 'Currently Reading', tag: 'Self Help' },
  { id: 3, title: 'Deep Work', author: 'Cal Newport', progress: 20, coverBg: 'bg-[#6F4E37]', text: 'text-[#FFFDF8]', badge: 'Currently Reading', tag: 'Focus' },
];

const MOCK_RECOMMENDED = [
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', vibe: 'Mystical & Inspiring', coverBg: 'bg-[#556B2F]', text: 'text-[#FFFDF8]', label: 'Because you love Fiction' },
  { id: 4, title: 'Sapiens', author: 'Y. N. Harari', vibe: 'Deep Historical Canvas', coverBg: 'bg-[#D8A7B1]', text: 'text-[#3E3024]', label: 'AI Mood Recommendation' },
];

// ─── JOURNAL WIDGET REUSABLE COMPONENT ────────────────────────────────────────

const JournalCard = ({ children, className = '' }) => (
  <div className={`bg-[#FFFDF8] border border-[#3E3024]/10 rounded-2xl p-6 shadow-xs relative overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}>
    {/* Subtle vintage lined notebook paper accent layer */}
    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#3E3024 1px, transparent 1px)', backgroundSize: '100% 24px', transform: 'translateY(4px)' }} />
    <div className="relative z-10">{children}</div>
  </div>
);

// ─── MAIN DASHBOARD COMPONENT ────────────────────────────────────────────────

const Dashboard = () => {
  // Access state context cleanly — replace with your actual state variables/UserContext parameters
  const [readerName] = useState('Sadiya'); 
  const [yearlyGoal] = useState({ target: 24, completed: 8 });

  return (
    <div className="bg-[#F8F3EA] min-h-screen text-[#3E3024] font-sans antialiased pt-28 pb-16 px-6 selection:bg-[#A3B18A]/30">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ─── HEADER WELCOME LOG PANEL ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3E3024]/10 pb-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#3E3024]">
              Good morning, <span className="italic text-[#B66A50] font-normal">{readerName}</span>
            </h1>
            <p className="font-sans text-xs font-bold text-[#556B2F] tracking-widest uppercase mt-2">
              🌿 Welcome back to your quiet reading corner
            </p>
          </div>
          <div className="text-left sm:text-right font-serif text-xs italic text-[#3E3024]/50 self-end">
            Current Session Logs · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* ─── TOP MATRIX: HIGH-FIDELITY JOURNAL WIDGETS ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Widget 1: Reading Garden Streak Pulse */}
          <JournalCard>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">☕</span>
              <h3 className="font-serif text-base font-bold">Habit Velocity Pulse</h3>
            </div>
            <p className="font-serif text-3xl font-black text-[#B66A50]">23 Days <span className="text-base font-sans font-bold text-[#3E3024]/40">🔥</span></p>
            <p className="text-xs text-[#3E3024]/60 font-medium mt-2 leading-relaxed">
              Your reading candle remains lit! Keep adding logs to sustain your daily tracking momentum.
            </p>
          </JournalCard>

          {/* Widget 2: Handcrafted Yearly Target Counter */}
          <JournalCard>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🪵</span>
              <h3 className="font-serif text-base font-bold">Yearly Shelf Target</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-black text-[#556B2F]">{yearlyGoal.completed}</span>
              <span className="text-xs text-[#3E3024]/40 font-bold uppercase tracking-wider">of {yearlyGoal.target} books vaulted</span>
            </div>
            {/* Custom Aesthetic Progress Line Bar */}
            <div className="w-full bg-[#F8F3EA] h-2 rounded-full mt-4 overflow-hidden border border-[#3E3024]/5">
              <div 
                className="bg-[#556B2F] h-full rounded-full transition-all duration-500" 
                style={{ width: `${(yearlyGoal.completed / yearlyGoal.target) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-[#3E3024]/40 font-bold block mt-2 font-mono">
              Progress status: {Math.round((yearlyGoal.completed / yearlyGoal.target) * 100)}% Complete
            </span>
          </JournalCard>

          {/* Widget 3: Cozy Monthly Metric Ledger */}
          <JournalCard>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📊</span>
              <h3 className="font-serif text-base font-bold">Monthly Speed Chart</h3>
            </div>
            {/* Soft Custom Minimal Graphical Array */}
            <div className="flex items-end gap-2.5 h-16 pt-2">
              {[25, 50, 35, 80, 45, 65].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div 
                    className="w-full rounded-t-xs transition-all duration-300 bg-[#556B2F]/30"
                    style={{ 
                      height: `${val}%`,
                      backgroundColor: idx === 5 ? '#B66A50' : ''
                    }} 
                  />
                  <span className="text-[8px] font-bold text-[#3E3024]/30 font-mono">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </JournalCard>

        </div>

        {/* ─── DUAL BODY PANEL ROWS ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Continue Reading Active Timelines (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#3E3024] flex items-center gap-2">
              <span>📖</span> Currently Flipping Pages
            </h2>

            <div className="space-y-4">
              {MOCK_CURRENT_BOOKS.map((book) => (
                <div key={book.id} className="bg-[#FFFDF8] border border-[#3E3024]/10 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row justify-between sm:items-center gap-5 transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    {/* Simulated Mini Book Spine Block */}
                    <div className={`${book.coverBg} ${book.text} w-10 h-14 rounded-r-sm border-y border-r border-black/10 flex flex-col justify-end p-1.5 shadow-sm flex-shrink-0 relative`}>
                      <div className="absolute left-0 inset-y-0 w-0.5 bg-black/10" />
                      <span className="text-[8px] block font-serif font-black leading-tight tracking-tight select-none truncate">{book.title}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-[#A3B18A]/20 text-[#556B2F] px-2 py-0.5 rounded-sm inline-block mb-1">
                        {book.tag}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#3E3024]">{book.title}</h3>
                      <p className="font-sans text-xs text-[#3E3024]/60 font-medium">by {book.author}</p>
                    </div>
                  </div>

                  {/* Horizontal Linear Progress Metric Controls */}
                  <div className="w-full sm:w-48 space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-[#3E3024]/50 uppercase tracking-wider">
                      <span>Log Milestone</span>
                      <span>{book.progress}%</span>
                    </div>
                    <div className="w-full bg-[#F8F3EA] h-1.5 rounded-full border border-[#3E3024]/5 overflow-hidden">
                      <div className="bg-[#B66A50] h-full rounded-full" style={{ width: `${book.progress}%` }} />
                    </div>
                    <div className="flex justify-end gap-3 pt-1">
                      <Link to={`/book/${book.id}`} className="text-[10px] font-bold text-[#556B2F] uppercase tracking-wider hover:underline">
                        Open Entry
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: AI Curated Recommendations (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#3E3024] flex items-center gap-2">
              <span>🔮</span> Quiet Curations
            </h2>

            <div className="space-y-4">
              {MOCK_RECOMMENDED.map((rec) => (
                <div key={rec.id} className="bg-[#FFFDF8] border border-[#3E3024]/10 rounded-2xl p-5 shadow-2xs relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#F3E6D0]/20 rounded-bl-full -z-10 pointer-events-none" />
                  
                  <span className="text-[9px] font-mono text-[#C89B3C] font-bold tracking-wider block mb-2">
                    ✦ {rec.label}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#3E3024] group-hover:text-[#B66A50] transition-colors">
                    {rec.title}
                  </h3>
                  <p className="font-sans text-xs text-[#3E3024]/60 font-medium mb-4">by {rec.author}</p>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-[#3E3024]/5 text-[10px] font-bold text-[#3E3024]/40 uppercase tracking-widest italic font-serif">
                    <span>{rec.vibe}</span>
                    <Link to={`/book/${rec.id}`} className="text-[#556B2F] uppercase font-sans tracking-wider not-italic hover:underline font-bold">
                      Inspect →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Internal Custom Architecture Styles injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
      `}</style>
    </div>
  );
};

export default Dashboard;