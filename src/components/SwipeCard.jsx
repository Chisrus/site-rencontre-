import { useState, useEffect } from 'react';
import { Heart, X, MapPin, Info, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const SwipeCard = ({ profile, onSwipe, active }) => {
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      setExitX(400); // Swipe right
      setTimeout(() => onSwipe('right', profile.id), 300);
    } else if (info.offset.x < -100) {
      setExitX(-400); // Swipe left
      setTimeout(() => onSwipe('left', profile.id), 300);
    }
  };

  const handleProgrammaticSwipe = (direction) => {
    setExitX(direction === 'right' ? 400 : -400);
    setTimeout(() => {
      onSwipe(direction, profile.id);
    }, 300);
  };

  if (!profile) return null;

  return (
    <motion.div 
      className={`absolute inset-0 ${!active ? 'pointer-events-none' : 'pointer-events-auto cursor-grab active:cursor-grabbing'}`}
      style={{
        x,
        rotate,
        opacity: active ? opacity : 0,
        zIndex: active ? 10 : 1,
      }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={
        exitX !== 0 
          ? { x: exitX, opacity: 0, transition: { duration: 0.3 } } 
          : { x: 0, opacity: active ? 1 : 0, scale: active ? 1 : 0.95, y: active ? 0 : 32 }
      }
      transition={exitX !== 0 ? {} : { type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#0a0a0f] border border-white/10 group">
        
        {/* Photo Image */}
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105 pointer-events-none"
        />

        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-[#06060c]/40 to-transparent opacity-95 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060c]/60 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Swipe Indicators (LIKE / NOPE) */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 border-4 border-green-500 rounded-xl px-4 py-1 text-green-500 font-black text-4xl uppercase tracking-widest rotate-[-15deg] pointer-events-none z-20 shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-black/20 backdrop-blur-sm">
          LIKE
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 border-4 border-rose-500 rounded-xl px-4 py-1 text-rose-500 font-black text-4xl uppercase tracking-widest rotate-[15deg] pointer-events-none z-20 shadow-[0_0_20px_rgba(244,63,94,0.3)] bg-black/20 backdrop-blur-sm">
          NOPE
        </motion.div>

        {/* ── TOP BADGES ── */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
          <div className="flex gap-2">
            {profile.isVIP && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eab308]/20 backdrop-blur-md border border-[#eab308]/30 text-[#eab308] text-[9px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <Star size={10} fill="currentColor" /> VIP Prestige
              </span>
            )}
            {profile.isNew && (
              <span className="px-3 py-1.5 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-500/30 text-rose-400 text-[9px] font-bold tracking-widest uppercase">
                Nouvelle muse
              </span>
            )}
          </div>
          {profile.online && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
              <span className="text-white text-[9px] font-bold tracking-widest uppercase">En Ligne</span>
            </div>
          )}
        </div>

        {/* ── PROFILE INFO ── */}
        <div className="absolute bottom-28 left-6 right-6 pointer-events-none">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 font-['Playfair_Display',serif] tracking-tight pointer-events-auto">
                {profile.name}, {profile.age}
                <ShieldCheck className="text-blue-400" size={20} fill="currentColor" fillOpacity={0.2} />
              </h2>
              <p className="text-white/60 flex items-center gap-1.5 text-[13px] mt-2 tracking-wide">
                <MapPin size={14} className="text-[#eab308]" /> {profile.location}
              </p>
            </div>
            
            {/* View Details Button */}
            <Link 
              to={`/profile/${profile.id}`} 
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all shadow-lg pointer-events-auto"
              onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking info
            >
              <Info size={20} />
            </Link>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {profile.interests?.slice(0, 3).map((interest, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-medium tracking-wide">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* ── ACTION BTM BUTTONS ── */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-6 px-6 z-30">
          
          {/* Pass */}
          <button 
            onClick={() => handleProgrammaticSwipe('left')}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 hover:scale-110 transition-all shadow-2xl group active:scale-95"
          >
            <X size={26} strokeWidth={2} />
          </button>
          
          {/* Like */}
          <button 
            onClick={() => handleProgrammaticSwipe('right')}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-[84px] h-[84px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#d4a574] to-[#b8860b] text-black border-[6px] border-[#0a0a0f] hover:scale-110 transition-all shadow-[0_12px_40px_rgba(212,165,116,0.3)] active:scale-95 group relative"
          >
            <div className="absolute inset-0 rounded-full border border-white/20 mix-blend-overlay" />
            <Heart size={36} fill="black" className="relative z-10" />
          </button>

          {/* Super Like */}
          <button 
            onClick={() => handleProgrammaticSwipe('right')}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 hover:bg-[#eab308]/10 hover:border-[#eab308]/30 hover:text-[#eab308] hover:scale-110 transition-all shadow-2xl group active:scale-95"
          >
            <Star size={22} fill="currentColor" opacity="0.8" className="group-hover:opacity-100" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default SwipeCard;

