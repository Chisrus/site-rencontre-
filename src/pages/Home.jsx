import { Link } from 'react-router-dom';
import { Heart, Shield, Zap, Users, ChevronRight, Star, Sparkles, ArrowRight, MessageCircle, MapPin } from 'lucide-react';

const PROFILE_PHOTOS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=face",
];

/* ── Stat bubble ── */
const Stat = ({ icon, label, val }) => (
  <div className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl"
    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)' }}>
    <div className="text-3xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{val}</div>
    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</div>
  </div>
);

/* ── Feature card ── */
const FeatureCard = ({ icon, color, title, desc, delay }) => (
  <div
    className="group relative p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2"
    style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px)',
      animation: `fadeUp 0.8s ease-out ${delay}s both`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    }}
  >
    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `radial-gradient(circle at 30% 30%, ${color}15, transparent 70%)` }} />
    
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl"
      style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.7 }}>{desc}</p>
  </div>
);

/* ── Profile Preview Card ── */
const ProfilePreview = ({ src, name, age, city, delay }) => (
  <div
    className="group relative rounded-[1.5rem] overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500"
    style={{
      animation: `fadeUp 1s ease-out ${delay}s both`,
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}
  >
    <img src={src} alt={name} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
    
    {/* Love badge */}
    <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white bg-pink-500 shadow-[0_4px_16px_rgba(236,72,153,0.5)] group-hover:scale-125 transition-transform">
      <Heart size={16} fill="white" />
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-5">
      <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{name}, <span className="font-normal">{age}</span></h3>
      <p className="flex items-center gap-1.5 text-white/70 text-xs mt-1">
        <MapPin size={11} className="text-pink-400" /> {city}
      </p>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="text-white min-h-screen font-sans overflow-x-hidden" style={{ position: 'relative' }}>

      {/* ── Vibrant background orbs ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '20%', right: '-15%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '30%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20"
        style={{ zIndex: 1 }}>

        {/* Pill badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-[0.25em] animate-[fadeUp_0.8s_ease-out_both]"
          style={{ background: 'linear-gradient(90deg, rgba(236,72,153,0.2), rgba(234,179,8,0.2))', border: '1px solid rgba(236,72,153,0.4)', backdropFilter: 'blur(20px)', color: '#fbbf24' }}>
          <Sparkles size={14} className="text-pink-400" />
          La Rencontre de vos Rêves commence ici
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.08] tracking-tight mb-8 animate-[fadeUp_0.9s_ease-out_0.1s_both]"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Trouvez{' '}
          <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(135deg, #f472b6, #ec4899, #be185d)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
            l'Amour
          </span>
          <br />
          qui vous{' '}
          <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)', backgroundClip: 'text', WebkitBackgroundClip: 'text', fontStyle: 'italic' }}>
            ressemble
          </span>
          {' '}✨
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-[fadeUp_1s_ease-out_0.2s_both]"
          style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
          Rejoignez des milliers de célibataires who sont prêts à vivre quelque chose d'unique.
          Des rencontres authentiques, des connexions profondes — votre histoire commence maintenant.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-[fadeUp_1s_ease-out_0.3s_both]">
          <Link
            to="/register"
            className="group flex items-center gap-3 px-10 py-5 rounded-full font-extrabold text-white text-base uppercase tracking-wider transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #ec4899, #be185d)',
              boxShadow: '0 12px 40px rgba(236,72,153,0.45)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 50px rgba(236,72,153,0.65)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(236,72,153,0.45)'; }}
          >
            <Heart size={20} fill="white" />
            Je me lance !
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/discover"
            className="flex items-center gap-2 px-10 py-5 rounded-full font-bold text-white text-base tracking-wide transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(20px)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          >
            Voir les profils
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 justify-center animate-[fadeUp_1s_ease-out_0.4s_both]">
          <Stat icon="💕" label="Membres actifs" val="12 000+" />
          <Stat icon="💍" label="Rencontres réussies" val="3 400+" />
          <Stat icon="🌍" label="Villes couvertes" val="25+" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROFILE PREVIEW GRID
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ils ont{' '}
              <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(135deg, #f472b6, #ec4899)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
                trouvé l'amour
              </span>{' '}
              ici 💞
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)' }}>Des milliers de profils vous attendent. Votre match est peut-être là.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PROFILE_PHOTOS.map((src, i) => (
              <ProfilePreview
                key={i}
                src={src}
                name={['Ines', 'Koffi', 'Aïcha', 'Marc', 'Lola', 'Yvan'][i]}
                age={[26, 31, 24, 29, 27, 33][i]}
                city={['Abidjan', 'Bouaké', 'Abidjan', 'Yamoussoukro', 'Abidjan', 'San-Pedro'][i]}
                delay={0.1 * i}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/discover"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm uppercase tracking-wider transition-all hover:-translate-y-1 hover:gap-4"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
              Voir tous les profils <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pourquoi{' '}
              <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(135deg, #fbbf24, #ec4899)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
                nous choisir
              </span>
              {' '}? 🏆
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto' }}>
              Une expérience de rencontre premium, pensée pour des connexions authentiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🔒"
              color="#ec4899"
              title="100% Sécurisé"
              desc="Vos données et échanges sont protégés. Profils vérifiés par notre équipe dédiée."
              delay={0.1}
            />
            <FeatureCard
              icon="⚡"
              color="#fbbf24"
              title="Matchs Instantanés"
              desc="Notre algorithme intelligent vous trouve des correspondances en quelques secondes."
              delay={0.2}
            />
            <FeatureCard
              icon="💬"
              color="#a855f7"
              title="Discussions Illimitées"
              desc="Échangez librement avec vos matches. Notre messagerie fluide rapproche les cœurs."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 text-center overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-6xl mb-8 animate-[floatY_3s_ease-in-out_infinite]">💘</div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Votre histoire{' '}
            <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(135deg, #f472b6, #fbbf24)', backgroundClip: 'text', WebkitBackgroundClip: 'text', fontStyle: 'italic' }}>
              d'amour
            </span>{' '}
            commence ici
          </h2>
          <p className="text-lg mb-12" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Rejoignez une communauté chaleureuse et trouvez la personne qui fait battre votre cœur.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full font-extrabold text-white text-base transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                boxShadow: '0 16px 48px rgba(236,72,153,0.4)',
              }}
            >
              <Heart size={20} fill="white" />
              Créer mon profil gratuit
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-white text-sm transition-all hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
            >
              <MessageCircle size={16} />
              J'ai déjà un compte
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
