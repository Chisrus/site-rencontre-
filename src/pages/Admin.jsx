import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Plus, MessageCircle, Trash2, Eye, Search, Shield, X, Save, Zap, UserPlus } from 'lucide-react';

const Admin = () => {
  const {
    adminProfiles, registeredUsers, chatHistory,
    addAdminProfile, quickCreateProfiles, removeAdminProfile, sendAdminMessage, toggleOnline,
    AVATAR_POOL_F, AVATAR_POOL_M,
  } = useApp();

  const [tab, setTab] = useState('users');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: '', age: '', location: '', bio: '', image: '' });
  const [chatTarget, setChatTarget] = useState(null);
  const [chatMsg, setChatMsg] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [quickCount, setQuickCount] = useState(5);
  const [quickGender, setQuickGender] = useState('mixed');

  const filteredUsers = registeredUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!newProfile.name || !newProfile.age || !newProfile.location) return;
    addAdminProfile({
      ...newProfile,
      age: parseInt(newProfile.age),
      image: newProfile.image || AVATAR_POOL_F[Math.floor(Math.random() * AVATAR_POOL_F.length)],
    });
    setNewProfile({ name: '', age: '', location: '', bio: '', image: '' });
    setShowModal(false);
  };

  const handleQuickCreate = () => {
    quickCreateProfiles(quickCount, quickGender);
  };

  const handleSend = () => {
    if (!chatMsg.trim() || !chatTarget || !selectedProfile) return;
    sendAdminMessage(chatTarget.id, selectedProfile.id, chatMsg);
    setChatMsg('');
  };

  const chatMessages = chatTarget ? Object.entries(chatHistory)
    .filter(([key]) => key.startsWith(`${chatTarget.id}-`))
    .flatMap(([, msgs]) => msgs) : [];

  const TABS = [
    { key: 'users', label: 'Utilisateurs', icon: <Users size={15} /> },
    { key: 'profiles', label: `Profils admin (${adminProfiles.length})`, icon: <Shield size={15} /> },
  ];

  return (
    <div style={{ minHeight: '85vh', background: 'var(--bg-soft)', padding: '2rem 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.4rem' }}>
              <Shield size={22} color="var(--violet)" />
              <h1 style={{ fontWeight: 700, fontSize: '1.5rem' }}>Panneau Admin</h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Gérez les inscrits, créez des profils et discutez.</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
          {[
            { label: 'Inscrits', value: registeredUsers.length, color: 'var(--violet)' },
            { label: 'Actifs', value: registeredUsers.filter(u => u.status === 'actif').length, color: '#10b981' },
            { label: 'Profils admin', value: adminProfiles.length, color: 'var(--rose)' },
            { label: 'Conversations', value: Object.keys(chatHistory).length, color: '#f59e0b' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '0.55rem 1.15rem', borderRadius: 999, fontWeight: 600,
              fontSize: '0.83rem', cursor: 'pointer', border: '1.5px solid',
              transition: 'all 0.2s', fontFamily: 'var(--font-main)',
              display: 'flex', alignItems: 'center', gap: 5,
              background: tab === t.key ? 'var(--violet)' : 'transparent',
              color: tab === t.key ? '#fff' : 'var(--text-body)',
              borderColor: tab === t.key ? 'var(--violet)' : 'var(--border-soft)',
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ════ TAB: USERS ════ */}
        {tab === 'users' && (
          <div>
            <div style={{ position: 'relative', marginBottom: '1rem', maxWidth: 360 }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="input" style={{ paddingLeft: '2.25rem', fontSize: '0.88rem' }}
                placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="card" style={{ overflow: 'hidden', borderRadius: 14 }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--violet-soft)', textAlign: 'left' }}>
                      {['Utilisateur', 'Contact', 'Ville', 'Inscrit', 'Statut', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '0.75rem 0.85rem', fontWeight: 600, color: 'var(--violet)', fontSize: '0.8rem' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u, i) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid var(--border-soft)', background: i % 2 === 0 ? '#fff' : 'var(--bg-soft)' }}>
                        <td style={{ padding: '0.65rem 0.85rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <img src={u.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '0.65rem 0.85rem' }}>{u.email}</td>
                        <td style={{ padding: '0.65rem 0.85rem' }}>{u.city}</td>
                        <td style={{ padding: '0.65rem 0.85rem', color: 'var(--text-muted)' }}>{u.date}</td>
                        <td style={{ padding: '0.65rem 0.85rem' }}>
                          <span className={`badge ${u.status === 'actif' ? 'badge-violet' : 'badge-rose'}`}>{u.status}</span>
                        </td>
                        <td style={{ padding: '0.65rem 0.85rem' }}>
                          <button onClick={() => { setChatTarget(chatTarget?.id === u.id ? null : u); setSelectedProfile(adminProfiles[0] || null); }}
                            title="Discuter" style={{
                              width: 30, height: 30, borderRadius: 8,
                              background: chatTarget?.id === u.id ? 'var(--violet)' : 'var(--violet-soft)',
                              color: chatTarget?.id === u.id ? '#fff' : 'var(--violet)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none',
                            }}>
                            <MessageCircle size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chat Panel */}
            {chatTarget && (
              <div className="card animate-fade-up" style={{ marginTop: '1.25rem', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--violet)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={chatTarget.avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Chat avec {chatTarget.name}</span>
                  </div>
                  <button onClick={() => setChatTarget(null)} style={{ color: '#fff', cursor: 'pointer', background: 'none', border: 'none' }}><X size={16} /></button>
                </div>

                {/* Profile picker */}
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-soft)', background: '#faf8ff' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Envoyer en tant que :</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {adminProfiles.map(p => (
                      <button key={p.id} onClick={() => setSelectedProfile(p)} style={{
                        padding: '0.3rem 0.7rem', borderRadius: 999, fontSize: '0.78rem', fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                        fontFamily: 'var(--font-main)', transition: 'all 0.15s',
                        background: selectedProfile?.id === p.id ? 'var(--violet)' : '#fff',
                        color: selectedProfile?.id === p.id ? '#fff' : 'var(--text-dark)',
                        border: `1.5px solid ${selectedProfile?.id === p.id ? 'var(--violet)' : 'var(--border-soft)'}`,
                      }}>
                        <img src={p.image} alt="" style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }} />
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div style={{ padding: '0.85rem 1rem', minHeight: 80, maxHeight: 200, overflowY: 'auto' }}>
                  {chatMessages.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', padding: '0.75rem 0' }}>Commence la conversation 💬</p>
                  )}
                  {chatMessages.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                      <div style={{
                        background: 'var(--violet)', color: '#fff', padding: '0.45rem 0.85rem',
                        borderRadius: '12px 12px 4px 12px', maxWidth: '70%', fontSize: '0.85rem',
                      }}>
                        <p>{m.text}</p>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', display: 'block', textAlign: 'right' }}>{m.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Send */}
                <div style={{ padding: '0.6rem 1rem', borderTop: '1px solid var(--border-soft)', display: 'flex', gap: 6 }}>
                  <input className="input" style={{ borderRadius: 999, fontSize: '0.85rem' }}
                    placeholder="Écrire un message..." value={chatMsg}
                    onChange={e => setChatMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()} />
                  <button onClick={handleSend} className="btn btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                    Envoyer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════ TAB: ADMIN PROFILES ════ */}
        {tab === 'profiles' && (
          <div>
            {/* Quick Create Section */}
            <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', borderRadius: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.85rem' }}>
                <Zap size={18} color="var(--rose)" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>Création rapide de profils</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
                Génère plusieurs profils en un clic — noms, photos, villes et bios aléatoires.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Nombre</label>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[3, 5, 10, 20].map(n => (
                      <button key={n} onClick={() => setQuickCount(n)} style={{
                        padding: '0.4rem 0.85rem', borderRadius: 999, fontSize: '0.82rem',
                        fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-main)',
                        background: quickCount === n ? 'var(--violet)' : 'var(--bg-soft)',
                        color: quickCount === n ? '#fff' : 'var(--text-body)',
                        border: `1.5px solid ${quickCount === n ? 'var(--violet)' : 'var(--border-soft)'}`,
                        transition: 'all 0.15s',
                      }}>{n}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Genre</label>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[['mixed', 'Mixte 👫'], ['f', 'Femmes 👩'], ['m', 'Hommes 👨']].map(([val, label]) => (
                      <button key={val} onClick={() => setQuickGender(val)} style={{
                        padding: '0.4rem 0.85rem', borderRadius: 999, fontSize: '0.82rem',
                        fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-main)',
                        background: quickGender === val ? 'var(--rose)' : 'var(--bg-soft)',
                        color: quickGender === val ? '#fff' : 'var(--text-body)',
                        border: `1.5px solid ${quickGender === val ? 'var(--rose)' : 'var(--border-soft)'}`,
                        transition: 'all 0.15s',
                      }}>{label}</button>
                    ))}
                  </div>
                </div>

                <button onClick={handleQuickCreate} className="btn btn-rose" style={{ fontSize: '0.88rem', gap: 6 }}>
                  <Zap size={15} /> Générer {quickCount} profils
                </button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {adminProfiles.length} profils admin — visibles sur /discover par tous les utilisateurs.
              </p>
              <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ fontSize: '0.85rem', gap: 5 }}>
                <UserPlus size={15} /> Profil manuel
              </button>
            </div>

            {/* Profiles grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
              {adminProfiles.map(p => (
                <div key={p.id} className="card" style={{ padding: '1.25rem', position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(124,58,237,0.12)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}>
                  <button onClick={() => removeAdminProfile(p.id)}
                    style={{
                      position: 'absolute', top: 10, right: 10, width: 24, height: 24, borderRadius: 6,
                      background: 'var(--rose-soft)', color: 'var(--rose)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none',
                    }} title="Supprimer">
                    <Trash2 size={12} />
                  </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={p.image} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--violet-soft)' }} />
                      <div style={{
                        position: 'absolute', bottom: 0, right: 0,
                        width: 12, height: 12, borderRadius: '50%',
                        background: p.online ? '#22c55e' : '#9ca3af',
                        border: '2px solid #fff',
                        boxShadow: p.online ? '0 0 6px rgba(34,197,94,0.5)' : 'none',
                      }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0, marginBottom: 2 }}>{p.name}, {p.age}</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {p.location}</span>
                    </div>
                  </div>
                  {/* Online toggle */}
                  <button onClick={() => toggleOnline(p.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '0.3rem 0.7rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600,
                    cursor: 'pointer', border: 'none', marginBottom: '0.5rem',
                    fontFamily: 'var(--font-main)', transition: 'all 0.15s',
                    background: p.online ? 'rgba(34,197,94,0.12)' : 'rgba(156,163,175,0.12)',
                    color: p.online ? '#16a34a' : '#6b7280',
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.online ? '#22c55e' : '#9ca3af' }} />
                    {p.online ? 'En ligne' : 'Hors ligne'} — cliquer pour changer
                  </button>
                  {p.bio && <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.4 }}>{p.bio}</p>}
                  <div style={{ display: 'flex', gap: 4, marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {(p.interests || []).map((int, idx) => (
                      <span key={idx} className="badge badge-violet" style={{ fontSize: '0.68rem' }}>{int}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ MODAL ════ */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}
            onClick={() => setShowModal(false)}>
            <div className="card animate-fade-up" style={{ width: '100%', maxWidth: 440, padding: '1.75rem', borderRadius: 20 }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Créer un profil</h2>
                <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}><X size={18} /></button>
              </div>

              <div className="input-group">
                <label>Prénom</label>
                <input className="input" placeholder="Ex: Aya, Kevin..." value={newProfile.name}
                  onChange={e => setNewProfile({ ...newProfile, name: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <div className="input-group">
                  <label>Âge</label>
                  <input className="input" type="number" placeholder="25" value={newProfile.age}
                    onChange={e => setNewProfile({ ...newProfile, age: e.target.value })} />
                </div>
                <div className="input-group">
                  <label>Ville</label>
                  <input className="input" placeholder="Abidjan..." value={newProfile.location}
                    onChange={e => setNewProfile({ ...newProfile, location: e.target.value })} />
                </div>
              </div>
              <div className="input-group">
                <label>Bio</label>
                <textarea className="input" style={{ minHeight: 65, resize: 'vertical' }} placeholder="Courte description..."
                  value={newProfile.bio} onChange={e => setNewProfile({ ...newProfile, bio: e.target.value })} />
              </div>
              <div className="input-group">
                <label>URL photo (optionnel)</label>
                <input className="input" placeholder="https://..." value={newProfile.image}
                  onChange={e => setNewProfile({ ...newProfile, image: e.target.value })} />
              </div>

              <button onClick={handleCreate} className="btn btn-primary w-full" style={{ marginTop: '0.25rem', fontSize: '0.92rem', gap: 6 }}>
                <Save size={15} /> Créer
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
