import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--violet), var(--rose))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Heart size={18} fill="white" color="white" />
          </div>
          <span style={{
            fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dark)',
            letterSpacing: '-0.02em'
          }}>
            Rencontre<span style={{ color: 'var(--violet)' }}>DeLuxe</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="md:flex hidden items-center gap-6" style={{ display: 'none' }}>
          <Link to="/discover" style={{ color: 'var(--text-body)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--violet)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-body)'}>Découvrir</Link>
          <Link to="/pricing" style={{ color: 'var(--text-body)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--violet)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-body)'}>Tarifs</Link>
          <Link to="/messages" style={{ color: 'var(--text-body)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--violet)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-body)'}>Messages</Link>
        </div>

        <div className="md:flex hidden items-center gap-3" style={{ display: 'none' }}>
          <Link to="/login" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>Se connecter</Link>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: '0.88rem', padding: '0.65rem 1.4rem' }}>Créer un compte</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}
          className="md:hidden">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="animate-fade-in" style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-soft)',
          padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
          zIndex: 200,
        }}>
          <Link to="/discover" style={{ color: 'var(--text-body)', fontWeight: 500, padding: '0.5rem 0' }} onClick={() => setOpen(false)}>Découvrir</Link>
          <Link to="/pricing" style={{ color: 'var(--text-body)', fontWeight: 500, padding: '0.5rem 0' }} onClick={() => setOpen(false)}>Tarifs</Link>
          <Link to="/messages" style={{ color: 'var(--text-body)', fontWeight: 500, padding: '0.5rem 0' }} onClick={() => setOpen(false)}>Messages</Link>
          <div style={{ height: 1, background: 'var(--border-soft)', margin: '0.25rem 0' }} />
          <Link to="/login" className="btn btn-outline w-full" style={{ textAlign: 'center' }} onClick={() => setOpen(false)}>Se connecter</Link>
          <Link to="/register" className="btn btn-primary w-full" style={{ textAlign: 'center' }} onClick={() => setOpen(false)}>Créer un compte</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
