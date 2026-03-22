import { useState } from 'react';
import { Search, MoreVertical, Send, Phone, Video, Heart } from 'lucide-react';

const CONVERSATIONS = [
  { id: 1, name: "Éléonore", image: "/profile-f.png", lastMessage: "Ce serait avec plaisir !", time: "14:32", unread: 2, online: true },
  { id: 2, name: "Alexandre", image: "/profile-m.png", lastMessage: "On se dit jeudi soir pour le restaurant ?", time: "Hier", unread: 0, online: false },
  { id: 3, name: "Juliette", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop", lastMessage: "Merci pour le compliment 😊", time: "Hier", unread: 0, online: true },
];

const Messages = () => {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 h-[85vh]">
      <div className="glass h-full rounded-2xl flex overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-light flex flex-col h-full bg-[rgba(15,15,20,0.5)]">
          <div className="p-4 border-b border-light">
            <h2 className="text-2xl font-serif text-gold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
              <input 
                type="text" 
                placeholder="Rechercher une conversation..." 
                className="w-full bg-[rgba(255,255,255,0.05)] border border-light rounded-full pl-10 pr-4 py-2 text-sm focus:border-gold focus:outline-none transition-colors text-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map(chat => (
              <div 
                key={chat.id} 
                className={`p-4 border-b border-[rgba(255,255,255,0.02)] cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors flex gap-4 ${activeChat.id === chat.id ? 'bg-[rgba(212,165,116,0.1)] border-l-4 border-l-gold' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="relative">
                  <img src={chat.image} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                  {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[rgba(15,15,20,1)]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-white font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-muted">{chat.time}</span>
                  </div>
                  <p className={`text-sm truncate ${chat.unread ? 'text-white font-medium' : 'text-muted'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-rose rounded-full flex items-center justify-center text-[10px] font-bold text-white self-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex w-2/3 flex-col h-full relative">
          {/* Header */}
          <div className="p-4 border-b border-light flex justify-between items-center bg-[rgba(255,255,255,0.02)] backdrop-blur-md">
            <div className="flex items-center gap-4">
              <img src={activeChat.image} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="text-white font-medium">{activeChat.name}</h3>
                <span className="text-xs text-muted">{activeChat.online ? 'En ligne' : 'Hors ligne'}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <button className="hover:text-gold transition-colors"><Phone className="w-5 h-5" /></button>
              <button className="hover:text-gold transition-colors"><Video className="w-5 h-5" /></button>
              <button className="hover:text-gold transition-colors"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Messages Wrapper */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="text-center text-xs text-muted mb-8 text-gold">Aujourd'hui</div>
            
            <div className="flex gap-4">
              <img src={activeChat.image} alt="avatar" className="w-8 h-8 rounded-full object-cover mt-auto" />
              <div className="bg-[rgba(255,255,255,0.05)] border border-light text-white p-3 rounded-2xl rounded-bl-sm max-w-[70%]">
                <p>Bonjour ! J'ai vu que vous étiez passionné par l'art contemporain. J'y vais souvent également.</p>
                <span className="text-[10px] text-muted block mt-1 text-right">14:15</span>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <div className="bg-gradient-gold text-bg-dark font-medium p-3 rounded-2xl rounded-br-sm max-w-[70%]">
                <p>Absolument ! J'étais à la fondation Pinault la semaine dernière. Et vous ?</p>
                <span className="text-[10px] text-[rgba(0,0,0,0.5)] block mt-1 text-right">14:20</span>
              </div>
            </div>

            <div className="flex gap-4">
              <img src={activeChat.image} alt="avatar" className="w-8 h-8 rounded-full object-cover mt-auto" />
              <div className="bg-[rgba(255,255,255,0.05)] border border-light text-white p-3 rounded-2xl rounded-bl-sm max-w-[70%]">
                <p>{activeChat.lastMessage}</p>
                <span className="text-[10px] text-muted block mt-1 text-right">14:32</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[rgba(15,15,20,0.8)] border-t border-light mt-auto">
            <div className="flex items-end gap-2 bg-[rgba(255,255,255,0.05)] border border-light rounded-2xl p-2 relative focus-within:border-gold transition-colors">
              <button className="p-2 text-muted hover:text-rose transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrire un message..."
                className="w-full bg-transparent border-none resize-none max-h-32 text-white text-sm py-2 focus:outline-none"
                rows="1"
              />
              <button 
                className={`p-2 rounded-xl transition-all ${message.trim() ? 'bg-gold text-bg-dark hover:scale-105' : 'text-muted'}`}
                disabled={!message.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-center mt-2 text-muted">Vos échanges sont chiffrés et sécurisés.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Messages;
