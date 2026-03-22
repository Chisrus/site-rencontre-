import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Camera, ArrowRight, ArrowLeft, Heart, Phone } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const steps = ['Infos de base', 'Préférences', 'Ta photo'];

  return (
    <div style={{
      minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(160deg, #f0f4ff 0%, #faf5ff 55%, #fff1fb 100%)',
    }}>
      <div className="card animate-fade-up" style={{ width: '100%', maxWidth: 500, padding: '2.5rem 2rem', borderRadius: 24 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 15, margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, var(--violet), var(--rose))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Heart size={24} fill="white" color="white" />
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            {steps[step - 1]}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Étape {step} sur 3</p>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '1.25rem' }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{
                height: 4, borderRadius: 99,
                width: n <= step ? 28 : 14,
                background: n <= step ? 'var(--violet)' : 'var(--border-soft)',
                transition: 'all 0.35s ease',
              }} />
            ))}
          </div>
        </div>

        <form onSubmit={e => { e.preventDefault(); if (step < 3) setStep(step + 1); }}>
          {/* STEP 1 */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="input-group">
                <label>Ton prénom</label>
                <div style={{ position: 'relative' }}>
                  <User size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input className="input" style={{ paddingLeft: '2.75rem' }} type="text" placeholder="Marie, Karim..." required />
                </div>
              </div>
              <div className="input-group">
                <label>Email ou numéro de téléphone</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input className="input" style={{ paddingLeft: '2.75rem' }} type="text" placeholder="ton@email.com ou +225 07..." required />
                </div>
              </div>
              <div className="input-group">
                <label>Mot de passe</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input className="input" style={{ paddingLeft: '2.75rem' }} type="password" placeholder="Minimum 8 caractères" required />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="input-group">
                <label>Ta ville</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <select className="input" style={{ paddingLeft: '2.75rem' }}>
                    <option value="">Sélectionne ta ville...</option>
                    <option>Abidjan</option>
                    <option>Dakar</option>
                    <option>Paris</option>
                    <option>Montréal</option>
                    <option>Bruxelles</option>
                    <option>Lyon</option>
                    <option>Lomé</option>
                    <option>Cotonou</option>
                    <option>Douala</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Je suis</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {['Un homme', 'Une femme'].map(g => (
                    <button key={g} type="button" style={{
                      padding: '0.75rem', borderRadius: 12, border: '1.5px solid var(--border-soft)',
                      background: 'var(--bg-soft)', color: 'var(--text-dark)',
                      fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem',
                      fontFamily: 'var(--font-main)', transition: 'all 0.2s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.background = 'var(--violet-soft)'; e.currentTarget.style.color = 'var(--violet)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-soft)'; e.currentTarget.style.background = 'var(--bg-soft)'; e.currentTarget.style.color = 'var(--text-dark)'; }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="input-group">
                <label>Je cherche</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {['Un homme', 'Une femme'].map(g => (
                    <button key={g} type="button" style={{
                      padding: '0.75rem', borderRadius: 12, border: '1.5px solid var(--border-soft)',
                      background: 'var(--bg-soft)', color: 'var(--text-dark)',
                      fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem',
                      fontFamily: 'var(--font-main)', transition: 'all 0.2s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.background = 'var(--rose-soft)'; e.currentTarget.style.color = 'var(--rose)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-soft)'; e.currentTarget.style.background = 'var(--bg-soft)'; e.currentTarget.style.color = 'var(--text-dark)'; }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                📸 Les profils avec photo reçoivent 8x plus de messages
              </p>
              <div style={{
                width: 120, height: 120, borderRadius: '50%', margin: '0 auto 2rem',
                border: '2px dashed var(--violet)', background: 'var(--violet-soft)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: 'var(--violet)',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#ddd6fe'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--violet-soft)'; }}>
                <Camera size={30} />
                <span style={{ fontSize: '0.75rem', marginTop: '0.4rem', fontWeight: 600 }}>Ajouter</span>
              </div>
              <Link to="/discover" className="btn btn-primary w-full" style={{ fontSize: '0.95rem', display: 'block', textAlign: 'center' }}>
                Finaliser mon inscription 🎉
              </Link>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                En continuant, tu acceptes nos conditions d'utilisation.
              </p>
            </div>
          )}

          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-soft)' }}>
            {step > 1
              ? <button type="button" onClick={() => setStep(step - 1)} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.87rem', fontFamily: 'var(--font-main)' }}>
                  <ArrowLeft size={15} /> Retour
                </button>
              : <div />}
            {step < 3 && (
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--violet)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '0.87rem' }}>
                Suivant <ArrowRight size={15} />
              </button>
            )}
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Déjà membre ? <Link to="/login" style={{ color: 'var(--violet)', fontWeight: 600 }}>Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
