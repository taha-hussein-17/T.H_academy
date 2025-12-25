import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageSquare, Phone, Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getFAQs, deleteData } from '../utils/db';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const data = await getFAQs();
      setFaqs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ category and all its questions?')) return;
    try {
      await deleteData('faqs', id);
      await fetchFAQs();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-4"
          >
            <HelpCircle size={32} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-secondary">Frequently Asked Questions</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need to know about the platform and our courses. Can't find the answer? Contact our support.
          </p>
          {isAdmin && (
            <Button 
              onClick={() => navigate('/admin', { state: { tab: 'faqs', action: 'add' } })}
              className="rounded-2xl h-14 px-8 flex items-center gap-2 mx-auto mt-8"
            >
              <Plus size={20} />
              Add FAQ Category
            </Button>
          )}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-6">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-xl font-black text-secondary">{section.category}</h2>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate('/admin', { state: { tab: 'faqs', editItem: section } })}
                      className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all"
                      title="Edit Category"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(section.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Category"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {section.questions.map((faq, idx) => {
                  const globalIdx = `${sectionIdx}-${idx}`;
                  const isOpen = activeIndex === globalIdx;
                  
                  return (
                    <motion.div 
                      key={idx}
                      className={`bg-white rounded-[2rem] border transition-all duration-300 ${isOpen ? 'border-primary ring-4 ring-primary/5' : 'border-gray-100'}`}
                    >
                      <button 
                        onClick={() => setActiveIndex(isOpen ? null : globalIdx)}
                        className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                      >
                        <span className="text-lg font-bold text-secondary">{faq.q}</span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-8 pt-0 text-gray-500 leading-relaxed border-t border-gray-50">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-20 p-10 md:p-16 bg-white rounded-[3rem] shadow-xl border border-gray-100 text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-secondary">Still have questions?</h2>
            <p className="text-gray-500">We're here to help you on your journey. Reach out to us anytime.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-[2rem] space-y-4 hover:bg-primary hover:text-white transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="font-bold">Email Us</h3>
              <p className="text-sm opacity-60">support@thacademy.com</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-[2rem] space-y-4 hover:bg-primary hover:text-white transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-bold">Live Chat</h3>
              <p className="text-sm opacity-60">Mon-Fri: 9am - 6pm</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-[2rem] space-y-4 hover:bg-primary hover:text-white transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <h3 className="font-bold">Call Support</h3>
              <p className="text-sm opacity-60">+1 (234) 567-890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
