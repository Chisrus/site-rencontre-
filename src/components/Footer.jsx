import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#0f0e17', color: 'rgba(255,255,255,0.7)', padding: '3.5rem 1.5rem 2rem' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>

      <div>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: '1rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, var(--violet), var(--rose))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Heart size={16} fill="white" color="white" />
          </div>
          <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>RencontreDeLuxe</span>
        </Link>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.6, maxWidth: 280 }}>
          Des rencontres sincères et authentiques pour tous les célibataires francophones.
        </p>
      </div>

      <div>
        <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem' }}>Navigation</h4>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
          {[['Découvrir', '/discover'], ['Tarifs', '/pricing'], ['FAQ', '/faq'], ['Confidentialité', '/privacy']].map(([label, to]) => (
            <li key={to}><Link to={to} style={{ color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--violet-light)'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}>{label}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem' }}>Suivez-nous</h4>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[Instagram, Twitter, Facebook].map((Icon, i) => (
            <a key={i} href="#" style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.65)', transition: 'all 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'var(--violet)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--violet)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}>
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>

    <div style={{ maxWidth: 1100, margin: '2.5rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center', fontSize: '0.8rem' }}>
      &copy; {new Date().getFullYear()} rencontredeluxe.online — Tous droits réservés.
    </div>
  </footer>
);

export default Footer;
