import { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Send, Phone, Video, Heart, Lock, Star, Zap, Crown, Image as ImageIcon, CreditCard, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Messages = () => {
  const { adminProfiles, chatHistory, sendUserMessage, submitPayment, userSubscriptions, incomingCall, clearCall, matches } = useApp();
  const CURRENT_USER_ID = 1;
  
  const conversations = adminProfiles.filter(p => chatHistory[`${CURRENT_USER_ID}-${p.id}`] !== undefined);
  
  // Les matchs qui n'ont pas encore de conversation
  const newMatches = matches.filter(m => chatHistory[`${CURRENT_USER_ID}-${m.id}`] === undefined);
  
  const [activeChat, setActiveChat] = useState(conversations[0] || (newMatches.length > 0 ? adminProfiles.find(p => p.id === newMatches[0].id) : null));
  const [message, setMessage] = useState('');
  const [paywallActive, setPaywallActive] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [senderPhone, setSenderPhone] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [paymentSent, setPaymentSent] = useState(false);
  const messagesEndRef = useRef(null);

  const activeMessages = activeChat ? (chatHistory[`${CURRENT_USER_ID}-${activeChat.id}`] || []) : [];
  
  const isPremium = userSubscriptions[CURRENT_USER_ID]?.active;
  const botMsgsCount = activeMessages.filter(m => m.from === 'admin' && m.isBot).length;
  const shouldBlock = !isPremium && botMsgsCount >= 3;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSend = () => {
    if (!message.trim() || !activeChat) return;
    if (shouldBlock) return setPaywallActive(true);
    sendUserMessage(CURRENT_USER_ID, activeChat.id, message);
    setMessage('');
  };

  const handleInputInteraction = () => {
    if (shouldBlock) setPaywallActive(true);
  };

  const handleCopyWave = () => {
    navigator.clipboard.writeText("0102030405"); // Numéro Wave
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handlePaymentSubmit = () => {
    if (!senderPhone || senderPhone.length < 8) return;
    submitPayment(CURRENT_USER_ID, selectedPlan, senderPhone);
    setPaymentSent(true);
    setTimeout(() => {
      setPaywallActive(false);
      setSelectedPlan(null);
      setPaymentSent(false);
    }, 4000);
  };

  const handleCallAttempt = () => {
    if (!isPremium) setPaywallActive(true);
    else alert("Appel en cours de connexion... (Fonctionnalité Premium)");
  };

  return (
    <div className="container mx-auto px-4 py-24 h-screen max-h-[1000px]">
      <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 h-[85vh] rounded-[2.5rem] flex overflow-hidden relative shadow-[0_20px_80px_rgba(0,0,0,0.8)]">

        {/* ── INCOMING CALL OVERLAY ── */}
        {incomingCall && incomingCall.userId === CURRENT_USER_ID && (
          <div className="absolute inset-0 bg-[#06060c]/95 backdrop-blur-2xl z-[60] flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-[#eab308] tracking-[0.3em] text-[10px] mb-12 uppercase font-bold">Appel entrant sécurisé</h3>
            
            <div className="relative mb-10 w-40 h-40">
              <div className="absolute inset-0 bg-[#eab308]/20 rounded-full animate-ping" />
              <div className="absolute inset-0 bg-[#eab308]/10 rounded-full animate-pulse scale-125" />
              <img src={incomingCall.profile.image} alt="Caller" className="w-full h-full rounded-full object-cover relative z-10 border-4 border-[#06060c] shadow-[0_0_30px_rgba(234,179,8,0.3)]" />
            </div>
            
            <h2 className="text-4xl text-white font-['Playfair_Display',serif] mb-3">{incomingCall.profile.name}</h2>
            <p className="text-white/40 mb-16 text-sm">Demande une connexion vidéo privée</p>
            
            <div className="flex gap-10">
              <button onClick={clearCall} className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/50 transition-all text-white/50">
                <Phone className="w-7 h-7 transform rotate-[135deg]" strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => { clearCall(); handleCallAttempt(); }} 
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all animate-bounce"
              >
                <Video className="w-7 h-7 text-white" fill="currentColor" />
              </button>
            </div>
          </div>
        )}
        
        {/* ── PAYWALL MODAL (MATCHES LUXURY PRICING Redesign) ── */}
        {paywallActive && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] animate-[scaleUp_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[100px] blur-[60px] opacity-20 pointer-events-none bg-[#eab308]" />

              {!selectedPlan ? (
                <>
                  <button onClick={() => setPaywallActive(false)} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[#d4a574]/20 to-[#b8860b]/20 border border-[#eab308]/30 mx-auto mb-6 flex items-center justify-center shadow-[0_4px_20px_rgba(234,179,8,0.15)] text-[#eab308]">
                    <Lock size={26} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 text-center font-['Playfair_Display',serif]">Accès Restreint</h2>
                  <p className="text-white/40 text-sm mb-8 text-center leading-relaxed font-light">
                    Le nombre de messages gratuits est atteint. Prouvez votre sérieux en rejoignant le club premium.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <button onClick={() => setSelectedPlan({ name: 'Découverte', price: '3000' })} className="w-full flex justify-between items-center p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#eab308]/30 transition-all group">
                      <div className="flex gap-3 items-center text-white/80 group-hover:text-white"><Star className="w-5 h-5 text-white/40 group-hover:text-[#eab308] transition-colors"/> <span className="font-bold text-sm">Découverte</span></div>
                      <span className="font-bold text-white group-hover:text-[#eab308] transition-colors">3 000 F</span>
                    </button>
                    <button onClick={() => setSelectedPlan({ name: 'Premium (L\'idéal)', price: '5000' })} className="w-full flex justify-between items-center p-5 rounded-2xl border border-[#eab308]/50 bg-[#eab308]/5 relative overflow-hidden transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] transition-all">
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-black text-[9px] font-black px-3 py-1 rounded-bl-lg tracking-widest uppercase">Prisé</div>
                      <div className="flex gap-3 items-center text-white"><Zap className="w-5 h-5 text-[#eab308]"/> <span className="font-bold text-sm">Premium</span></div>
                      <span className="font-bold text-white">5 000 F</span>
                    </button>
                    <button onClick={() => setSelectedPlan({ name: 'VIP Prestige', price: '10000' })} className="w-full flex justify-between items-center p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-rose-500/30 transition-all group">
                      <div className="flex gap-3 items-center text-white/80 group-hover:text-white"><Crown className="w-5 h-5 text-white/40 group-hover:text-rose-400 transition-colors"/> <span className="font-bold text-sm">VIP Prestige</span></div>
                      <span className="font-bold text-white group-hover:text-rose-400 transition-colors">10 000 F</span>
                    </button>
                  </div>
                </>
              ) : !paymentSent ? (
                <>
                  <button onClick={() => setSelectedPlan(null)} className="absolute top-6 left-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                  </button>
                  
                  <div className="text-center relative z-10 pt-4">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[#1fb6ff] to-[#0284c7] flex items-center justify-center mx-auto mb-6 shadow-[0_12px_36px_rgba(31,182,255,0.25)] border border-white/20">
                      <CreditCard size={28} className="text-white" strokeWidth={1.5} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-2">Paiement via Wave</h2>
                    <p className="text-white/40 text-xs mb-8">Souscription: <strong className="text-white">{selectedPlan.name}</strong></p>

                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-5 mb-8 backdrop-blur-md">
                      <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold block mb-1">Montant total</span>
                      <div className="flex items-baseline justify-center gap-1.5">
                        <span className="text-3xl font-bold tracking-tight text-white">{selectedPlan.price}</span>
                        <span className="text-white/40 font-medium text-xs">FCFA</span>
                      </div>
                    </div>

                    <div className="text-left bg-[#1fb6ff]/5 border border-[#1fb6ff]/20 rounded-2xl p-5 mb-8">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-[#1fb6ff] mb-4 flex items-center gap-2">
                        <Check size={14} /> Dépôt Manuel
                       </p>
                       <p className="text-xs text-white/60 mb-2">1. Faites un dépôt sur ce numéro :</p>
                       <div className="flex items-center gap-2 mb-4 bg-black/40 p-3 rounded-xl border border-white/5">
                         <span className="font-mono text-lg font-bold tracking-widest text-[#1fb6ff] flex-1 text-center">0102030405</span>
                         <button onClick={handleCopyWave} className="p-2 bg-[#1fb6ff]/20 text-[#1fb6ff] rounded-lg hover:bg-[#1fb6ff]/30 transition text-xs font-bold uppercase tracking-wider h-8 flex items-center justify-center">
                           {copiedKey ? 'Copié' : 'Copier'}
                         </button>
                       </div>
                       <p className="text-xs text-white/60 mb-2">2. Confirmez votre numéro d'envoi :</p>
                       <input 
                         type="tel"
                         value={senderPhone}
                         onChange={e => setSenderPhone(e.target.value)}
                         placeholder="+225 07..."
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-[#1fb6ff] focus:outline-none transition-colors text-sm"
                       />
                    </div>

                    <button 
                      onClick={handlePaymentSubmit}
                      disabled={senderPhone.length < 8}
                      className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all ${senderPhone.length >= 8 ? 'bg-gradient-to-r from-[#1fb6ff] to-[#0369a1] text-white hover:opacity-90 shadow-[0_12px_24px_rgba(31,182,255,0.25)] hover:-translate-y-0.5' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}
                    >
                      Payer via Wave
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center animate-[fadeIn_0.5s_ease-out]">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-bounce border-4 border-[#0a0a0f]">✓</div>
                  <h2 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display']">Traitement en cours</h2>
                  <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                    Votre paiement de <b className="text-white">{selectedPlan.price} FCFA</b> est en cours de validation. Vous serez débloqué dans un instant.
                  </p>
                </div>
              )}
            </div>
          </div>
         )}
         
         <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scaleUp {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
         `}} />

        {/* ── SIDEBAR (Chat List) ── */}
        <div className="w-full md:w-1/3 border-r border-white/10 flex flex-col h-full bg-[#06060c]/50">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-2xl font-['Playfair_Display',serif] text-white mb-6">Messages</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input type="text" placeholder="Rechercher..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-white/20 focus:bg-white/[0.07] focus:outline-none transition-colors text-white placeholder-white/30" />
            </div>
          </div>

          {/* ── NEW MATCHES SECTION ── */}
          {newMatches.length > 0 && (
            <div className="px-6 py-4 border-b border-white/5">
              <h3 className="text-[10px] font-bold text-[#eab308] uppercase tracking-[0.2em] mb-4">Nouveaux Matchs</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {newMatches.map(match => {
                  const profile = adminProfiles.find(p => p.id === match.id);
                  if (!profile) return null;
                  return (
                    <div 
                      key={match.id} 
                      onClick={() => setActiveChat(profile)}
                      className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
                    >
                      <div className={`relative p-0.5 rounded-full border-2 ${activeChat?.id === profile.id ? 'border-[#eab308]' : 'border-transparent group-hover:border-white/20'} transition-all`}>
                        <img src={profile.image} alt={profile.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#eab308] rounded-full border-2 border-[#06060c] flex items-center justify-center">
                          <Heart size={8} fill="black" className="text-black" />
                        </div>
                      </div>
                      <span className="text-[10px] text-white/60 font-medium group-hover:text-white transition-colors">{profile.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto no-scrollbar pb-4 p-3 space-y-1">
            {conversations.map(chat => {
              const msgs = chatHistory[`${CURRENT_USER_ID}-${chat.id}`] || [];
              const lastMsg = msgs[msgs.length - 1];
              const isUnread = lastMsg && lastMsg.from === 'admin';
              
              return (
                <div 
                  key={chat.id} 
                  onClick={() => { setActiveChat(chat); setPaywallActive(false); }}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex gap-4 items-center ${
                    activeChat?.id === chat.id 
                      ? 'bg-white/10 border-l-2 border-l-[#eab308]' 
                      : 'hover:bg-white/5 border-l-2 border-l-transparent'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={chat.image} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                    {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#06060c]" />}
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className={`text-sm truncate ${activeChat?.id === chat.id ? 'text-white font-bold' : 'text-white/80 font-medium'}`}>{chat.name}</h3>
                      <span className="text-[10px] text-white/40">{lastMsg?.time || 'Maintenant'}</span>
                    </div>
                    <p className={`text-xs truncate ${isUnread ? 'text-[#eab308] font-medium' : 'text-white/40'}`}>
                      {lastMsg?.text || 'Nouvelle conversation'}
                    </p>
                  </div>
                  {isUnread && <div className="w-2 h-2 bg-[#eab308] rounded-full shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CHAT ÁREA ── */}
        {activeChat ? (
          <div className={`hidden md:flex w-2/3 flex-col h-full relative ${paywallActive ? 'blur-md opacity-50 pointer-events-none select-none transition-all duration-300' : 'transition-all duration-300'}`}>
            
            {/* Thread Header */}
            <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-[#0a0a0f]/50">
              <div className="flex items-center gap-4">
                <img src={activeChat.image} alt={activeChat.name} className="w-11 h-11 rounded-full object-cover border border-white/10" />
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2 text-base">
                    {activeChat.name} {activeChat.isVIP && <Crown size={14} className="text-[#eab308]" />}
                  </h3>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest">{activeChat.online ? 'En ligne' : 'Hors ligne'}</span>
                </div>
              </div>
              <div className="flex items-center gap-5 text-white/40">
                <button onClick={handleCallAttempt} className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Phone className="w-5 h-5" /></button>
                <button onClick={handleCallAttempt} className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Video className="w-5 h-5" /></button>
                <button className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <div className="text-center text-[10px] text-white/30 uppercase tracking-[0.2em] mb-8 py-2">
                Vous avez matché avec {activeChat.name} • Communication chiffrée
              </div>
              
              {activeMessages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from !== 'user' && <img src={activeChat.image} alt="avatar" className="w-7 h-7 rounded-full object-cover mt-auto mb-2 shrink-0 border border-white/10" />}
                  
                  <div className={`p-4 rounded-3xl max-w-[70%] text-[13px] leading-relaxed relative ${
                    msg.from === 'user' 
                      ? 'bg-gradient-to-r from-[#d4a574] to-[#b8860b] text-black rounded-br-sm shadow-[0_4px_15px_rgba(212,165,116,0.15)]' 
                      : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-sm'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block mt-1.5 text-right font-medium uppercase tracking-wider ${msg.from === 'user' ? 'text-black/50' : 'text-white/30'}`}>
                      {msg.time}
                    </span>
                 </div>
               </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#06060c] border-t border-white/5">
              <div className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-[1.5rem] p-2 focus-within:border-[#eab308]/50 focus-within:bg-white/[0.07] transition-all">
                <button className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors" onClick={handleInputInteraction}>
                  <ImageIcon className="w-5 h-5" />
                </button>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onClick={handleInputInteraction}
                  placeholder={shouldBlock ? "Débloquez l'accès premium pour répondre..." : "Tapez un message..."}
                  className="w-full bg-transparent border-none resize-none max-h-32 text-white text-sm py-3 px-2 focus:outline-none placeholder-white/30"
                  rows="1"
                  readOnly={shouldBlock}
                />
                <button 
                  onClick={handleSend}
                  className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-full transition-all ${message.trim() ? 'bg-gradient-to-r from-[#d4a574] to-[#b8860b] text-black scale-100 shadow-lg' : 'bg-transparent text-white/20 scale-95'}`}
                  disabled={!message.trim() && !shouldBlock}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="hidden md:flex w-2/3 h-full items-center justify-center flex-col gap-6">
            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
               <Heart size={32} strokeWidth={1} className="text-white/20" />
            </div>
            <p className="text-white/40 font-['Playfair_Display'] text-xl">Sélectionnez une conversation</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Messages;
