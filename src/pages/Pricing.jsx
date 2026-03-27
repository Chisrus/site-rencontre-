import { Check, Star, Crown, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PLANS = [
  {
    name: "Gratuit", price: "0 FCFA", sub: null,
    desc: "Pour découvrir la communauté.",
    features: ["5 likes par jour", "Accès aux profils", "Messagerie limitée", "Profil basique"],
    icon: <Shield size={24} />, iconBg: 'rgba(255,255,255,0.05)', iconColor: 'rgba(255,255,255,0.4)',
    btn: "S'inscrire gratuitement", btnStyle: { border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff', background: 'rgba(255,255,255,0.05)' }
  },
  {
    name: "Premium", price: "5 000 FCFA", sub: "/mois",
    desc: "L'expérience complète pour des vraies rencontres.",
    features: ["Likes illimités", "Messages illimités", "Voir qui t'a visité", "Mise en avant du profil", "Mode incognito", "Filtres avancés"],
    icon: <Star size={24} />, iconBg: 'rgba(212,165,116,0.15)', iconColor: '#d4a574',
    btn: "Devenir Premium 💜", popular: true,
    btnStyle: { background: 'linear-gradient(135deg, #d4a574, #b8860b)', color: '#fff', border: 'none', boxShadow: '0 8px 24px rgba(212,165,116,0.3)' }
  },
  {
    name: "VIP Prestige", price: "15 000 FCFA", sub: "/mois",
    desc: "Un service sur mesure par des experts.",
    features: ["Tout le Premium", "Badge VIP exclusif", "Matching par experts humains", "Conciergerie 24/7", "Accès soirées privées"],
    icon: <Crown size={24} />, iconBg: 'rgba(244, 63, 94, 0.15)', iconColor: '#f43f5e',
    btn: "Demander l'accès VIP 👑",
    btnStyle: { background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', border: 'none', boxShadow: '0 8px 24px rgba(244,63,94,0.3)' }
  }
];

const Pricing = () => (
  <div className="bg-[#0f0e1a] text-white min-h-screen py-24 px-6 relative overflow-hidden">
    {/* Decorative blur */}
    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/10 rounded-full blur-[150px]" />
    
    <div className="container mx-auto max-w-6xl relative z-10">
      <div className="text-center mb-16 animate-fade-up">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-gold mb-6">Abonnements</span>
        <h1 className="text-5xl font-bold font-serif mb-6 leading-tight">
          Investissez dans votre <br />
          <span className="gradient-text-gold">Bonheur</span>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto text-lg font-light">
          Choisissez le plan qui vous correspond. L'amour véritable commence par une rencontre d'exception.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PLANS.map((plan, i) => (
          <div key={i} className={`p-10 rounded-[32px] transition-all duration-500 relative flex flex-col ${
            plan.popular 
              ? 'bg-[#1a1b26] border-2 border-gold shadow-[0_20px_60px_rgba(212,165,116,0.15)] scale-105 z-20' 
              : 'bg-white/5 border border-white/10 opacity-90'
          }`}>

            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-gold text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-lg">
                Le plus prisé
              </div>
            )}

            <div className="flex gap-4 items-start mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: plan.iconBg, color: plan.iconColor }}>
                {plan.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{plan.desc}</p>
              </div>
            </div>

            <div className="mb-10">
              <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
              {plan.sub && <span className="text-white/40 text-sm ml-2">{plan.sub}</span>}
            </div>

            <ul className="space-y-4 mb-12 flex-1">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white/70">
                  <div className={`p-0.5 rounded-full ${plan.popular ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/40'}`}>
                    <Check size={14} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Link to="/register" className="w-full py-4 rounded-2xl font-bold text-center transition-all duration-300" style={plan.btnStyle}>
              {plan.btn}
            </Link>
          </div>
        ))}
      </div>

      <p className="text-center mt-16 text-white/30 text-xs flex items-center justify-center gap-4">
        <span className="flex items-center gap-1"><Shield size={12} /> Paiement 100% Sécurisé</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Activation Immédiate</span>
      </p>
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      .gradient-text-gold {
        background: linear-gradient(135deg, #d4a574 0%, #b8860b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `}} />
  </div>
);

export default Pricing;
