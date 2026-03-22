import { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

/* ── Base real profiles (non-admin, always shown) ── */
const BASE_PROFILES = [
  { id: 1001, name: "Éléonore", age: 28, location: "Paris, France", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=550&fit=crop&crop=face", matchPercentage: 94, isVIP: true, isNew: false, interests: ["Gastronomie", "Art", "Voyages"] },
  { id: 1002, name: "Alexandre", age: 32, location: "Genève, Suisse", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=550&fit=crop&crop=face", matchPercentage: 88, isVIP: false, isNew: false, interests: ["Sport", "Musique", "Finance"] },
];

const TABS = ['Tous', 'VIP', 'Nouveaux'];

const Discover = () => {
  const { adminProfiles } = useApp();
  const [tab, setTab] = useState('Tous');

  /* Merge base profiles + admin-created profiles */
  const allProfiles = [...adminProfiles, ...BASE_PROFILES];

  const filtered = allProfiles.filter(p => {
    if (tab === 'VIP') return p.isVIP;
    if (tab === 'Nouveaux') return p.isNew;
    return true;
  });

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg-soft)', paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: '1.75rem', marginBottom: '0.25rem' }}>Découvrir 🔍</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{filtered.length} profils correspondent</p>
          </div>
          <button className="btn btn-outline" style={{ gap: '0.5rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center' }}>
            <SlidersHorizontal size={16} /> Filtres avancés
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.5rem 1.25rem', borderRadius: 999, fontWeight: 600,
              fontSize: '0.85rem', cursor: 'pointer', border: '1.5px solid',
              transition: 'all 0.2s', fontFamily: 'var(--font-main)',
              background: tab === t ? 'var(--violet)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--text-body)',
              borderColor: tab === t ? 'var(--violet)' : 'var(--border-soft)',
            }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(p => <ProfileCard key={p.id} profile={p} />)}
        </div>
      </div>
    </div>
  );
};

export default Discover;
