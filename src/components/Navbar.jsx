import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="w-9 h-9 rounded-xl bg-pinterest flex items-center justify-center shadow-lg shadow-pinterest/20">
            <Heart size={18} fill="white" color="white" />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            Rencontre<span className="text-pinterest">DeLuxe</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/discover" className="text-sm font-semibold text-gray-500 hover:text-pinterest transition-colors">Découvrir</Link>
          <Link to="/pricing" className="text-sm font-semibold text-gray-500 hover:text-pinterest transition-colors">Tarifs</Link>
          <Link to="/messages" className="text-sm font-semibold text-gray-500 hover:text-pinterest transition-colors">Messages</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-gray-900 hover:opacity-70 transition-opacity px-4 py-2">Se connecter</Link>
          <Link to="/register" className="bg-pinterest text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-red-700 transition-all transform active:scale-95 shadow-md shadow-red-500/10">
            Créer un compte
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-900">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-gray-100 p-6 flex flex-col gap-4 animate-fade-in shadow-xl md:hidden">
          <Link to="/discover" className="text-lg font-bold text-gray-900 py-2 border-b border-gray-50" onClick={() => setOpen(false)}>Découvrir</Link>
          <Link to="/pricing" className="text-lg font-bold text-gray-900 py-2 border-b border-gray-50" onClick={() => setOpen(false)}>Tarifs</Link>
          <Link to="/messages" className="text-lg font-bold text-gray-900 py-2 border-b border-gray-50" onClick={() => setOpen(false)}>Messages</Link>
          <div className="pt-4 flex flex-col gap-3">
            <Link to="/login" className="w-full text-center py-4 font-bold text-gray-900 bg-gray-50 rounded-2xl" onClick={() => setOpen(false)}>Se connecter</Link>
            <Link to="/register" className="w-full text-center py-4 font-bold text-white bg-pinterest rounded-2xl shadow-lg shadow-pinterest/20" onClick={() => setOpen(false)}>Créer un compte</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
