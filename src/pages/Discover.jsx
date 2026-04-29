import { useState, useMemo } from 'react';
import SwipeCard from '../components/SwipeCard';
import { SlidersHorizontal, RefreshCcw, Sparkles, MessageCircle, Heart, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const { adminProfiles, addMatch } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Tous');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(null); // Profile object when a match occurs

  // Merge base profiles + admin-created profiles
  const allProfiles = useMemo(() => {
    return [...adminProfiles].sort(() => Math.random() - 0.5);
  }, [adminProfiles]);

  const filtered = useMemo(() => {
    return allProfiles.filter(p => {
      if (tab === 'VIP') return p.isVIP;
      if (tab === 'Nouveaux') return p.isNew;
      return true;
    });
  }, [allProfiles, tab]);

  const handleSwipe = (direction, profileId) => {
    console.log(`Swiped ${direction} on ${profileId}`);
    
    if (direction === 'right') {
      const profile = filtered[currentIndex];
      addMatch(profile);
      setShowMatch(profile);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const currentProfile = filtered[currentIndex];
  const nextProfile = filtered[currentIndex + 1];

  return (
    <div className="min-h-screen bg-[#06060c] pt-24 pb-20 overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4a574]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container max-w-lg mx-auto h-[78vh] flex flex-col relative z-10">
        
        {/* ── HEADER NAVIGATION ── */}
        <div className="flex items-center justify-between mb-8 px-4 animate-[fadeUp_0.6s_ease-out]">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white font-['Playfair_Display',serif] tracking-tight">Découverte</h1>
            <div className="px-2.5 py-1 bg-[#eab308]/10 border border-[#eab308]/30 rounded-md flex items-center gap-1 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <Sparkles size={10} className="text-[#eab308]" fill="currentColor" />
              <span className="text-[9px] text-[#eab308] font-bold uppercase tracking-[0.2em]">Privilège</span>
            </div>
          </div>
          <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-lg active:scale-95">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-2 mb-8 px-4 overflow-x-auto no-scrollbar animate-[fadeIn_0.8s_ease-out]">
          {['Tous', 'VIP', 'Nouveaux'].map(t => (
            <button 
              key={t} 
              onClick={() => { setTab(t); setCurrentIndex(0); }}
              className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all tracking-wider ${
                tab === t 
                  ? 'bg-gradient-to-r from-[#d4a574] to-[#b8860b] text-black shadow-[0_4px_16px_rgba(212,165,116,0.2)]' 
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── CARD STACK AREA ── */}
        <div className="flex-1 relative mx-4 animate-[fadeUp_0.8s_ease-out_0.2s_both]">
          {currentProfile ? (
            <>
              {/* NEXT PROFILE PREVIEW */}
              {nextProfile && (
                <div className="absolute inset-0 scale-[0.92] translate-y-6 opacity-40 blur-[2px] pointer-events-none transition-all duration-500">
                   <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-[#0a0a0f] border border-white/5">
                      <img src={nextProfile.image} alt="Next" className="w-full h-full object-cover grayscale brightness-50" />
                   </div>
                </div>
              )}

              {/* ACTIVE CARD */}
              <SwipeCard 
                key={currentProfile.id}
                profile={currentProfile} 
                active={true}
                onSwipe={handleSwipe}
              />
            </>
          ) : (
             /* EMPTY STATE */
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-xl relative group">
                <div className="absolute inset-0 rounded-full border border-[#eab308]/20 animate-ping" />
                <RefreshCcw size={36} strokeWidth={1.5} className="text-[#eab308] opacity-70 group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display',serif]">La sélection du jour est terminée.</h2>
              <p className="text-white/40 text-sm mb-10 leading-relaxed max-w-xs">
                Vous avez découvert tous les profils exclusifs correspondant à vos critères actuels. 
              </p>
              <button 
                onClick={handleReset}
                className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#d4a574] to-[#b8860b] text-black font-bold uppercase tracking-[0.1em] text-xs rounded-full hover:scale-105 transition-all shadow-[0_8px_32px_rgba(212,165,116,0.3)]"
              >
                Actualiser le Cercle <RefreshCcw size={16} />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ── MATCH MODAL ── */}
      <AnimatePresence>
        {showMatch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#06060c]/90 backdrop-blur-2xl"
          >
            <div className="relative w-full max-w-md text-center">
              <motion.div
                initial={{ scale: 0.5, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="mb-8"
              >
                <h2 className="text-6xl md:text-7xl font-['Playfair_Display',serif] text-white font-black italic tracking-tighter mb-2">
                  Match !
                </h2>
                <p className="text-[#eab308] uppercase tracking-[0.4em] text-xs font-bold">Vous vous plaisez mutuellement</p>
              </motion.div>

              <div className="flex items-center justify-center gap-4 mb-12">
                <motion.div 
                  initial={{ x: -50, rotate: -10, opacity: 0 }}
                  animate={{ x: 0, rotate: -5, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-32 h-44 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl"
                >
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" alt="Vous" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8860b] flex items-center justify-center z-10 shadow-[0_0_30px_rgba(212,165,116,0.5)]"
                >
                  <Heart size={24} fill="black" />
                </motion.div>
                <motion.div 
                  initial={{ x: 50, rotate: 10, opacity: 0 }}
                  animate={{ x: 0, rotate: 5, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-32 h-44 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl"
                >
                  <img src={showMatch.image} alt={showMatch.name} className="w-full h-full object-cover" />
                </motion.div>
              </div>

              <div className="space-y-4 px-8">
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => navigate('/messages')}
                  className="w-full py-4 bg-gradient-to-r from-[#d4a574] to-[#b8860b] text-black font-bold rounded-full shadow-[0_10px_40px_rgba(212,165,116,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  <MessageCircle size={18} />
                  Envoyer un message
                </motion.button>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => { setShowMatch(null); setCurrentIndex(prev => prev + 1); }}
                  className="w-full py-4 bg-white/5 border border-white/10 text-white/70 font-bold rounded-full hover:bg-white/10 transition-colors uppercase tracking-widest text-xs"
                >
                  Continuer à jouer
                </motion.button>
              </div>
            </div>

            <button 
              onClick={() => { setShowMatch(null); setCurrentIndex(prev => prev + 1); }}
              className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 transition-all"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Discover;
