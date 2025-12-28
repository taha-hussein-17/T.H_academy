import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Button from '../components/Button';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };
  return (
    <div className="bg-gray-50 min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-secondary mb-6 tracking-tight">Get in <span className="text-primary">Touch</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Have questions about our courses or platform? We're here to help. Reach out to us anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                  <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition font-bold text-secondary placeholder:text-gray-300" placeholder="John" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition font-bold text-secondary placeholder:text-gray-300" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input required type="email" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition font-bold text-secondary placeholder:text-gray-300" placeholder="john@example.com" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                <textarea required rows="4" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition font-bold text-secondary placeholder:text-gray-300 resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <Button 
                disabled={status !== 'idle'}
                className="w-full py-5 flex items-center justify-center gap-3 rounded-2xl text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/25 disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? (
                  <>
                    <CheckCircle className="w-6 h-6" /> Sent Successfully
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-10"
          >
            <div className="grid gap-8">
              {[
                { icon: Mail, color: 'blue', title: 'Email Us', info: 'support@thacademy.com', sub: '24/7 Support' },
                { icon: Phone, color: 'green', title: 'Call Us', info: '+1 (555) 123-4567', sub: 'Mon-Fri 9am-6pm' },
                { icon: MapPin, color: 'purple', title: 'Visit Us', info: '123 Tech Street', sub: 'Silicon Valley, CA' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-default">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${
                    item.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                    item.color === 'green' ? 'bg-green-50 text-green-500' :
                    'bg-purple-50 text-purple-500'
                  }`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</h3>
                    <p className="text-xl font-black text-secondary">{item.info}</p>
                    <p className="text-gray-500 font-medium">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 bg-secondary rounded-[2.5rem] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-primary/20" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4 tracking-tight">Join Our Community</h3>
                <p className="text-gray-400 mb-8 text-lg font-medium leading-relaxed">
                  Follow us on social media to stay updated with the latest news and courses.
                </p>
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn', 'Github'].map((social) => (
                    <button key={social} className="px-6 py-3 bg-white/5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
