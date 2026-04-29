import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#030305] border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
    
    {/* Subtle Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#eab308]/20 to-transparent" />
    <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/10 blur-[120px] pointer-events-none" />

    <div className="container mx-auto max-w-6xl px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-6 inline-flex group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#fcd34d] to-[#b45309] flex items-center justify-center shadow-[0_2px_10px_rgba(234,179,8,0.2)]">
              <Heart size={14} fill="white" className="text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight font-['Playfair_Display',serif]">
              Rencontre<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#b45309]">DeLuxe</span>
            </span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm">
            L'excellence des rencontres francophones. Un cercle privé conçu pour ceux qui ne font aucun compromis sur l'amour et l'exigence.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-sm tracking-[0.15em] uppercase">Le Club</h4>
          <ul className="space-y-4">
            {[['Découvrir', '/discover'], ['Abonnements', '/pricing'], ['Notre Charte', '/faq'], ['Confidentialité', '/privacy']].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-white/40 hover:text-white transition-colors text-sm">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-sm tracking-[0.15em] uppercase">Suivez-nous</h4>
          <div className="flex gap-3">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 flex items-center justify-center text-white/40 hover:text-white transition-all hover:-translate-y-1"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} RencontreDeLuxe.Club — Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link to="/terms" className="hover:text-white/60 transition-colors">Conditions d'utilisation</Link>
          <Link to="/privacy" className="hover:text-white/60 transition-colors">Mentions légales</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
