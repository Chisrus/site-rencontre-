import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Phone, Star } from 'lucide-react';

const Login = () => (
  <div className="bg-[#0f0e1a] min-h-[90vh] flex items-center justify-center py-20 px-6 relative overflow-hidden">
    
    {/* Background Orbs */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose/5 rounded-full blur-[120px]" />

    <div className="w-full max-w-md relative z-10">
      <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] shadow-2xl animate-fade-up">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto mb-6 flex items-center justify-center border border-white/10 group-hover:border-gold transition-colors">
            <LogIn size={28} className="text-gold" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 font-serif">Bon retour 👋</h1>
          <p className="text-white/40 text-[11px] font-bold tracking-[0.2em] uppercase">Retrouvez le Cercle de l'Elite</p>
        </div>

        <form onSubmit={e => e.preventDefault()} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-2">Email ou Mobile</label>
            <div className="relative group">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-all" placeholder="ton@email.com ou +225..." required />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Mot de passe</label>
              <button type="button" className="text-[10px] text-gold font-bold hover:underline">Oublié ?</button>
            </div>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
              <input type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-all" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" className="w-full py-5 bg-gradient-gold rounded-2xl font-black text-white uppercase tracking-widest text-xs shadow-xl shadow-gold/20 hover:scale-105 transition-all">
            Se Connecter
          </button>
        </form>

        <div className="text-center mt-10 pt-8 border-t border-white/10">
          <p className="text-white/40 text-[11px] tracking-wide mb-2 uppercase">Pas encore membre ?</p>
          <Link to="/register" className="text-gold font-bold text-sm hover:underline flex items-center justify-center gap-2">
            Rejoindre la Communauté <Star size={14} fill="currentColor" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
