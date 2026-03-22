import { Link, useParams } from 'react-router-dom';
import { MapPin, Heart, X, Star, ShieldCheck, Info, MessageCircle, ArrowLeft } from 'lucide-react';

const MOCK_PROFILE = {
  id: 1,
  name: "Éléonore",
  age: 28,
  location: "Paris 8e (à 2 km)",
  image: "/profile-f.png",
  matchPercentage: 94,
  isVIP: true,
  verified: true,
  bio: "Passionnée d'art contemporain et de gastronomie. Je recherche une connexion authentique avec un homme ambitieux, qui sait apprécier les belles choses de la vie. Les week-ends improvisés à Rome ou à Londres sont mes moments préférés.\n\nLa spontanéité et l'élégance sont pour moi des valeurs non négociables.",
  interests: ["Gastronomie", "Art contemporain", "Voyages", "Oenologie", "Théâtre", "Ski"],
  details: {
    profession: "Directrice Artistique",
    education: "Master Beaux-Arts",
    height: "1m72",
    drinking: "Occasionnellement",
    smoking: "Non"
  }
};

const ProfileDetail = () => {
  const { id } = useParams(); // Using static mock data regardless of ID for demo
  const profile = MOCK_PROFILE;

  return (
    <div className="min-h-screen bg-bg-dark pb-24">
      {/* Cover Image */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-[rgba(10,10,15,0.4)] to-[rgba(10,10,15,0.1)]" />
        
        {/* Top Navbar */}
        <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-10">
          <Link to="/discover" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <button className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors">
            <Info className="w-6 h-6" />
          </button>
        </div>

        {/* Floating Actions */}
        <div className="absolute -bottom-8 right-8 flex gap-4 z-20">
          <button className="w-16 h-16 rounded-full bg-[rgba(15,15,20,0.9)] backdrop-blur border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-muted hover:text-rose hover:border-rose transition-all hover:scale-110 shadow-lg">
            <X className="w-8 h-8" />
          </button>
          
          <Link to="/messages" className="w-16 h-16 rounded-full bg-[rgba(15,15,20,0.9)] backdrop-blur border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-bg-dark transition-all hover:scale-110 shadow-[0_0_20px_rgba(212,165,116,0.3)]">
            <MessageCircle className="w-8 h-8 fill-current" />
          </Link>

          <button className="w-16 h-16 rounded-full bg-gradient-rose border-none flex items-center justify-center text-white hover:scale-110 transition-all shadow-[0_0_20px_rgba(232,101,122,0.4)]">
            <Heart className="w-8 h-8 fill-current" />
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 lg:px-8 mt-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8 animate-slide-up">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-serif text-white">{profile.name}, {profile.age}</h1>
                {profile.verified && <ShieldCheck className="w-8 h-8 text-[#4ade80]" />}
              </div>
              <p className="text-xl text-muted flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" /> {profile.location}
              </p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h2 className="text-xl font-serif text-gold mb-4">À propos de moi</h2>
              <p className="text-[rgba(255,255,255,0.8)] whitespace-pre-line leading-relaxed text-lg">
                {profile.bio}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-serif text-gold mb-4">Centres d'intérêt</h2>
              <div className="flex flex-wrap gap-3">
                {profile.interests.map((interest, idx) => (
                  <span key={idx} className="bg-[rgba(255,255,255,0.05)] border border-light px-4 py-2 rounded-full text-white">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6 animate-slide-up delay-100">
            <div className="glass p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-muted uppercase tracking-wider">Compatibilité</span>
                <span className="text-gold font-bold text-xl">{profile.matchPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-gold rounded-full"
                  style={{ width: `${profile.matchPercentage}%` }}
                />
              </div>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="font-serif text-lg text-gold mb-4">Informations</h3>
              <ul className="space-y-4">
                {Object.entries(profile.details).map(([key, value]) => (
                  <li key={key} className="flex flex-col">
                    <span className="text-xs text-muted capitalize mb-1">{key}</span>
                    <span className="text-white bg-[rgba(255,255,255,0.02)] px-3 py-2 rounded-lg border border-light">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
