import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Phone } from 'lucide-react';

const Login = () => (
  <div style={{
    minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '2rem 1rem',
    background: 'linear-gradient(160deg, #f0f4ff 0%, #faf5ff 55%, #fff1fb 100%)',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Decorative circles */}
    {[['10%','10%','rgba(124,58,237,0.08)'], ['80%','70%','rgba(244,63,94,0.07)']].map(([left, top, bg], i) => (
      <div key={i} style={{ position: 'absolute', left, top, width: 320, height: 320, borderRadius: '50%', background: bg, filter: 'blur(70px)', zIndex: 0 }} />
    ))}

    <div className="card animate-fade-up" style={{ width: '100%', maxWidth: 440, padding: '2.5rem 2rem', position: 'relative', zIndex: 1, borderRadius: 24 }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16, margin: '0 auto 1rem',
          background: 'linear-gradient(135deg, var(--violet-soft), #fce7eb)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <LogIn size={26} color="var(--violet)" />
        </div>
        <h1 style={{ fontWeight: 700, fontSize: '1.6rem', marginBottom: '0.4rem' }}>Bon retour ! 👋</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Connecte-toi pour retrouver tes messages.</p>
      </div>

      <form onSubmit={e => e.preventDefault()}>
        <div className="input-group">
          <label htmlFor="email">Email ou numéro de téléphone</label>
          <div style={{ position: 'relative' }}>
            <Phone size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input id="email" type="text" className="input" style={{ paddingLeft: '2.75rem' }} placeholder="ton@email.com ou +225 07..." required />
          </div>
        </div>

        <div className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="password">Mot de passe</label>
            <a href="#" style={{ fontSize: '0.8rem', color: 'var(--violet)' }}>Oublié ?</a>
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input id="password" type="password" className="input" style={{ paddingLeft: '2.75rem' }} placeholder="••••••••" required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
          Se connecter
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-soft)', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        Pas encore membre ?{' '}
        <Link to="/register" style={{ color: 'var(--violet)', fontWeight: 600 }}>Créer un compte gratuit</Link>
      </div>
    </div>
  </div>
);

export default Login;
