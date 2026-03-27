import { useState } from 'react';
import { Heart, X, MapPin, Info, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const SwipeCard = ({ profile, onSwipe, active }) => {
  const [exitDirection, setExitDirection] = useState(null);

  const handleSwipe = (direction) => {
    setExitDirection(direction);
    setTimeout(() => {
      onSwipe(direction, profile.id);
    }, 450);
  };

  if (!profile) return null;

  return (
    <div className={`absolute inset-0 transition-all duration-500 ease-out ${!active ? 'pointer-events-none opacity-0 scale-95' : 'opacity-100 scale-100'} ${exitDirection === 'left' ? 'swipe-left' : exitDirection === 'right' ? 'swipe-right' : ''}`}>
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-[#0f0e1a] border border-[rgba(255,255,255,0.1)]">
        
        {/* Photo */}
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e1a] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0e1a]/40 via-transparent to-transparent opacity-60" />

        {/* Badges (Top) */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <div className="flex gap-2">
            {profile.isVIP && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold text-[10px] font-bold tracking-widest uppercase">
                <Star size={10} fill="currentColor" /> VIP Elite
              </span>
            )}
            {profile.isNew && (
              <span className="px-3 py-1.5 rounded-full bg-rose/20 backdrop-blur-md border border-rose/30 text-rose text-[10px] font-bold tracking-widest uppercase">
                Nouveau
              </span>
            )}
          </div>
          {profile.online && (
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span className="text-white text-[9px] font-bold">LIVE</span>
            </div>
          )}
        </div>

        {/* Info (Bottom) */}
        <div className="absolute bottom-24 left-6 right-6">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className="text-4xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
                {profile.name}, {profile.age}
                <ShieldCheck className="text-[#3b82f6]" size={24} fill="currentColor" fillOpacity={0.2} />
              </h2>
              <p className="text-white/80 flex items-center gap-1.5 text-sm mt-1">
                <MapPin size={14} className="text-gold" /> {profile.location}
              </p>
            </div>
            <Link to={`/profile/${profile.id}`} className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
              <Info size={20} />
            </Link>
          </div>
          
          <div className="flex gap-2 flex-wrap mt-4">
            {profile.interests?.slice(0, 3).map((interest, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/90 text-xs">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8 px-6">
          <button 
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-rose/20 hover:border-rose/50 hover:text-rose hover:scale-110 transition-all shadow-xl group"
          >
            <X size={28} strokeWidth={2.5} className="group-active:scale-90" />
          </button>
          
          <button 
            onClick={() => handleSwipe('right')}
            className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-gold text-white border-4 border-white/10 hover:scale-110 transition-all shadow-[0_10px_40px_rgba(212,165,116,0.4)] active:scale-95 group"
          >
            <Heart size={36} fill="white" className="group-active:scale-90" />
          </button>

          <button 
            onClick={() => handleSwipe('right')} // Simuler un coup de foudre (Super Like)
            className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-gold/20 hover:border-gold/50 hover:text-gold hover:scale-110 transition-all shadow-xl group"
          >
            <Star size={24} fill="currentColor" className="group-active:scale-90" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SwipeCard;
