import { useState, useMemo } from 'react';
import SwipeCard from '../components/SwipeCard';
import { SlidersHorizontal, RefreshCcw, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Discover = () => {
  const { adminProfiles } = useApp();
  const [tab, setTab] = useState('Tous');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]); // Pourrait servir à "Rewind" si Premium

  /* Merge base profiles + admin-created profiles */
  // J'utilise principalement adminProfiles ici car ils ont été mis à jour avec les photos réalistes
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
    setHistory(prev => [...prev, { id: profileId, direction }]);
    setCurrentIndex(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setHistory([]);
  };

  const currentProfile = filtered[currentIndex];
  const nextProfile = filtered[currentIndex + 1];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-6 pb-20 overflow-hidden">
      <div className="container max-w-lg mx-auto h-[85vh] flex flex-col">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white font-serif tracking-tight text-pinterest">Découverte</h1>
            <div className="px-2 py-0.5 bg-pinterest/10 border border-pinterest/20 rounded text-[10px] text-pinterest font-bold uppercase tracking-widest">Premium</div>
          </div>
          <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 px-4 overflow-x-auto no-scrollbar">
          {['Tous', 'VIP', 'Nouveaux'].map(t => (
            <button 
              key={t} 
              onClick={() => { setTab(t); setCurrentIndex(0); }}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                tab === t 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-white/40 border-white/10 hover:border-white/25'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Card Stack Area */}
        <div className="flex-1 relative mx-4">
          {currentProfile ? (
            <>
              {/* Card Background (Next profile preview) */}
              {nextProfile && (
                <div className="absolute inset-0 scale-[0.92] translateY-4 opacity-40 blur-sm pointer-events-none">
                   <div className="w-full h-full rounded-3xl overflow-hidden bg-[#151520] border border-white/5">
                      <img src={nextProfile.image} alt="Next" className="w-full h-full object-cover grayscale" />
                   </div>
                </div>
              )}

              {/* Main Active Card */}
              <SwipeCard 
                key={currentProfile.id}
                profile={currentProfile} 
                active={true}
                onSwipe={handleSwipe}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in px-8">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <RefreshCcw size={40} className="text-gold opacity-50" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Plus de profils autour de vous !</h2>
              <p className="text-white/40 text-sm mb-10 leading-relaxed">
                Vous avez vu tous les profils correspondant à vos critères pour aujourd'hui. Elargissez vos filtres ou revenez plus tard !
              </p>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-8 py-4 bg-pinterest text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-pinterest/20"
              >
                Recommencer <RefreshCcw size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Stats (Optional premium touch) */}
        <div className="mt-8 flex justify-center gap-12 px-4 opacity-50">
           <div className="text-center">
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Tes Matches</p>
              <p className="text-white font-bold">12</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Vues Profil</p>
              <p className="text-white font-bold">48</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Discover;
