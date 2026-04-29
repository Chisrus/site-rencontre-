import { Link } from 'react-router-dom';
import { Lock, LogIn, Phone, Star } from 'lucide-react';

const Input = ({ icon, type, placeholder }) => (
  <div className="relative group">
    <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none transition-colors group-focus-within:text-[#eab308] text-white/25">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-2xl text-white text-sm placeholder-white/25 focus:outline-none transition-all pl-12 pr-4"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        height: '54px',
        fontFamily: 'inherit',
      }}
      onFocus={e => { e.target.style.border = '1px solid #eab308'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
      onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
    />
  </div>
);

const Login = () => (
  <div className="bg-[#06060c] min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden font-sans">
    
    {/* Background Orbs */}
    <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#eab308]/10 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

    <div className="w-full max-w-md relative z-10">
      
      {/* Card */}
      <div
        className="rounded-[2.5rem] p-10 md:p-12"
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
              background: 'linear-gradient(135deg, rgba(252,211,77,0.2), rgba(180,83,9,0.2))',
              border: '1px solid rgba(234,179,8,0.3)',
              boxShadow: '0 4px 20px rgba(234,179,8,0.15)',
            }}
          >
            <LogIn size={26} className="text-[#eab308]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Espace Privé
          </h1>
          <p className="text-[#eab308] text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">Retour au Cercle</p>
        </div>

        {/* Form */}
        <form onSubmit={e => e.preventDefault()} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pl-1">Identifiant</label>
            <Input icon={<Phone size={18} />} type="text" placeholder="+225 07..." />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Mot de passe</label>
              <button type="button" className="text-[10px] text-[#eab308] font-bold hover:text-white transition-colors tracking-wider">Oublié ?</button>
            </div>
            <Input icon={<Lock size={18} />} type="password" placeholder="••••••••" />
          </div>

          <button
            type="submit"
            className="w-full font-bold text-black uppercase tracking-[0.15em] text-xs rounded-2xl hover:-translate-y-1 transition-all duration-300 mt-2"
            style={{
              height: '54px',
              background: 'linear-gradient(to right, #d4a574, #b8860b)',
              boxShadow: '0 8px 24px rgba(212,165,116,0.25)',
            }}
            onMouseEnter={e => { e.target.style.boxShadow = '0 12px 32px rgba(212,165,116,0.4)'; }}
            onMouseLeave={e => { e.target.style.boxShadow = '0 8px 24px rgba(212,165,116,0.25)'; }}
          >
            Accéder à mon espace
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-white/30 text-[10px] tracking-widest mb-3 uppercase font-medium">Pas encore membre ?</p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 text-white/70 hover:text-white font-medium text-sm transition-colors group"
          >
            Soumettre une candidature
            <Star size={14} className="text-[#eab308] group-hover:scale-125 transition-transform" fill="currentColor" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
