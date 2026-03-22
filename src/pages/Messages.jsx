import { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Send, Phone, Video, Heart, Lock, Star, Zap, Crown, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Messages = () => {
  const { adminProfiles, chatHistory, sendUserMessage } = useApp();
  const CURRENT_USER_ID = 1; // Simulation: l'utilisateur connecté
  
  // Extraire les conversations actives pour l'utilisateur courant
  const conversations = adminProfiles.filter(p => chatHistory[`${CURRENT_USER_ID}-${p.id}`] !== undefined);
  
  const [activeChat, setActiveChat] = useState(conversations[0] || null);
  const [message, setMessage] = useState('');
  const [paywallActive, setPaywallActive] = useState(false);
  const messagesEndRef = useRef(null);

  const activeMessages = activeChat ? (chatHistory[`${CURRENT_USER_ID}-${activeChat.id}`] || []) : [];
  
  const botMsgsCount = activeMessages.filter(m => m.from === 'admin' && m.isBot).length;

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSend = () => {
    if (!message.trim() || !activeChat) return;
    
    // Check limit: if bot has sent 3 messages (Salut -> Photo -> Splendide), trigger paywall
    if (botMsgsCount >= 3) {
      setPaywallActive(true);
      return;
    }

    sendUserMessage(CURRENT_USER_ID, activeChat.id, message);
    setMessage('');
  };

  const handleInputInteraction = () => {
    if (botMsgsCount >= 3) {
      setPaywallActive(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[85vh]">
      <div className="glass h-full rounded-2xl flex overflow-hidden relative">
        
        {/* === PAYWALL MODAL === */}
        {paywallActive && (
          <div className="absolute inset-0 bg-[rgba(15,14,23,0.7)] backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1b26] border border-light p-8 rounded-3xl max-w-md w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-fade-up">
              <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                <Lock className="text-white w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 font-serif">Jetons d'échange épuisés !</h2>
              <p className="text-muted text-sm mb-6 leading-relaxed">
                Vous avez atteint la limite de messages gratuits avec ce profil. Souscrivez à un abonnement premium pour continuer cette conversation et débloquer les rencontres illimitées.
              </p>
              
              <div className="space-y-3 mb-6">
                <button className="w-full flex justify-between items-center p-4 rounded-xl border border-light bg-[rgba(255,255,255,0.02)] hover:border-gold hover:bg-[rgba(212,165,116,0.05)] transition-all">
                  <div className="flex gap-3 items-center"><Star className="text-gold w-5 h-5"/> <span className="font-bold text-white text-sm">Pass 1 Semaine</span></div>
                  <span className="font-bold text-gold">3 000 FCFA</span>
                </button>
                <button className="w-full flex justify-between items-center p-4 rounded-xl border-2 border-violet bg-[rgba(124,58,237,0.1)] relative overflow-hidden transform hover:-translate-y-1 transition-all shadow-[0_10px_20px_rgba(124,58,237,0.2)]">
                  <div className="absolute top-0 right-0 bg-violet text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg tracking-wider">POPULAIRE</div>
                  <div className="flex gap-3 items-center"><Zap className="text-violet w-5 h-5"/> <span className="font-bold text-white text-sm">Pass 1 Mois</span></div>
                  <span className="font-bold text-violet">5 000 FCFA</span>
                </button>
                <button className="w-full flex justify-between items-center p-4 rounded-xl border border-light bg-[rgba(255,255,255,0.02)] hover:border-rose hover:bg-[rgba(225,29,72,0.05)] transition-all">
                  <div className="flex gap-3 items-center"><Crown className="text-rose w-5 h-5"/> <span className="font-bold text-white text-sm">Pass VIP (3 Mois)</span></div>
                  <span className="font-bold text-rose">10 000 FCFA</span>
                </button>
              </div>

              <button onClick={() => setPaywallActive(false)} className="text-xs text-muted hover:text-white transition-colors">
                Peut-être plus tard
              </button>
            </div>
          </div>
        )}

        {/* === SIDEBAR === */}
        <div className="w-full md:w-1/3 border-r border-light flex flex-col h-full bg-[rgba(15,15,20,0.5)]">
          <div className="p-4 border-b border-light">
            <h2 className="text-2xl font-serif text-gold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
              <input type="text" placeholder="Rechercher..." className="w-full bg-[rgba(255,255,255,0.05)] border border-light rounded-full pl-10 pr-4 py-2 text-sm focus:border-gold focus:outline-none transition-colors text-white" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map(chat => {
              const msgs = chatHistory[`${CURRENT_USER_ID}-${chat.id}`] || [];
              const lastMsg = msgs[msgs.length - 1];
              const isUnread = lastMsg && lastMsg.from === 'admin';
              
              return (
                <div key={chat.id} onClick={() => { setActiveChat(chat); setPaywallActive(false); }}
                  className={`p-4 border-b border-[rgba(255,255,255,0.02)] cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors flex gap-4 ${activeChat?.id === chat.id ? 'bg-[rgba(212,165,116,0.1)] border-l-4 border-l-gold' : ''}`}>
                  <div className="relative">
                    <img src={chat.image} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                    {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[rgba(15,15,20,1)] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-white font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-muted">{lastMsg?.time || 'Maintenant'}</span>
                    </div>
                    <p className={`text-sm truncate ${isUnread ? 'text-white font-medium' : 'text-muted'}`}>
                      {lastMsg?.text || 'Nouvelle conversation'}
                    </p>
                  </div>
                  {isUnread && <div className="w-2.5 h-2.5 bg-rose rounded-full self-center" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* === CHAT AREA === */}
        {activeChat ? (
          <div className={`hidden md:flex w-2/3 flex-col h-full relative ${paywallActive ? 'blur-sm pointer-events-none select-none' : 'transition-all duration-300'}`}>
            <div className="p-4 border-b border-light flex justify-between items-center bg-[rgba(255,255,255,0.02)] backdrop-blur-md">
              <div className="flex items-center gap-4">
                <img src={activeChat.image} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-white font-medium flex items-center gap-2">{activeChat.name} {activeChat.isVIP && <Crown size={12} className="text-gold" />}</h3>
                  <span className="text-xs text-muted">{activeChat.online ? 'En ligne' : 'Hors ligne'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted">
                <button className="hover:text-gold transition-colors"><Phone className="w-5 h-5" /></button>
                <button className="hover:text-gold transition-colors"><Video className="w-5 h-5" /></button>
                <button className="hover:text-gold transition-colors"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="text-center text-xs text-muted mb-8 text-gold">Aujourd'hui, vous avez matché avec {activeChat.name} 💜</div>
              
              {activeMessages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from !== 'user' && <img src={activeChat.image} alt="avatar" className="w-8 h-8 rounded-full object-cover mt-auto" />}
                  
                  <div className={`p-3 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                    msg.from === 'user' 
                      ? 'bg-gradient-gold text-bg-dark rounded-br-sm font-medium' 
                      : 'bg-[#252632] border border-light text-white rounded-bl-sm'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[10px] block mt-1.5 text-right ${msg.from === 'user' ? 'text-[rgba(0,0,0,0.5)]' : 'text-muted'}`}>{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-[rgba(15,15,20,0.8)] border-t border-light mt-auto">
              <div className="flex items-end gap-2 bg-[rgba(255,255,255,0.05)] border border-light rounded-2xl p-2 relative focus-within:border-gold transition-colors">
                <button className="p-2 text-muted hover:text-rose transition-colors" onClick={handleInputInteraction}>
                  <ImageIcon className="w-5 h-5" />
                </button>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onClick={handleInputInteraction}
                  placeholder={botMsgsCount >= 3 ? "Abonnement requis pour répondre..." : "Écrivez un message ou envoyez une photo..."}
                  className="w-full bg-transparent border-none resize-none max-h-32 text-white text-sm py-2 px-1 focus:outline-none"
                  rows="1"
                  readOnly={botMsgsCount >= 3}
                />
                <button 
                  onClick={handleSend}
                  className={`p-2 rounded-xl transition-all ${message.trim() ? 'bg-gold text-bg-dark hover:scale-105' : 'text-muted'}`}
                  disabled={!message.trim() && botMsgsCount < 3}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center mt-2 text-muted">Vos échanges sont chiffrés et sécurisés.</p>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex w-2/3 h-full items-center justify-center text-muted flex-col gap-4">
            <Heart size={48} className="text-[rgba(255,255,255,0.05)]" />
            <p>Sélectionnez une conversation</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Messages;
