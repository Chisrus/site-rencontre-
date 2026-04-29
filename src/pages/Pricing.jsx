import { useState } from 'react';
import { Check, Star, Crown, Shield, X, ExternalLink, CreditCard, Sparkles } from 'lucide-react';

const PLANS = [
  {
    name: "Découverte", price: "3 000", rawPrice: 3000, sub: "FCFA",
    desc: "L'essentiel pour commencer votre aventure amoureuse.",
    features: ["10 likes par jour", "Accès aux profils", "Messagerie de base", "Profil personnalisé"],
    icon: <Shield size={28} className="text-white/80" />, 
    iconBg: 'bg-white/5 border border-white/10',
    btn: "Choisir Découverte",
    btnStyle: "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20",
    waveLink: "https://pay.wave.com/m/M_ci_FQHZsKYkp65N/c/ci/?amount=3000",
  },
  {
    name: "Premium", price: "5 000", rawPrice: 5000, sub: "FCFA",
    desc: "L'expérience complète pour des vraies rencontres.",
    features: ["Likes illimités", "Messages illimités", "Voir qui t'a visité", "Mise en avant VIP", "Mode incognito", "Filtres avancés"],
    icon: <Star size={28} className="text-[#eab308]" />, 
    iconBg: 'bg-[#eab308]/10 border border-[#eab308]/30 shadow-[0_0_20px_rgba(234,179,8,0.2)]',
    btn: "Devenir Premium", popular: true,
    btnStyle: "bg-gradient-to-r from-[#eab308] to-[#ca8a04] hover:from-[#facc15] hover:to-[#eab308] text-black shadow-[0_8px_24px_rgba(234,179,8,0.3)]",
    waveLink: "https://pay.wave.com/m/M_ci_FQHZsKYkp65N/c/ci/?amount=5000",
  },
  {
    name: "VIP Prestige", price: "10 000", rawPrice: 10000, sub: "FCFA",
    desc: "Un service 100% sur mesure par nos experts en relations.",
    features: ["Tout le Premium", "Badge VIP exclusif", "Matching par experts", "Conciergerie 24/7", "Accès soirées privées"],
    icon: <Crown size={28} className="text-rose-400" />, 
    iconBg: 'bg-rose-500/10 border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]',
    btn: "Devenir VIP Prestige",
    btnStyle: "bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-400 hover:to-rose-600 text-white shadow-[0_8px_24px_rgba(244,63,94,0.3)]",
    waveLink: "https://pay.wave.com/m/M_ci_FQHZsKYkp65N/c/ci/?amount=10000",
  }
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-[#06060c] selection:bg-purple-500/30 text-white relative overflow-hidden font-['Poppins',sans-serif] pt-28 pb-20">
      
      {/* ── BACKGROUND GLOWS ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-20 animate-[fadeUp_0.8s_ease-out]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-8 backdrop-blur-md">
            <Sparkles size={14} className="text-yellow-500" />
            Adhésion au cercle
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Playfair_Display',serif] tracking-tight mb-6 leading-tight">
            Investissez dans <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] via-[#d97706] to-[#b45309]">
              l'Amour Véritable
            </span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Trouvez le partenaire idéal grâce à nos offres pensées pour des rencontres exceptionnelles et sécurisées.
          </p>
        </div>

        {/* ── PRICING CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center lg:px-4">
          {PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`relative rounded-[2rem] p-10 transition-all duration-500 flex flex-col h-full 
                ${plan.popular 
                  ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-[#eab308]/30 shadow-[0_20px_80px_rgba(234,179,8,0.15)] md:-translate-y-4 md:scale-105 z-20' 
                  : 'bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] backdrop-blur-xl z-10'
                }
              `}
              style={{ animation: `fadeUp 0.8s ease-out ${i * 0.15}s both` }}
            >
              
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-black text-[10px] font-black px-5 py-1.5 rounded-full tracking-widest uppercase shadow-[0_4px_16px_rgba(234,179,8,0.4)] whitespace-nowrap">
                  Le plus convoité
                </div>
              )}

              {/* Icon & Title */}
              <div className="mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md ${plan.iconBg}`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed min-h-[40px]">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-10 pb-10 border-b border-white/10 relative">
                <span className="text-5xl font-bold tracking-tight text-white">{plan.price}</span>
                <span className="text-white/40 text-sm ml-2 font-medium">{plan.sub}</span>
                {plan.popular && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#eab308]/50 to-transparent" />}
              </div>

              {/* Features */}
              <ul className="space-y-5 mb-12 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${plan.popular ? 'bg-[#eab308]/20 text-[#eab308]' : 'bg-white/10 text-white/50'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-white/60'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-4 rounded-2xl font-bold text-center transition-all duration-300 text-sm tracking-wide uppercase ${plan.btnStyle}`}
              >
                {plan.btn}
              </button>
            </div>
          ))}
        </div>

        {/* ── FOOTER TRUST ── */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/30 text-xs tracking-wider animate-[fadeUp_1s_ease-out_0.5s_both]">
          <div className="flex items-center gap-2">
            <Shield size={16} /> Paiement 100% Sécurisé
          </div>
          <span className="hidden sm:block w-1.5 h-1.5 bg-white/10 rounded-full" />
          <div className="flex items-center gap-2">
            <Sparkles size={16} /> Activation sous 24h
          </div>
        </div>
      </div>

      {/* ════ MODAL DE PAIEMENT WAVE ════ */}
      {selectedPlan && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-[100] p-4 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] animate-[scaleUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
          >
            {/* Modal Glows */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[100px] blur-[60px] opacity-20 pointer-events-none ${selectedPlan.popular ? 'bg-yellow-500' : 'bg-blue-500'}`} />

            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-[#1fb6ff] to-[#0284c7] flex items-center justify-center mx-auto mb-6 shadow-[0_12px_36px_rgba(31,182,255,0.25)] border border-white/20">
                <CreditCard size={36} className="text-white" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Paiement via Wave</h2>
              <p className="text-white/40 text-sm mb-8">
                Souscription au forfait <span className="text-white font-semibold">{selectedPlan.name}</span>
              </p>

              <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 mb-8 backdrop-blur-md">
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold block mb-2">
                  Montant total
                </span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold tracking-tight text-white">{selectedPlan.price}</span>
                  <span className="text-white/40 font-medium">FCFA</span>
                </div>
              </div>

              <div className="text-left bg-[#1fb6ff]/5 border border-[#1fb6ff]/20 rounded-2xl p-5 mb-8">
                <p className="text-[11px] uppercase tracking-widest font-bold text-[#1fb6ff] mb-3 flex items-center gap-2">
                  <Check size={14} /> Procédure simple
                </p>
                <ol className="text-sm text-white/60 space-y-2.5 pl-4 list-decimal marker:text-white/20">
                  <li>Cliquez sur le bouton de paiement ci-dessous.</li>
                  <li>L'application Wave s'ouvrira automatiquement.</li>
                  <li>Validez le dépôt de <span className="text-white font-medium">{selectedPlan.price} F</span>.</li>
                </ol>
              </div>

              <a
                href={selectedPlan.waveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 w-full rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#1fb6ff] to-[#0369a1] shadow-[0_12px_24px_rgba(31,182,255,0.25)] hover:shadow-[0_16px_32px_rgba(31,182,255,0.4)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ height: '58px' }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Wave_Mobile_Money_logo.png"
                  alt="Wave"
                  className="h-5 brightness-[100] relative z-10"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <span className="relative z-10">Payer {selectedPlan.price} F avec Wave</span>
                <ExternalLink size={18} className="relative z-10 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <p className="mt-6 text-xs text-white/30 font-light text-center">
                L'activation de votre compte se fera automatiquement après réception du transfert.
              </p>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
};

export default Pricing;
