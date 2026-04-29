import { useState, useMemo } from 'react';
import SwipeCard from '../components/SwipeCard';
import { SlidersHorizontal, RefreshCcw, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Discover = () => {
  const { adminProfiles } = useApp();
  const [tab, setTab] = useState('Tous');
  const [currentIndex, setCurrentIndex] = useState(0);

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
    setCurrentIndex(prev => prev + 1);
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
    </div>
  );
};

export default Discover;
