import { Link } from 'react-router-dom';
import { Heart, Shield, Zap, Users, ChevronRight, Star } from 'lucide-react';

const PROFILE_PHOTOS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=face",
];

const FEATURES = [
  { icon: <Shield size={26} />, title: "Discrétion Totale", desc: "Votre vie privée est notre priorité absolue. Échanges hautement sécurisés." },
  { icon: <Star size={26} />, title: "Élite Ivoirienne", desc: "Une communauté exclusive de profils triés sur le volet à Abidjan." },
  { icon: <Zap size={26} />, title: "Connexion Flash", desc: "Swipez, Matchez, Rencontrez. La simplicité au service du luxe." },
];

const Home = () => {
  return (
    <div className="bg-bg-dark text-white min-h-screen font-sans">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pinterest/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />

        {/* Floating Photo Mosaic */}
        <div className="absolute inset-0 z-0 opacity-10 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] pointer-events-none">
           <div className="grid grid-cols-3 md:grid-cols-6 gap-4 p-4 grayscale">
              {PROFILE_PHOTOS.map((src, i) => (
                <div key={i} className={`rounded-3xl overflow-hidden aspect-[3/4] ${i % 2 === 0 ? 'translate-y-12' : '-translate-y-12'}`}>
                   <img src={src} alt="Elite" className="w-full h-full object-cover" />
                </div>
              ))}
           </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl animate-fade-up">
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] font-bold tracking-[0.2em] uppercase text-pinterest">
              <Star size={14} fill="currentColor" /> L'Elite des Rencontres en Côte d'Ivoire
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold font-serif mb-8 leading-[1.05] tracking-tight">
            Rencontrez <br />
            <span className="bg-gradient-to-r from-pinterest to-rose-400 bg-clip-text text-transparent">l'Exceptionnel</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Bienvenue sur <span className="text-white font-semibold">Rencontre De Luxe</span>. 
            Découvrez une expérience raffinée pour des connexions authentiques et prestigieuses.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to="/register" className="group relative px-12 py-5 bg-pinterest rounded-2xl font-bold text-white shadow-xl shadow-pinterest/20 hover:scale-105 hover:bg-red-700 transition-all duration-300 overflow-hidden">
               <span className="relative z-10 flex items-center gap-2">
                 Commencer l'Expérience <ChevronRight size={20} />
               </span>
            </Link>
            <Link to="/login" className="px-12 py-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl font-bold text-white hover:bg-white/10 transition-all duration-300 shadow-lg">
               Se Connecter
            </Link>
          </div>

          <div className="mt-20 flex items-center justify-center gap-10 opacity-30">
             <div className="flex items-center gap-2">
                <Users size={18} /> <span className="text-xs font-bold uppercase tracking-widest">50k+ Membres</span>
             </div>
             <div className="flex items-center gap-2">
                <Shield size={18} /> <span className="text-xs font-bold uppercase tracking-widest">100% Vérifiés</span>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-[#0a0a0f]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-10 rounded-4xl bg-white/[0.02] border border-white/5 hover:border-pinterest/30 hover:bg-white/[0.04] transition-all group shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-pinterest/10 flex items-center justify-center text-pinterest mb-8 group-hover:scale-110 group-hover:bg-pinterest group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 px-6 relative overflow-hidden bg-white/5">
        <div className="absolute inset-0 bg-pinterest/5 blur-[150px] animate-pulse" />
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-up">
          <h2 className="text-4xl md:text-6xl font-bold font-serif mb-10 tracking-tight">Votre histoire commence ici.</h2>
          <p className="text-gray-400 mb-14 text-lg max-w-xl mx-auto leading-relaxed">
            Rejoignez le cercle privé des rencontres de prestige en Côte d'Ivoire.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 px-14 py-6 bg-white text-gray-900 font-extrabold rounded-3xl hover:scale-110 transition-all shadow-2xl shadow-white/10 active:scale-95">
            S'inscrire Gratuitement <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
