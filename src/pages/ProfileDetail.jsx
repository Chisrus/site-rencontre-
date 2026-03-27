import { Link, useParams } from 'react-router-dom';
import { MapPin, Heart, X, Star, ShieldCheck, Info, MessageCircle, ArrowLeft, Share2, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProfileDetail = () => {
  const { id } = useParams();
  const { adminProfiles } = useApp();
  
  // Find profile in context or use MOCK as fallback for demo
  const profile = adminProfiles.find(p => p.id === parseInt(id)) || {
    id: 1,
    name: "Éléonore",
    age: 28,
    location: "Paris 8e (à 2 km)",
    image: "/profile-f.png",
    matchPercentage: 94,
    isVIP: true,
    verified: true,
    bio: "Passionnée d'art contemporain et de gastronomie. Je recherche une connexion authentique avec un homme ambitieux, qui sait apprécier les belles choses de la vie.\n\nLa spontanéité et l'élégance sont pour moi des valeurs non négociables.",
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
    <div className="min-h-screen bg-white">
      {/* Mobile Header (Sticky) */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <Link to="/discover" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-gray-800" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto lg:flex lg:h-screen lg:overflow-hidden">
        
        {/* LEFT PANE: Image Gallery (Fixed/Sticky on Desktop) */}
        <div className="lg:w-[55%] h-[70vh] lg:h-full relative overflow-hidden lg:p-6">
          <div className="w-full h-full relative lg:rounded-4xl overflow-hidden group">
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Desktop Back Button */}
            <Link 
              to="/discover" 
              className="hidden lg:flex absolute top-6 left-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-sm items-center justify-center text-gray-800 hover:scale-110 transition-all z-20"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>

            {/* Image Overlay/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>

        {/* RIGHT PANE: Interaction & Details (Scrollable) */}
        <div className="lg:w-[45%] h-full flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-10 py-8 lg:py-12">
            
            {/* Action Bar (Top of interaction panel) */}
            <div className="hidden lg:flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <button className="px-6 py-3 bg-pinterest text-white font-bold rounded-full hover:bg-red-700 transition-all transform active:scale-95 shadow-lg shadow-red-500/20">
                Enregistrer
              </button>
            </div>

            {/* Profile Header Info */}
            <div className="mb-10 animate-fade-up">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                  {profile.name}, {profile.age}
                </h1>
                {profile.verified && <ShieldCheck className="w-8 h-8 text-blue-500 fill-blue-50/50" />}
              </div>
              
              <div className="flex items-center gap-6 text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-pinterest" /> {profile.location}
                </span>
                {profile.matchPercentage && (
                  <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
                    {profile.matchPercentage}% de match
                  </span>
                )}
              </div>
            </div>

            {/* Bio Section */}
            <div className="mb-10 animate-fade-up delay-1">
              <h2 className="text-lg font-bold text-gray-900 mb-4">À propos</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                {profile.bio}
              </p>
            </div>

            {/* Interests */}
            <div className="mb-10 animate-fade-up delay-2">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Centres d'intérêt</h2>
              <div className="flex flex-wrap gap-2">
                {(profile.interests || []).map((interest, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="mb-10 animate-fade-up delay-3">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Informations supplémentaires</h2>
              <div className="grid grid-cols-2 gap-4">
                {profile.details && Object.entries(profile.details).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">{key}</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacer for bottom actions on mobile */}
            <div className="h-24 lg:hidden" />
          </div>

          {/* Floating Interaction Panel (Bottom) */}
          <div className="fixed bottom-6 inset-x-4 lg:relative lg:inset-auto lg:p-10 bg-gradient-to-t from-white via-white to-transparent pt-10">
            <div className="flex items-center justify-center gap-4 animate-fade-up delay-3">
              <button className="w-16 h-16 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all hover:scale-110 active:scale-95 group">
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              
              <Link to="/messages" className="flex-1 max-w-[200px] h-16 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
                <MessageCircle className="w-6 h-6" />
                <span>Message</span>
              </Link>

              <button className="w-16 h-16 rounded-full bg-pinterest shadow-[0_10px_30px_rgba(230,0,35,0.3)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all">
                <Heart className="w-8 h-8 fill-current" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
