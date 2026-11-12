import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, X, Sparkles } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

interface FloatingWidgetProps {
  phone?: string;
}

const FloatingContactWidget: React.FC<FloatingWidgetProps> = ({ phone = '+919657086779' }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-3 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-amber-600 shadow-lg shadow-slate-900/10 border border-white/60 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Expanded Quick Options */}
      {isExpanded && (
        <div className="glass-panel-dark rounded-2xl p-3 shadow-2xl border border-white/20 flex flex-col gap-2 min-w-[210px] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-2 text-xs font-semibold text-amber-400">
            <span>Quick Connect</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-amber-500/20 hover:text-amber-300 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-green-500/20 text-green-400">
              <Phone className="h-4 w-4" />
            </div>
            <span>Direct Call</span>
          </a>

          <a
            href={`https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent("Hello Ashwath Realtors, I am interested in your construction services and flats.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-green-500/20 hover:text-green-300 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <MessageSquare className="h-4 w-4" />
            </div>
            <span>WhatsApp Chat</span>
          </a>

          <ScrollLink
            to="contact"
            smooth={true}
            duration={600}
            offset={-90}
            onClick={() => setIsExpanded(false)}
            className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-colors font-bold"
          >
            <div className="p-1.5 rounded-lg bg-slate-950/20 text-slate-950">
              <Sparkles className="h-4 w-4" />
            </div>
            <span>Schedule Site Visit</span>
          </ScrollLink>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-amber-950/90 text-white backdrop-blur-xl border border-amber-500/40 shadow-xl shadow-amber-950/20 hover:shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
        <Phone className="h-4 w-4 text-amber-400" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          {isExpanded ? 'Close' : 'Get in Touch'}
        </span>
      </button>
    </div>
  );
};

export default FloatingContactWidget;

