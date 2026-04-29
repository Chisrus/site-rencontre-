import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, MapPin, Camera, ArrowRight, ArrowLeft, Heart, Phone, Sparkles } from 'lucide-react';

/* Reusable styled input with guaranteed height */
const FieldInput = ({ icon, type, placeholder, required }) => (
  <div className="relative group">
    <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none text-white/25 group-focus-within:text-[#eab308] transition-colors">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full text-white text-sm placeholder-white/25 focus:outline-none transition-all pl-12 pr-4 rounded-2xl"
      style={{
        height: '54px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        fontFamily: 'inherit',
      }}
      onFocus={e => { e.target.style.border = '1px solid #eab308'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
      onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
    />
  </div>
);

const Register = () => {
  const [step, setStep] = useState(1);
  const [genre, setGenre] = useState('');
  const [recherche, setRecherche] = useState('');
  const steps = ['Identité', 'Préférences', 'Photo de profil'];

  return (
    <div className="bg-[#06060c] min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden font-sans">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#eab308]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div
          className="p-10 md:p-12 rounded-[2.5rem]"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className="w-16 h-16 rounded-[1.5rem] mx-auto mb-6 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #d4a574, #b8860b)',
                boxShadow: '0 8px 32px rgba(212,165,116,0.3)',
              }}
            >
              <Heart size={26} fill="black" className="text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {steps[step - 1]}
            </h1>
            <p className="text-[#eab308] text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">
              Étape {step} sur 3
            </p>

            {/* Progress Bars */}
            <div className="flex justify-center gap-2 mt-6">
              {[1, 2, 3].map(n => (
                <div
                  key={n}
                  className="h-1 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: n <= step ? 48 : 24,
                    background: n <= step ? 'linear-gradient(to right, #eab308, #ca8a04)' : 'rgba(255,255,255,0.1)',
                    boxShadow: n <= step ? '0 0 12px rgba(234,179,8,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={e => { e.preventDefault(); if (step < 3) setStep(step + 1); }}
            className="space-y-6"
          >
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-1">Prénom ou Pseudo</label>
                  <FieldInput icon={<User size={18} />} type="text" placeholder="Ex: Marie-Laure" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-1">Numéro de téléphone</label>
                  <FieldInput icon={<Phone size={18} />} type="text" placeholder="+225 07..." required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-1">Mot de passe</label>
                  <FieldInput icon={<Lock size={18} />} type="password" placeholder="••••••••" required />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-1">Lieu de résidence</label>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none text-white/25">
                      <MapPin size={18} />
                    </div>
                    <select
                      className="w-full text-white text-sm focus:outline-none appearance-none rounded-2xl pl-12 pr-4"
                      style={{
                        height: '54px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontFamily: 'inherit',
                      }}
                    >
                      <option value="" className="bg-[#0a0a0f]">Sélectionnez une ville...</option>
                      <option className="bg-[#0a0a0f]">Abidjan</option>
                      <option className="bg-[#0a0a0f]">Grand-Bassam</option>
                      <option className="bg-[#0a0a0f]">Yamoussoukro</option>
                      <option className="bg-[#0a0a0f]">San-Pedro</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] text-center block">Je suis</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Un Homme', 'Une Femme'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGenre(g)}
                        className="rounded-2xl text-sm font-semibold tracking-wide transition-all"
                        style={{
                          height: '52px',
                          border: genre === g ? '1px solid #eab308' : '1px solid rgba(255,255,255,0.1)',
                          background: genre === g ? 'rgba(234,179,8,0.1)' : 'rgba(255,255,255,0.05)',
                          color: genre === g ? '#eab308' : 'rgba(255,255,255,0.6)',
                          fontFamily: 'inherit',
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] text-center block">À la recherche de</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Un Homme', 'Une Femme'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setRecherche(g)}
                        className="rounded-2xl text-sm font-semibold tracking-wide transition-all"
                        style={{
                          height: '52px',
                          border: recherche === g ? '1px solid #f43f5e' : '1px solid rgba(255,255,255,0.1)',
                          background: recherche === g ? 'rgba(244,63,94,0.08)' : 'rgba(255,255,255,0.05)',
                          color: recherche === g ? '#fb7185' : 'rgba(255,255,255,0.6)',
                          fontFamily: 'inherit',
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="text-center space-y-10">
                <p className="text-white/40 text-[13px] italic font-light leading-relaxed px-4">
                  "L'image est le premier pas vers une rencontre de prestige accomplie."
                </p>
                
                <div className="relative w-40 h-40 mx-auto">
                  <div className="absolute inset-0 bg-[#eab308]/5 rounded-full blur-xl" />
                  <div
                    className="relative w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer group transition-all duration-300"
                    style={{
                      border: '2px dashed rgba(234,179,8,0.3)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <Camera size={32} className="text-[#eab308] mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#eab308]/60 group-hover:text-[#eab308]">Ajouter</span>
                  </div>
                  
                  <div
                    className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-black"
                    style={{
                      background: 'linear-gradient(135deg, #d4a574, #b8860b)',
                      boxShadow: '0 8px 24px rgba(212,165,116,0.5)',
                      border: '1px solid rgba(234,179,8,0.5)',
                    }}
                  >
                    <Sparkles size={18} fill="currentColor" />
                  </div>
                </div>

                <Link
                  to="/discover"
                  className="block w-full font-bold text-black uppercase tracking-[0.1em] text-xs rounded-2xl hover:-translate-y-1 transition-all"
                  style={{
                    height: '58px',
                    lineHeight: '58px',
                    background: 'linear-gradient(to right, #d4a574, #b8860b)',
                    boxShadow: '0 8px 32px rgba(212,165,116,0.3)',
                  }}
                >
                  Finaliser la candidature
                </Link>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '2.5rem' }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  <ArrowLeft size={14} /> Retour
                </button>
              ) : <div />}
              
              {step < 3 && (
                <button
                  type="submit"
                  className="flex items-center gap-2 text-[#eab308] hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] group"
                >
                  Continuer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center mt-8 text-white/30 text-[11px] tracking-widest font-medium uppercase">
          Déjà dans le cercle ?{' '}
          <Link to="/login" className="text-[#eab308] hover:text-white transition-colors ml-1">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
