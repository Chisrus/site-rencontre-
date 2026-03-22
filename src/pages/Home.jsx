import { Link } from 'react-router-dom';
import { Heart, Shield, Zap, Users, ChevronRight } from 'lucide-react';

/* ── Real Unsplash photos (diverse African/mixed profiles) ── */
const PROFILE_PHOTOS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300&h=400&fit=crop&crop=face",
];

/* Offset logic: even index cols get pushed down */
const isOffset = (i) => i % 2 === 1;

const FEATURES = [
  { icon: <Shield size={26} />, title: "Profils vérifiés", desc: "Chaque membre est authentique. Zéro faux profil, zéro arnaque." },
  { icon: <Zap size={26} />, title: "Matching intelligent", desc: "Notre algorithme te propose des profils vraiment compatibles." },
  { icon: <Heart size={26} />, title: "Rencontres sincères", desc: "Une communauté bienveillante axée sur des relations vraies." },
];

const Home = () => {
  return (
    <div style={{ background: 'var(--bg-white)' }}>

      {/* ══════════════════════════════════
          HERO — Grille de profils + CTA
      ══════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(160deg, #f0f4ff 0%, #faf5ff 55%, #fff1fb 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Photo Mosaic */}
        <div style={{ flex: 1, overflow: 'hidden', padding: '2rem 1rem 0', maxHeight: '56vh' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 10,
          }}>
            {PROFILE_PHOTOS.map((src, i) => (
              <div key={i} style={{ transform: isOffset(i) ? 'translateY(28px)' : 'translateY(0)', transition: 'transform 0.4s' }}>
                <img
                  src={src}
                  alt={`Profil ${i + 1}`}
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    borderRadius: 18,
                    boxShadow: '0 4px 18px rgba(0,0,0,0.13)',
                    transition: 'transform 0.35s, box-shadow 0.35s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05) translateY(-6px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.2)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.13)'; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Fade gradient over the bottom of the photos */}
        <div style={{
          height: 120,
          background: 'linear-gradient(to bottom, transparent, #f8f5ff)',
          marginTop: -80,
          position: 'relative',
          zIndex: 1,
        }} />

        {/* CTA Block */}
        <div className="animate-fade-up text-center" style={{
          padding: '1.5rem 1.5rem 4rem',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <span className="badge badge-violet" style={{ fontSize: '0.78rem' }}>
              <Users size={13} /> Plus de 50 000 membres actifs
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-main)',
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
            color: 'var(--text-dark)',
            lineHeight: 1.25,
            marginBottom: '0.6rem',
          }}>
            Fais des rencontres autrement
          </h1>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
            marginBottom: '0.5rem',
          }} className="gradient-text-violet">
            avec — rencontredeluxe.online
          </p>

          <p className="animate-fade-up delay-1" style={{
            color: 'var(--text-muted)',
            maxWidth: 480,
            margin: '0 auto 2rem',
            fontSize: '0.95rem',
          }}>
            Des célibataires authentiques, des profils vérifiés, et une communauté qui te ressemble.
          </p>

          <div className="animate-fade-up delay-2" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            maxWidth: 340,
            margin: '0 auto',
          }}>
            <Link to="/register" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
              Créer un compte gratuit
              <ChevronRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-outline" style={{ fontSize: '0.95rem', padding: '0.85rem 2rem' }}>
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURES — 3 points clés
      ══════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 700 }}>
              Pourquoi choisir{' '}
              <span className="gradient-text-violet">Rencontre De Luxe</span> ?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="card" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.25s, box-shadow 0.25s' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(124,58,237,0.14)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%', margin: '0 auto 1.25rem',
                  background: 'var(--violet-soft)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', color: 'var(--violet)'
                }}>{f.icon}</div>
                <h3 style={{ fontWeight: 600, marginBottom: '0.6rem', fontSize: '1.05rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROMO BAND — Banner coloré
      ══════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, var(--violet) 0%, var(--indigo) 100%)',
        padding: '4rem 1.5rem',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
          Ton âme sœur t'attend déjà. 💜
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1rem' }}>
          Inscription gratuite • Profils vérifiés • Matching par affinités
        </p>
        <Link to="/register" className="btn" style={{
          background: '#fff', color: 'var(--violet)', fontWeight: 700,
          padding: '0.9rem 2.5rem', fontSize: '1rem',
          boxShadow: '0 6px 24px rgba(0,0,0,0.16)',
        }}>
          Rejoindre la communauté →
        </Link>
      </section>

      {/* ══════════════════════════════════
          SECOND PROFILES ROW — Sunset hero image
      ══════════════════════════════════ */}
      <section style={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
        <img src="/hero-bg.png" alt="Coucher de soleil romantique"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(79,70,229,0.7) 0%, rgba(124,58,237,0.5) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          gap: '1.5rem', padding: '2rem',
        }}>
          <h2 style={{ color: '#fff', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.6rem,4vw,2.6rem)', textAlign: 'center' }}>
            "L'amour sincère commence par une vraie rencontre."
          </h2>
          <Link to="/discover" className="btn" style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            color: '#fff', backdropFilter: 'blur(8px)',
            padding: '0.8rem 2rem',
          }}>
            Voir les profils
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
