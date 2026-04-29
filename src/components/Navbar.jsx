import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on body lock or route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? 'bg-[#06060c]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto max-w-7xl px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fcd34d] to-[#b45309] flex items-center justify-center shadow-[0_4px_20px_rgba(234,179,8,0.3)] group-hover:shadow-[0_4px_24px_rgba(234,179,8,0.5)] transition-all">
            <Heart size={18} fill="white" className="text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight font-['Playfair_Display',serif]">
            Rencontre<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#b45309]">DeLuxe</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 rounded-full px-8 py-2.5 backdrop-blur-md">
          <Link to="/discover" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Découvrir</Link>
          <Link to="/pricing" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Abonnements</Link>
          <Link to="/messages" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Messages</Link>
        </div>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-white/70 hover:text-white text-sm font-semibold px-4 transition-colors">
            Connexion
          </Link>
          <Link to="/register" className="group relative flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#eab308]/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Rejoindre le cercle</span>
            <Sparkles size={14} className="relative z-10 text-yellow-500" />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/80 hover:text-white">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 bg-[#06060c]/98 backdrop-blur-3xl z-40 flex flex-col pt-24 px-6 transition-all duration-500 md:hidden ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-6 text-center">
          <Link to="/discover" className="text-3xl font-bold text-white/80 hover:text-white font-['Playfair_Display'] py-2">Découvrir</Link>
          <Link to="/pricing" className="text-3xl font-bold text-white/80 hover:text-white font-['Playfair_Display'] py-2">Abonnements</Link>
          <Link to="/messages" className="text-3xl font-bold text-white/80 hover:text-white font-['Playfair_Display'] py-2">Messages</Link>
          
          <div className="w-16 h-[1px] bg-white/10 mx-auto my-4" />
          
          <Link to="/login" className="text-lg font-bold text-white/70 hover:text-white py-2">Connexion au compte</Link>
          <Link to="/register" className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#d4a574] to-[#b8860b] rounded-2xl text-black font-bold shadow-[0_8px_32px_rgba(212,165,116,0.3)]">
            Rejoindre le club privilégié <Sparkles size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
