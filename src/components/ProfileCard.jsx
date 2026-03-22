import { Link } from 'react-router-dom';
import { Heart, X, MapPin } from 'lucide-react';

const ProfileCard = ({ profile }) => (
  <div style={{
    borderRadius: 22, overflow: 'hidden', position: 'relative',
    aspectRatio: '3/4', boxShadow: 'var(--shadow-card)',
    transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer',
  }}
  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(124,58,237,0.2)'; }}
  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}>

    <img src={profile.image} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

    {/* Gradient overlay */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(15,14,23,0.9) 100%)' }} />

    {/* Online indicator — top-left dot */}
    <div style={{
      position: 'absolute', top: 14, left: 14,
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: profile.online ? '#22c55e' : '#9ca3af',
        border: '2px solid rgba(255,255,255,0.9)',
        boxShadow: profile.online ? '0 0 8px rgba(34,197,94,0.6)' : 'none',
      }} />
      <span style={{
        fontSize: '0.68rem', fontWeight: 600, color: '#fff',
        background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
        padding: '2px 8px', borderRadius: 999,
      }}>
        {profile.online ? 'En ligne' : 'Hors ligne'}
      </span>
    </div>

    {/* Badges */}
    <div style={{ position: 'absolute', top: 14, right: 12, display: 'flex', gap: 6, flexDirection: 'column', alignItems: 'flex-end' }}>
      {profile.isVIP && <span className="badge badge-violet" style={{ fontSize: '0.68rem' }}>✨ VIP</span>}
      {profile.isNew && <span className="badge badge-rose" style={{ fontSize: '0.68rem' }}>🆕 Nouveau</span>}
      {profile.matchPercentage && (
        <div style={{
          background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.25)', color: '#fff',
          fontSize: '0.78rem', fontWeight: 700, padding: '4px 10px', borderRadius: 999,
        }}>
          {profile.matchPercentage}% 💜
        </div>
      )}
    </div>

    {/* Info */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1.25rem' }}>
      <Link to={`/profile/${profile.id}`} style={{ textDecoration: 'none' }}>
        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.2rem' }}>
          {profile.name}, {profile.age}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4, marginBottom: '0.75rem' }}>
          <MapPin size={12} /> {profile.location}
        </p>
      </Link>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', transition: 'all 0.2s', cursor: 'pointer',
        }}
        onMouseOver={e => { e.currentTarget.style.background = 'var(--rose)'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}>
          <X size={19} />
        </button>
        <button style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--violet), var(--indigo))',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', transition: 'all 0.2s', cursor: 'pointer',
          boxShadow: '0 4px 18px rgba(124,58,237,0.45)',
        }}
        onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.12)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
          <Heart size={19} fill="white" />
        </button>
      </div>
    </div>
  </div>
);

export default ProfileCard;
