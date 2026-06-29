/**
 * Landing.jsx — BookWise Magical Library Redesign (Fixed)
 * Stack: React + Tailwind v4 + Native CSS Keyframes
 * Aesthetic: Dark Academia x Cottagecore x Studio Ghibli Warmth
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─── HIGH-FIDELITY BOOKSHELF & JOURNAL DATA ──────────────────────────────────

const SHELF_BOOKS = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', spineBg: 'bg-[#B66A50]', text: 'text-[#FFFDF8]', ribbon: 'bg-[#C89B3C]', width: 'w-12 sm:w-14', height: 'h-48 sm:h-56', ornament: '✦' },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', spineBg: 'bg-[#556B2F]', text: 'text-[#FFFDF8]', ribbon: 'transparent', width: 'w-10 sm:w-12', height: 'h-44 sm:h-52', ornament: '✿' },
  { id: 3, title: 'Deep Work', author: 'Cal Newport', spineBg: 'bg-[#6F4E37]', text: 'text-[#FFFDF8]', ribbon: 'bg-[#D8A7B1]', width: 'w-14 sm:w-16', height: 'h-52 sm:h-60', ornament: '✥' },
  { id: 4, title: 'Sapiens', author: 'Y. N. Harari', spineBg: 'bg-[#D8A7B1]', text: 'text-[#3E3024]', ribbon: 'transparent', width: 'w-11 sm:w-13', height: 'h-46 sm:h-54', ornament: '★' },
  { id: 5, title: 'Rich Dad Poor Dad', author: 'R. Kiyosaki', spineBg: 'bg-[#C89B3C]', text: 'text-[#3E3024]', ribbon: 'bg-[#556B2F]', width: 'w-12 sm:w-14', height: 'h-48 sm:h-56', ornament: '♦' },
];

const VALUES = [
  { icon: '🪵', title: 'Tactile Tracking', desc: 'Move your books across actual virtual shelves. Feel the physical progression of turning pages, logging milestones, and sliding finished volumes into place.' },
  { icon: '☕', title: 'Cozy Reflection Spaces', desc: 'Leave multi-layered reviews, private marginalia notes, and favorite espresso-stained quotes inside a digital linen journal built completely for your eyes only.' },
  { icon: '🔮', title: 'Magical AI Curations', desc: 'Our algorithm reads between the lines of your library mood patterns to recommend stories that align with your current internal season.' }
];

const REVIEWS = [
  { text: "This feels exactly like stepping into an old, hidden bookstore on a rainy Tuesday afternoon. The visual calm makes me want to put down my phone and read for hours.", user: "Aisha Patel", role: "Journal Enthusiast", tint: "bg-[#FFFDF8]" },
  { text: "I abandoned my old messy spreadsheet setup within two minutes of seeing this shelf array. It behaves like a beautiful physical reading diary.", user: "Marcus Chen", role: "Dark Academia Archivist", tint: "bg-[#FFFDF8]" },
  { text: "The weekly timeline layouts look like handwritten notes on coffee-stained parchment. Genuinely stunning and deeply motivating framework.", user: "Priya Sharma", role: "Casual Tea Drinker", tint: "bg-[#FFFDF8]" }
];

const MODULE_FAQS = [
  { q: "Is BookWise completely free to use?", a: "Yes, our core reading shelves, handwritten journal spaces, and cozy statistical modules are entirely free. We prioritize reading sanctuary over paywalls." },
  { q: "How do the magical recommendations gather insights?", a: "Instead of raw transactional categories, BookWise looks at your preferred atmospheric moods, historical speeds, and structural ratings to map cozy seasonal pairs." },
  { q: "Can I cleanly export my data frames out?", a: "Always. Your data is your own personal property. Export your cataloging logs as neat, structured data formats at any time." }
];

const GENRES = [
  { name: 'Self Help', count: '48 Volumes', alignment: 'rotate-1' },
  { name: 'Fiction', count: '72 Volumes', alignment: '-rotate-2' },
  { name: 'Productivity', count: '31 Volumes', alignment: 'rotate-3' },
  { name: 'Finance', count: '29 Volumes', alignment: '-rotate-1' },
  { name: 'Non-Fiction', count: '55 Volumes', alignment: 'rotate-2' },
  { name: 'Science', count: '22 Volumes', alignment: '-rotate-3' },
];

// ─── INTEGRATED CUSTOM VECTOR DOODLES ────────────────────────────────────────

const SparkleDoodle = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`text-[#C89B3C]/40 pointer-events-none ${className}`}>
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
  </svg>
);

const LeafDoodle = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`text-[#556B2F]/30 pointer-events-none ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21c3-3 7-4 10-2 3-3 4-8 2-11-3 2-4 6-2 10-3-1-7-1-10 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14c1.5-1.5 3.5-2 5-1.5" />
  </svg>
);

const TinyStars = () => (
  <>
    <SparkleDoodle className="absolute top-16 left-12 w-4 h-4 animate-pulse" />
    <SparkleDoodle className="absolute bottom-24 right-16 w-5 h-5 animate-pulse" style={{ animationDelay: '1s' }} />
    <LeafDoodle className="absolute top-1/3 right-8 w-6 h-6 rotate-12" />
    <LeafDoodle className="absolute bottom-1/3 left-6 w-5 h-5 -rotate-45" />
  </>
);

// ─── INTERSECTION REVEAL WRAPPER ─────────────────────────────────────────────

const SoftReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ─── COZY NAVIGATION ARCHITECTURE ────────────────────────────────────────────

const LandingNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F3EA]/80 backdrop-blur-md border-b border-[#3E3024]/5 py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-xl transition-transform group-hover:rotate-12 duration-300">📜</span>
          <span className="font-serif font-black text-xl text-[#3E3024] tracking-tight">
            Book<span className="text-[#556B2F]">Wise</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Shelves', 'Method', 'Journal', 'FAQ'].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="font-sans text-xs font-semibold text-[#3E3024]/70 hover:text-[#3E3024] tracking-widest uppercase transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="font-sans text-xs font-bold text-[#3E3024]/70 hover:text-[#3E3024] transition-colors">Sign In</Link>
          <Link to="/login" className="font-sans text-xs font-bold px-4 py-2.5 rounded-full bg-[#556B2F] text-[#F8F3EA] hover:bg-[#435524] transition-all shadow-sm hover:shadow-md active:scale-98">
            Enter Sanctuary
          </Link>
        </div>
      </div>
    </nav>
  );
};

// ─── MAIN LANDING COMPONENT ──────────────────────────────────────────────────

const Landing = () => {
  return (
    <div className="bg-[#F8F3EA] text-[#3E3024] min-h-screen font-sans antialiased selection:bg-[#A3B18A]/30 selection:text-[#3E3024]">
      <LandingNav />

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
        <TinyStars />
        
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          
          {/* Hero Left Copy */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3E6D0] border border-[#3E3024]/10 text-[#6F4E37] font-sans text-[10px] font-bold uppercase tracking-widest mb-6">
              ☕ Welcome to your quiet sanctuary
            </div>
            
            <h1 className="font-serif text-4xl sm:text-6xl font-black text-[#3E3024] leading-[1.1] mb-6">
              Every book <br />
              deserves to be <br />
              <span className="italic font-normal text-[#B66A50] underline decoration-[#C89B3C]/40 decoration-wavy underline-offset-8">
                remembered.
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#3E3024]/80 max-w-md mb-10 leading-relaxed font-medium">
              Escape the digital noise. BookWise is an elegant journal framework built to map your current reading trajectories, collect margin insights, and display your life volume stacked cleanly on gorgeous virtual timber.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/login" className="font-sans px-7 py-4 rounded-full bg-[#B66A50] text-[#FFFDF8] font-bold text-xs hover:bg-[#A25B42] transition-all shadow-md hover:shadow-lg active:scale-98 text-center tracking-wider uppercase">
                Start My Reading Log
              </Link>
              <a href="#shelves" className="font-sans px-7 py-4 rounded-full border border-[#3E3024]/10 bg-[#FFFDF8] text-[#3E3024] hover:bg-[#F3E6D0] font-bold text-xs transition-all text-center tracking-wider uppercase">
                Browse The Shelves
              </a>
            </div>
          </div>

          {/* Hero Right Canvas */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full h-[380px] sm:h-[460px]">
            <div className="absolute inset-0 bg-radial from-[#F3E6D0]/50 to-transparent pointer-events-none" />
            
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 bg-[#FFFDF8] border border-[#3E3024]/10 rounded-2xl shadow-xl p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-2 right-3 text-lg opacity-20 font-serif">✿</div>
              
              <div className="relative mt-8 flex flex-col items-center justify-end flex-1 pb-4">
                {/* Cat Sleeping */}
                <div className="absolute -top-3 z-30 flex flex-col items-center animation-float">
                  <div className="bg-[#C89B3C] w-12 h-6 rounded-t-full relative shadow-xs">
                    <div className="absolute top-1 left-2 w-1 h-1 rounded-full bg-[#3E3024]/40" />
                    <div className="absolute -top-1.5 left-1 w-2 h-2 bg-[#C89B3C] rotate-45 rounded-xs" />
                    <div className="absolute -top-1.5 right-2 w-2 h-2 bg-[#C89B3C] rotate-45 rounded-xs" />
                  </div>
                  <div className="text-[8px] font-sans text-[#3E3024]/40 font-bold -mt-0.5">zzz</div>
                </div>

                {/* Stack of Books */}
                <div className="w-40 h-5 bg-[#D8A7B1] rounded-sm border border-black/5 shadow-xs relative" />
                <div className="w-44 h-6 bg-[#556B2F] rounded-sm border border-black/5 shadow-xs relative mt-[-2px] flex items-center justify-between px-3">
                  <div className="w-1 h-full bg-white/10" />
                  <div className="text-[8px] font-serif text-white/80 scale-90">VOL II</div>
                </div>
                <div className="w-48 h-7 bg-[#B66A50] rounded-sm border border-black/5 shadow-md relative mt-[-2px] flex items-center px-4">
                  <div className="w-full h-px bg-white/20" />
                </div>
              </div>

              {/* Coffee and Glasses */}
              <div className="border-t border-[#3E3024]/10 pt-4 flex items-center justify-between px-2">
                <div className="flex items-end gap-1.5 relative">
                  <div className="absolute -top-6 left-2 flex flex-col gap-0.5 opacity-40 animate-pulse">
                    <div className="w-1 h-2 bg-[#6F4E37] rounded-full blur-[1px] transform rotate-12" />
                    <div className="w-1 h-2 bg-[#6F4E37] rounded-full blur-[1px] transform -rotate-12 ml-1" />
                  </div>
                  <div className="w-7 h-7 bg-[#FFFDF8] border-2 border-[#6F4E37] rounded-b-xl rounded-tr-sm relative flex items-center justify-center">
                    <div className="absolute -right-2 top-1.5 w-2.5 h-3.5 border-2 border-[#6F4E37] rounded-r-full border-l-0" />
                    <div className="w-4 h-4 bg-[#6F4E37] rounded-full scale-75" />
                  </div>
                </div>

                <div className="flex gap-1 opacity-60">
                  <div className="w-5 h-5 rounded-full border border-[#3E3024] bg-transparent" />
                  <div className="w-2 h-px bg-[#3E3024] self-center" />
                  <div className="w-5 h-5 rounded-full border border-[#3E3024] bg-transparent" />
                </div>
              </div>
            </div>

            <div className="absolute top-12 right-2 sm:right-8 bg-[#FFFDF8] border border-[#3E3024]/10 rounded-xl p-3 shadow-lg flex items-center gap-2 animation-float">
              <span className="text-xl">🌿</span>
              <span className="font-serif text-xs font-bold italic text-[#3E3024]">Read softly.</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── CORE VALUES ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#F3E6D0]/40 border-y border-[#3E3024]/5">
        <div className="max-w-5xl mx-auto">
          <SoftReveal className="text-center mb-16">
            <span className="text-[#556B2F] font-sans text-xs font-bold uppercase tracking-widest block mb-2">The Sanctuary Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E3024]">Built for structural cataloging calm.</h2>
          </SoftReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((val, idx) => (
              <SoftReveal key={idx} delay={idx * 60}>
                <div className="p-6 h-full rounded-2xl bg-[#FFFDF8] border border-[#3E3024]/5 shadow-xs flex flex-col gap-4">
                  <div className="text-2xl w-10 h-10 rounded-xl bg-[#F8F3EA] flex items-center justify-center border border-[#3E3024]/5">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#3E3024] mb-2">{val.title}</h3>
                    <p className="font-sans text-xs sm:text-sm text-[#3E3024]/70 leading-relaxed font-medium">{val.desc}</p>
                  </div>
                </div>
              </SoftReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE WOODEN BOOKSHELF ────────────────────────────── */}
      <section id="shelves" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <SoftReveal className="text-center mb-20">
            <span className="text-[#B66A50] font-sans text-xs font-bold uppercase tracking-widest block mb-2">Interactive Cabinet</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E3024]">Your Virtual Wooden Shelf</h2>
            <p className="font-sans text-xs sm:text-sm text-[#3E3024]/70 mt-3">Hover or tap a spine to pull the book out for detail inspection.</p>
          </SoftReveal>

          <SoftReveal>
            <div className="relative pt-12 pb-4 px-4 sm:px-8 bg-[#FFFDF8] border border-[#3E3024]/10 rounded-2xl shadow-xl">
              <div className="flex items-end justify-center gap-2 sm:gap-3 h-64 border-b-16 border-[#6F4E37] relative px-2 mb-4 shadow-inner">
                {SHELF_BOOKS.map((book) => (
                  <div
                    key={book.id}
                    className={`${book.spineBg} ${book.width} ${book.height} ${book.text} rounded-t-sm rounded-b-xs border-x border-t border-black/10 flex flex-col justify-between items-center py-4 cursor-pointer shelf-spine-lift transition-all duration-300 relative group`}
                    style={{ boxShadow: '2px 4px 10px rgba(0,0,0,0.15), inset 1px 0 0 rgba(255,255,255,0.1)' }}
                  >
                    <span className="text-[10px] opacity-40 font-mono tracking-widest">{book.ornament}</span>
                    <p className="font-serif text-[10px] sm:text-xs font-black tracking-wide truncate whitespace-nowrap px-1 opacity-90 select-none" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      {book.title}
                    </p>
                    {book.ribbon !== 'transparent' ? (
                      <div className={`absolute bottom-0 w-2 h-6 ${book.ribbon} translate-y-3 rounded-b-xs shadow-xs`} />
                    ) : (
                      <span className="text-[9px] opacity-40 font-sans tracking-tight">||</span>
                    )}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#3E3024] text-[#FFFDF8] text-[9px] font-sans font-bold uppercase tracking-wider py-1 px-2.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                      by {book.author}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full h-3 bg-[#4E3626] rounded-b-sm -mt-4 mb-8 opacity-90" />
            </div>
          </SoftReveal>
        </div>
      </section>

      {/* ── PARCHMENT TIMELINE JOURNEY ───────────────────────── */}
      <section id="method" className="py-24 px-6 bg-[#F3E6D0]/40 border-t border-[#3E3024]/5">
        <div className="max-w-4xl mx-auto">
          <SoftReveal className="text-center mb-20">
            <span className="text-[#556B2F] font-sans text-xs font-bold uppercase tracking-widest block mb-2">The Cycle Journey</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E3024]">Mapping The Reading Lifecycle</h2>
          </SoftReveal>

          <div className="relative border-l-2 border-[#A3B18A] ml-4 sm:ml-8 space-y-12">
            {[
              { state: 'Want To Read', marker: '🌱', body: 'Pin incoming recommendations, store aesthetic snaps, and hold upcoming volumes inside a placeholder staging ground.' },
              { state: 'Currently Reading', marker: '📖', body: 'Log your real-time incremental percentages, map timestamped notes, and update active diary modules.' },
              { state: 'Finished & Cataloged', marker: '🪵', body: 'Slide your completed book entry onto permanent custom shelves alongside complete seasonal telemetry reports.' },
              { state: 'AI Reflection Cycle', marker: '🔮', body: 'Receive automatic contextual mapping, connecting newly updated patterns with matching archive files.' }
            ].map((step, idx) => (
              <SoftReveal key={idx} className="relative pl-8 group">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#FFFDF8] border-2 border-[#556B2F] flex items-center justify-center -translate-x-1/2 -translate-y-1/4 shadow-sm group-hover:bg-[#A3B18A] transition-colors duration-300">
                  <span className="text-xs">{step.marker}</span>
                </div>
                <div className="p-5 rounded-xl bg-[#FFFDF8] border border-[#3E3024]/10 shadow-xs max-w-2xl">
                  <h3 className="font-serif text-base font-bold text-[#3E3024] mb-1.5">{step.state}</h3>
                  <p className="font-sans text-xs sm:text-sm text-[#3E3024]/70 leading-relaxed font-medium">{step.body}</p>
                </div>
              </SoftReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HANDWRITTEN JOURNAL PREVIEW ──────────────────────── */}
      <section id="journal" className="py-24 px-6 border-t border-[#3E3024]/5">
        <div className="max-w-4xl mx-auto">
          <SoftReveal className="text-center mb-16">
            <span className="text-[#6F4E37] font-sans text-xs font-bold uppercase tracking-widest block mb-2">Telemetry Canvas</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E3024]">Your Quiet Reading Diary</h2>
          </SoftReveal>

          <SoftReveal>
            <div className="rounded-2xl border border-[#3E3024]/15 bg-[#FFFDF8] p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#3E3024 1px, transparent 1px)', backgroundSize: '100% 28px', transform: 'translateY(8px)' }} />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-8 border-b border-[#3E3024]/10 gap-2">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#3E3024]">Volume Progress Tracking</h4>
                    <p className="font-sans text-[11px] font-bold text-[#556B2F] tracking-wide uppercase mt-0.5">🌸 Active Operational Ledger</p>
                  </div>
                  <span className="font-serif text-xs italic text-[#3E3024]/50">Updated June 2026</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Books Vaulted', value: '47 Volumes', color: 'bg-[#F3E6D0]/50' },
                    { label: 'Active Pages', value: '3 Streams', color: 'bg-[#A3B18A]/20' },
                    { label: 'Sanctuary Streak', value: '23 Days 🔥', color: 'bg-[#FFFDF8]' },
                    { label: 'Saved Marginalia', value: '18 Citations', color: 'bg-[#D8A7B1]/20' }
                  ].map((stat, idx) => (
                    <div key={idx} className={`${stat.color} p-4 rounded-xl border border-[#3E3024]/10 shadow-xs flex flex-col justify-between`}>
                      <span className="font-sans text-[10px] font-bold text-[#3E3024]/50 uppercase tracking-wider">{stat.label}</span>
                      <p className="font-serif text-base font-black text-[#3E3024] mt-2">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#F8F3EA]/60 border border-[#3E3024]/10 rounded-xl p-5">
                  <p className="font-serif text-xs font-bold text-[#3E3024] mb-6">Historical Reading Rhythm (Vols / Month)</p>
                  <div className="flex items-end gap-3 h-24 pt-2">
                    {[18, 42, 28, 70, 38, 55, 48, 92, 52, 68, 32, 60].map((hVal, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <div 
                          className="w-full rounded-t-sm transition-all duration-500 bg-[#556B2F]/40"
                          style={{ 
                            height: `${hVal}%`,
                            backgroundColor: idx === 7 ? '#B66A50' : ''
                          }} 
                        />
                        <span className="font-mono text-[9px] text-[#3E3024]/40 font-bold">
                          {['J','F','M','A','M','J','J','A','S','O','N','D'][idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SoftReveal>
        </div>
      </section>

      {/* ── GENRE MATRIX EXPLORATION (Fixed Tag Here) ───────── */}
      <section id="genres" className="py-24 px-6 bg-[#F3E6D0]/20 border-t border-[#3E3024]/5">
        <div className="max-w-6xl mx-auto">
          <SoftReveal className="text-center mb-16">
            <span className="text-[#556B2F] font-sans text-xs font-bold uppercase tracking-widest block mb-2">Matrix</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E3024]">Dynamic Library Clusters</h2>
          </SoftReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {GENRES.map((gen, idx) => (
              <SoftReveal key={idx} delay={idx * 40}>
                <div className={`p-4 rounded-xl border border-[#3E3024]/10 bg-[#FFFDF8] hover:border-[#3E3024]/20 transition-all duration-300 transform ${gen.alignment} hover:rotate-0 hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-28 shadow-2xs`}>
                  <p className="font-serif text-xs font-bold text-[#3E3024] tracking-tight">{gen.name}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-sans text-[10px] text-[#3E3024]/50 font-medium">{gen.count}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#556B2F]/30" />
                  </div>
                </div>
              </SoftReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARCHMENT TESTIMONIAL PAPERS ────────────────────── */}
      <section className="py-24 px-6 bg-[#F3E6D0]/30 border-t border-[#3E3024]/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <SoftReveal key={idx} delay={idx * 60}>
                <div className={`${rev.tint} p-6 rounded-xl border border-[#3E3024]/10 shadow-sm flex flex-col justify-between h-full relative transform rotate-1 hover:rotate-0 transition-transform duration-300`}>
                  <div className="absolute left-0 inset-y-0 w-1 bg-[#B66A50]/20 rounded-l-xl pointer-events-none" />
                  <p className="font-sans text-xs sm:text-sm text-[#3E3024]/80 italic leading-relaxed mb-6 font-medium">
                    "{rev.text}"
                  </p>
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#3E3024]">{rev.user}</h5>
                    <p className="font-sans text-[10px] text-[#3E3024]/50 uppercase tracking-widest font-bold mt-0.5">{rev.role}</p>
                  </div>
                </div>
              </SoftReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTEBOOK ACCORDION FAQS ─────────────────────────── */}
      <section id="faq" className="py-24 px-6 border-t border-[#3E3024]/5">
        <div className="max-w-2xl mx-auto">
          <SoftReveal className="text-center mb-16">
            <span className="text-[#556B2F] font-sans text-xs font-bold uppercase tracking-widest block mb-2">Descriptive Index</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E3024]">Frequently Inquired</h2>
          </SoftReveal>

          <div className="space-y-3">
            {MODULE_FAQS.map((faq, idx) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <SoftReveal key={idx} delay={idx * 40}>
                  <div className="border border-[#3E3024]/10 bg-[#FFFDF8] rounded-xl overflow-hidden transition-all shadow-2xs">
                    <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F3E6D0]/20 transition-colors">
                      <span className="font-serif text-xs sm:text-sm font-bold text-[#3E3024] pr-4">{faq.q}</span>
                      <span className={`text-xs transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 border-t border-[#3E3024]/5' : 'max-h-0'}`}>
                      <p className="p-5 font-sans text-xs sm:text-sm text-[#3E3024]/70 leading-relaxed font-medium bg-[#F8F3EA]/30">{faq.a}</p>
                    </div>
                  </div>
                </SoftReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA CLOSING BOOK BLOCK ────────────────────────── */}
      <section className="py-24 px-6 text-center border-t border-[#3E3024]/5">
        <SoftReveal>
          <div className="max-w-3xl mx-auto p-10 sm:p-16 rounded-2xl bg-linear-to-b from-[#F3E6D0] to-[#F8F3EA] border border-[#3E3024]/10 shadow-lg relative overflow-hidden">
            <div className="absolute -top-6 -left-6 text-3xl opacity-10 font-serif">★</div>
            <div className="absolute -bottom-6 -right-6 text-3xl opacity-10 font-serif">✿</div>

            <span className="text-[#B66A50] font-sans text-[10px] font-bold uppercase tracking-widest block mb-3">Open Sanctuary Space</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E3024] mb-4">Claim your warm reading corner today.</h2>
            <p className="font-sans text-xs sm:text-sm text-[#3E3024]/70 mb-8 max-w-sm mx-auto font-medium">
              Join a dedicated network of individual readers cataloging milestones and logging conceptual volumes cleanly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login" className="font-sans px-6 py-3.5 rounded-full bg-[#556B2F] text-[#F8F3EA] font-bold text-xs tracking-wider uppercase shadow-md hover:bg-[#435524] transition-colors">
                Instantiate My Personal Shelf
              </Link>
            </div>
          </div>
        </SoftReveal>
      </section>

      {/* ── SIMPLE LITERARY FOOTER ─────────────────────────── */}
      <footer className="border-t border-[#3E3024]/10 py-10 px-6 bg-[#F3E6D0]/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-base">📜</span>
            <span className="font-serif font-black text-sm text-[#3E3024] tracking-tight">BookWise</span>
          </div>
          
          <div className="flex items-center gap-6">
            {['Features', 'Library', 'Dashboard'].map((fLink) => (
              <a key={fLink} href="#" className="font-sans text-[11px] font-bold text-[#3E3024]/50 hover:text-[#3E3024] tracking-widest uppercase transition-colors">{fLink}</a>
            ))}
          </div>

          <p className="font-mono text-[10px] font-bold text-[#3E3024]/40 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} BookWise. Context cataloged softly.
          </p>
        </div>
      </footer>

      {/* ── DEEP LITERARY STYLE INJECTIONS ─────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }

        @keyframes microFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animation-float { animation: microFloat 4.5s ease-in-out infinite; }

        .shelf-spine-lift:hover {
          transform: translateY(-16px) scale(1.02);
          box-shadow: 8px 12px 20px rgba(62, 48, 36, 0.25) !important;
          z-index: 40;
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transform: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Landing;