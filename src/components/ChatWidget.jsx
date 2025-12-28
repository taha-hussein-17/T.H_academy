import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Loader2, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getChatMessages, sendChatMessage } from '../utils/db';

const ChatWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user && isOpen) {
      loadMessages();
    }
  }, [user, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getChatMessages(user.uid);
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const text = newMessage;
    setNewMessage('');
    
    try {
      const sent = await sendChatMessage(user.uid, text);
      setMessages([...messages, sent]);
      
      // Simulate instructor response
      setTimeout(async () => {
        const responses = [
          "شكراً لسؤالك! سأقوم بالرد عليك قريباً.",
          "أهلاً بك، هل يمكنني مساعدتك في شيء آخر؟",
          "جاري مراجعة طلبك، سأعود إليك في أقرب وقت.",
          "بالتأكيد، يمكنك العثور على مزيد من التفاصيل في ملفات الكورس."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const adminMsg = await sendChatMessage('admin', randomResponse);
        // We need to re-fetch or manually add if we want real-time feel
        setMessages(prev => [...prev, adminMsg]);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 w-[380px] h-[500px] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-secondary p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Instructor Support</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                <Minus size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <MessageCircle size={32} />
                  </div>
                  <p className="text-gray-500 text-sm">ابدأ المحادثة مع المدرب الآن</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.sender === user.uid ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      msg.sender === user.uid 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}>
                      {msg.text}
                      <div className={`text-[10px] mt-1.5 ${msg.sender === user.uid ? 'text-white/60' : 'text-gray-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-secondary transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center text-white transition-all duration-500 ${
          isOpen ? 'bg-secondary rotate-90' : 'bg-primary'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;