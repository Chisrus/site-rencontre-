import { createContext, useContext, useState } from 'react';

/* ── Default admin profiles (visible on Discover by all users) ── */
const DEFAULT_ADMIN_PROFILES = [
  {
    id: 101, name: "Sophie", age: 25, location: "Abidjan, C.I.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=550&fit=crop&crop=face",
    bio: "Passionnée de voyages et de cuisine 🌍", interests: ["Voyages", "Cuisine", "Danse"],
    matchPercentage: 92, isVIP: true, isNew: false, isAdmin: true, online: true,
  },
  {
    id: 102, name: "Marc", age: 30, location: "Paris, France",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=550&fit=crop&crop=face",
    bio: "Entrepreneur, j'aime les discussions profondes", interests: ["Business", "Sport", "Cinéma"],
    matchPercentage: 87, isVIP: false, isNew: true, isAdmin: true, online: false,
  },
];

/* ── Default registered users ── */
const DEFAULT_USERS = [
  { id: 1, name: "Kouadio Serge", email: "+225 07 89 12 34", city: "Abidjan", date: "21/03/2026", status: "actif", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { id: 2, name: "Aminata Diallo", email: "aminata@gmail.com", city: "Dakar", date: "21/03/2026", status: "actif", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face" },
  { id: 3, name: "Jean-Marc Dupont", email: "jm.dupont@mail.fr", city: "Paris", date: "20/03/2026", status: "actif", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
  { id: 4, name: "Fatou Bamba", email: "+225 05 44 78 90", city: "Abidjan", date: "20/03/2026", status: "suspendu", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face" },
  { id: 5, name: "Moussa Traoré", email: "moussa.t@yahoo.fr", city: "Bamako", date: "19/03/2026", status: "actif", avatar: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=80&h=80&fit=crop&crop=face" },
];

/* ── Unsplash avatar pool for quick profile creation ── */
const AVATAR_POOL_F = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=550&fit=crop&crop=face",
];
const AVATAR_POOL_M = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=550&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=550&fit=crop&crop=face",
];

const NAMES_F = ["Aya", "Mariam", "Christelle", "Nadia", "Vanessa", "Grace", "Aminata", "Laure", "Justine", "Sandrine", "Karine", "Nina", "Estelle", "Bijou", "Diana"];
const NAMES_M = ["Kevin", "Yannick", "Stéphane", "Ibrahim", "Ousmane", "Alex", "Fabrice", "Rodrigue", "Brice", "Cédric", "Hervé", "Lionel", "Patrick", "Arnaud", "Dimitri"];
const CITIES = ["Abidjan, C.I.", "Dakar, Sénégal", "Paris, France", "Douala, Cameroun", "Lomé, Togo", "Cotonou, Bénin", "Bamako, Mali", "Montréal, Canada", "Bruxelles, Belgique"];
const INTERESTS_POOL = ["Voyages", "Musique", "Cuisine", "Danse", "Sport", "Mode", "Business", "Lecture", "Cinéma", "Yoga", "Photo", "Art", "Sorties", "Nature"];
const BIOS = [
  "Je cherche quelqu'un de sincère pour construire quelque chose de vrai 💕",
  "La vie est belle quand on la partage. À toi de jouer ! 😊",
  "Passionné(e) et ambitieux(se), je crois aux belles rencontres ✨",
  "Souriante et pleine de vie, j'attends de te connaître 🌸",
  "Entrepreneur, sportif et bon vivant. Let's connect! 💪",
  "J'aime les discussions profondes autour d'un bon repas 🍷",
  "Aventurière dans l'âme, je cherche mon partenaire de voyage 🌍",
  "Simple, drôle et attachant. Viens on apprend à se connaître 😄",
];

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [adminProfiles, setAdminProfiles] = useState(DEFAULT_ADMIN_PROFILES);
  const [registeredUsers, setRegisteredUsers] = useState(DEFAULT_USERS);
  const [chatHistory, setChatHistory] = useState({});

  /* ── Add a single admin profile ── */
  const addAdminProfile = (profile) => {
    const p = {
      ...profile,
      id: Date.now() + Math.random(),
      matchPercentage: 75 + Math.floor(Math.random() * 20),
      isAdmin: true,
      isVIP: Math.random() > 0.6,
      isNew: true,
      interests: profile.interests || pickRandom(INTERESTS_POOL, 3),
    };
    setAdminProfiles(prev => [...prev, p]);
    return p;
  };

  /* ── Quick-create multiple profiles ── */
  const quickCreateProfiles = (count, gender = 'mixed') => {
    const created = [];
    for (let i = 0; i < count; i++) {
      const isFemale = gender === 'mixed' ? Math.random() > 0.45 : gender === 'f';
      const names = isFemale ? NAMES_F : NAMES_M;
      const avatars = isFemale ? AVATAR_POOL_F : AVATAR_POOL_M;
      const p = {
        id: Date.now() + Math.random() + i,
        name: names[Math.floor(Math.random() * names.length)],
        age: 22 + Math.floor(Math.random() * 13),
        location: CITIES[Math.floor(Math.random() * CITIES.length)],
        image: avatars[Math.floor(Math.random() * avatars.length)],
        bio: BIOS[Math.floor(Math.random() * BIOS.length)],
        interests: pickRandom(INTERESTS_POOL, 3),
        matchPercentage: 72 + Math.floor(Math.random() * 25),
        isVIP: Math.random() > 0.65,
        isNew: true,
        isAdmin: true,
        online: Math.random() > 0.4,
      };
      created.push(p);
    }
    setAdminProfiles(prev => [...prev, ...created]);
    return created;
  };

  /* ── Remove profile ── */
  const removeAdminProfile = (id) => {
    setAdminProfiles(prev => prev.filter(p => p.id !== id));
  };

  /* ── Toggle online status ── */
  const toggleOnline = (id) => {
    setAdminProfiles(prev => prev.map(p => p.id === id ? { ...p, online: !p.online } : p));
  };

  /* ── Send message as admin profile ── */
  const sendAdminMessage = (userId, profileId, text) => {
    const key = `${userId}-${profileId}`;
    setChatHistory(prev => ({
      ...prev,
      [key]: [...(prev[key] || []),
        { from: 'admin', profileId, text, time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }
      ]
    }));
  };

  return (
    <AppContext.Provider value={{
      adminProfiles, registeredUsers, chatHistory,
      addAdminProfile, quickCreateProfiles, removeAdminProfile, sendAdminMessage, toggleOnline,
      AVATAR_POOL_F, AVATAR_POOL_M,
    }}>
      {children}
    </AppContext.Provider>
  );
};

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default AppContext;
