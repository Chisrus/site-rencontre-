import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, MapPin, Camera, ArrowRight, ArrowLeft, Heart, Phone, Sparkles } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const steps = ['Identité', 'Préférences', 'Photo de profil'];

  return (
    <div className="bg-[#0f0e1a] min-h-[90vh] flex items-center justify-center py-20 px-6 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] shadow-2xl animate-fade-up">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-gold mx-auto mb-6 flex items-center justify-center shadow-lg shadow-gold/20 rotate-3 group-hover:rotate-0 transition-transform">
              <Heart size={28} fill="white" className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-serif">
              {steps[step - 1]}
            </h1>
            <p className="text-white/40 text-[11px] font-bold tracking-[0.2em] uppercase">Étape {step} sur 3</p>

            {/* Progress Bars */}
            <div className="flex justify-center gap-2 mt-8">
              {[1, 2, 3].map(n => (
                <div key={n} className={`h-1 rounded-full transition-all duration-500 ${
                  n <= step ? 'w-12 bg-gold shadow-[0_0_8px_rgba(212,165,116,0.5)]' : 'w-6 bg-white/10'
                }`} />
              ))}
            </div>
          </div>

          <form onSubmit={e => { e.preventDefault(); if (step < 3) setStep(step + 1); }} className="space-y-6">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="animate-fade-in space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-2">Prénom</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-all" type="text" placeholder="Ex: Marie-Laure" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-2">Contact</label>
                  <div className="relative group">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-all" type="text" placeholder="+225 07..." required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-2">Mot de passe</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-all" type="password" placeholder="••••••••" required />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="animate-fade-in space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-2">Ville</label>
                  <div className="relative group">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold appearance-none transition-all">
                      <option value="" className="bg-[#0f0e1a]">Sélectionnez...</option>
                      <option className="bg-[#0f0e1a]">Abidjan</option>
                      <option className="bg-[#0f0e1a]">Grand-Bassam</option>
                      <option className="bg-[#0f0e1a]">Yamoussoukro</option>
                      <option className="bg-[#0f0e1a]">San-Pedro</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-2 text-center block">Je suis</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Homme', 'Femme'].map(g => (
                      <button key={g} type="button" className="py-4 rounded-2xl border border-white/10 bg-white/5 text-white/70 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all text-sm font-bold">
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-2 text-center block">À la recherche de</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Homme', 'Femme'].map(g => (
                      <button key={g} type="button" className="py-4 rounded-2xl border border-white/10 bg-white/5 text-white/70 hover:border-rose hover:text-rose hover:bg-rose/5 transition-all text-sm font-bold">
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="animate-fade-in text-center space-y-8">
                <p className="text-white/50 text-sm italic font-light">
                  "L'image est le premier pas vers une rencontre de prestige."
                </p>
                
                <div className="relative w-40 h-40 mx-auto">
                  <div className="w-full h-full rounded-full border-4 border-dashed border-gold/30 bg-gold/5 flex flex-col items-center justify-center cursor-pointer hover:bg-gold/10 hover:border-gold transition-all group">
                    <Camera size={32} className="text-gold mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gold/60">Ajouter</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={16} fill="white" />
                  </div>
                </div>

                <Link to="/discover" className="block w-full py-5 bg-gradient-gold rounded-2xl font-black text-white uppercase tracking-widest text-xs shadow-xl shadow-gold/20 hover:scale-105 transition-all">
                  Finaliser l'Inscription 
                </Link>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-10">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                  <ArrowLeft size={14} /> Retour
                </button>
              ) : <div />}
              
              {step < 3 && (
                <button type="submit" className="flex items-center gap-2 text-gold hover:translate-x-2 transition-all text-xs font-black uppercase tracking-[0.2em]">
                  Continuer <ArrowRight size={14} />
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center mt-8 text-white/40 text-xs tracking-wide">
          Déjà dans le cercle ? <Link to="/login" className="text-gold font-bold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
t default Register;
