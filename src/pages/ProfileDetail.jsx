import { Link, useParams } from 'react-router-dom';
import { MapPin, Heart, X, Star, ShieldCheck, Info, MessageCircle, ArrowLeft, Share2, MoreHorizontal, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProfileDetail = () => {
  const { id } = useParams();
  const { adminProfiles } = useApp();
  
  const profile = adminProfiles.find(p => p.id === parseInt(id)) || {
    id: 1,
    name: "Éléonore",
    age: 28,
    location: "Abidjan, Cocody (à 2 km)",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop",
    matchPercentage: 94,
    isVIP: true,
    verified: true,
    bio: "Passionnée d'art contemporain et de gastronomie. Je recherche une connexion authentique avec un partenaire ambitieux, qui sait apprécier les belles choses de la vie.\n\nLa spontanéité et l'élégance sont pour moi des valeurs non négociables.",
    interests: ["Gastronomie", "Art contemporain", "Voyages", "Oenologie", "Théâtre", "Ski"],
    details: {
      profession: "Directrice Artistique",
      education: "Master Beaux-Arts",
      height: "1m72",
      drinking: "Occasionnellement",
      smoking: "Non"
    }
  };

  return (
    <div className="min-h-screen bg-[#06060c] selection:bg-[#eab308]/30 font-sans">
      
      {/* Mobile Header (Sticky) */}
      <div className="lg:hidden sticky top-0 z-50 bg-[#06060c]/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-white/10">
        <Link to="/discover" className="p-2 text-white/70 hover:text-white bg-white/5 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2 text-white/70 hover:text-white bg-white/5 rounded-full transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-white/70 hover:text-white bg-white/5 rounded-full transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto lg:flex lg:h-screen lg:overflow-hidden relative">
        
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#eab308]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* ── LEFT PANE: Image Gallery ── */}
        <div className="lg:w-[50%] xl:w-[45%] h-[70vh] lg:h-full relative overflow-hidden lg:p-8 shrink-0 z-10">
          <div className="w-full h-full relative lg:rounded-[2.5rem] overflow-hidden group shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-white/10">
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
            />
            
            <Link 
              to="/discover" 
              className="hidden lg:flex absolute top-8 left-8 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all z-20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06060c]/40 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>

        {/* ── RIGHT PANE: Details (Scrollable) ── */}
        <div className="lg:w-[50%] xl:w-[55%] h-full flex flex-col relative z-10">
          <div className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-16 py-10 lg:py-16">
            
            {/* Desktop Action Bar */}
            <div className="hidden lg:flex items-center justify-end gap-4 mb-12">
              <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <button className="px-8 py-3.5 bg-gradient-to-r from-[#d4a574] to-[#b8860b] text-black text-xs uppercase tracking-[0.1em] font-bold rounded-full hover:shadow-[0_8px_24px_rgba(212,165,116,0.3)] transition-all hover:scale-105 active:scale-95">
                Sauvegarder
              </button>
            </div>

            {/* Header Info */}
            <div className="mb-12 animate-[fadeUp_0.8s_ease-out]">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-4">
                   <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight font-['Playfair_Display',serif]">
                     {profile.name}, {profile.age}
                   </h1>
                   {profile.verified && <ShieldCheck className="w-8 h-8 text-blue-400" />}
                 </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-4">
                <span className="flex items-center gap-2 text-white/60 text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <MapPin className="w-4 h-4 text-[#eab308]" /> {profile.location}
                </span>
                
                {profile.isVIP && (
                  <span className="flex items-center gap-1.5 text-[#eab308] text-[10px] font-bold uppercase tracking-widest bg-[#eab308]/10 px-4 py-2 rounded-full border border-[#eab308]/30">
                    <Star className="w-3 h-3" fill="currentColor" /> VIP Prestige
                  </span>
                )}
                
                {profile.matchPercentage && (
                  <span className="flex items-center gap-2 text-[#d4a574] font-bold bg-[#d4a574]/10 px-4 py-2 rounded-full border border-[#d4a574]/20 text-sm">
                    <Sparkles className="w-4 h-4" /> {profile.matchPercentage}% de compatibilité
                  </span>
                )}
              </div>
            </div>

            {/* Bio Section */}
            <div className="mb-12 animate-[fadeUp_0.8s_ease-out_0.1s_both]">
              <h2 className="text-[10px] font-bold text-[#eab308] mb-4 uppercase tracking-[0.3em]">À propos</h2>
              <p className="text-white/70 text-base lg:text-lg leading-relaxed whitespace-pre-line font-light">
                {profile.bio}
              </p>
            </div>

            {/* Interests */}
            <div className="mb-12 animate-[fadeUp_0.8s_ease-out_0.2s_both]">
              <h2 className="text-[10px] font-bold text-[#eab308] mb-4 uppercase tracking-[0.3em]">Centres d'intérêt</h2>
              <div className="flex flex-wrap gap-3">
                {(profile.interests || []).map((interest, idx) => (
                  <span 
                    key={idx} 
                    className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/80 rounded-full text-xs font-medium hover:border-white/20 transition-colors cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="mb-16 animate-[fadeUp_0.8s_ease-out_0.3s_both]">
              <h2 className="text-[10px] font-bold text-[#eab308] mb-6 uppercase tracking-[0.3em]">Informations clés</h2>
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {profile.details && Object.entries(profile.details).map(([key, value]) => (
                  <div key={key} className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                    <span className="block text-[9px] uppercase tracking-widest text-white/40 font-bold mb-2">{key === 'profession' ? 'Profession' : key === 'education' ? 'Études' : key === 'height' ? 'Taille' : key === 'drinking' ? 'Alcool' : key === 'smoking' ? 'Fume' : key}</span>
                    <span className="text-white font-medium text-sm lg:text-base">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-32 lg:h-40" />
          </div>

          {/* ── FLOATING INTERACTION PANEL (Bottom) ── */}
          <div className="fixed bottom-6 inset-x-4 lg:absolute lg:bottom-10 lg:inset-x-12 z-50">
            <div className="bg-[#0a0a0f]/90 backdrop-blur-2xl border border-white/10 p-4 rounded-[2rem] flex items-center justify-center gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-[fadeUp_0.8s_ease-out_0.5s_both]">
              
              <button className="w-[60px] h-[60px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-rose-400 hover:border-rose-400/50 hover:bg-rose-500/10 transition-all hover:scale-110 active:scale-95 group">
                <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
              </button>
              
              <Link 
                to="/messages" 
                className="flex-1 max-w-[240px] h-[60px] rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white font-bold flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-widest"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Message</span>
              </Link>

              <button className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8860b] shadow-[0_8px_24px_rgba(212,165,116,0.4)] flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all">
                <Heart className="w-7 h-7" fill="black" />
              </button>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
