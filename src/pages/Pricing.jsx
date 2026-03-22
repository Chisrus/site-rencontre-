import { Check, Star, Crown, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PLANS = [
  {
    name: "Gratuit", price: "0€", sub: null,
    desc: "Pour découvrir la communauté.",
    features: ["5 likes par jour", "Accès aux profils", "Messagerie limitée", "Profil basique"],
    icon: <Shield size={24} />, iconBg: 'var(--bg-soft)', iconColor: 'var(--text-muted)',
    btn: "S'inscrire gratuitement", btnStyle: { border: '1.5px solid var(--border-soft)', color: 'var(--text-body)', background: 'transparent' }
  },
  {
    name: "Premium", price: "29€", sub: "/mois",
    desc: "L'expérience complète pour des vraies rencontres.",
    features: ["Likes illimités", "Messages illimités", "Voir qui t'a visité", "Mise en avant du profil", "Mode incognito", "Filtres avancés"],
    icon: <Star size={24} />, iconBg: 'var(--violet-soft)', iconColor: 'var(--violet)',
    btn: "Devenir Premium 💜", popular: true,
    btnStyle: { background: 'linear-gradient(135deg, var(--violet), var(--indigo))', color: '#fff', border: 'none', boxShadow: 'var(--shadow-violet)' }
  },
  {
    name: "VIP Prestige", price: "99€", sub: "/mois",
    desc: "Un service sur mesure par des experts.",
    features: ["Tout le Premium", "Badge VIP exclusif", "Matching par experts humains", "Conciergerie 24/7", "Accès soirées privées"],
    icon: <Crown size={24} />, iconBg: 'rgba(250, 204, 21, 0.15)', iconColor: '#f59e0b',
    btn: "Demander l'accès VIP 👑",
    btnStyle: { background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: '#fff', border: 'none', boxShadow: '0 6px 20px rgba(245,158,11,0.35)' }
  }
];

const Pricing = () => (
  <div style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #faf5ff 50%, #fff1fb 100%)', padding: '5rem 1.5rem', minHeight: '80vh' }}>
    <div style={{ maxWidth: 1050, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="badge badge-violet" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Abonnements</span>
        <h1 style={{ fontWeight: 700, fontSize: 'clamp(1.6rem,4vw,2.4rem)', marginBottom: '0.75rem' }}>
          Investis dans ton bonheur 💜
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto', fontSize: '0.95rem' }}>
          Choisis le plan qui te correspond. L'amour véritable commence par une vraie rencontre.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem', alignItems: 'center' }}>
        {PLANS.map((plan, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 24,
            border: plan.popular ? '2px solid var(--violet)' : '1.5px solid var(--border-soft)',
            padding: plan.popular ? '2.5rem 2rem' : '2rem 1.75rem',
            boxShadow: plan.popular ? '0 16px 48px rgba(124,58,237,0.16)' : 'var(--shadow-sm)',
            position: 'relative',
            transform: plan.popular ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = plan.popular ? 'scale(1.05)' : 'scale(1.02)'; e.currentTarget.style.boxShadow = plan.popular ? '0 24px 60px rgba(124,58,237,0.22)' : '0 12px 36px rgba(124,58,237,0.1)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = plan.popular ? 'scale(1.03)' : 'scale(1)'; e.currentTarget.style.boxShadow = plan.popular ? '0 16px 48px rgba(124,58,237,0.16)' : 'var(--shadow-sm)'; }}>

            {plan.popular && (
              <div style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, var(--violet), var(--indigo))',
                color: '#fff', fontSize: '0.72rem', fontWeight: 700,
                padding: '5px 18px', borderRadius: 999, letterSpacing: '0.08em', textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>⭐ Le plus populaire</div>
            )}

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: plan.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: plan.iconColor, flexShrink: 0,
              }}>{plan.icon}</div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem' }}>{plan.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{plan.desc}</p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '2.2rem', color: 'var(--text-dark)' }}>{plan.price}</span>
              {plan.sub && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{plan.sub}</span>}
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {plan.features.map((f, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-body)' }}>
                  <Check size={15} color={plan.popular ? 'var(--violet)' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link to="/register" className="btn w-full" style={{ ...plan.btnStyle, display: 'block', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.25s' }}>
              {plan.btn}
            </Link>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
        🔒 Paiement sécurisé · Résiliation facile à tout moment · Aucun frais caché
      </p>
    </div>
  </div>
);

export default Pricing;
