import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Save, Loader2, ArrowLeft, LogOut, Camera, Star, Award, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { updateProfile } from 'firebase/auth';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;

    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      await updateProfile(user, { displayName });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="group flex items-center gap-3 text-gray-400 hover:text-secondary mb-10 transition-all font-black text-xs uppercase tracking-widest"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform border border-gray-100">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden text-center p-8 relative">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary to-blue-600" />
              <div className="relative z-10">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-primary shadow-2xl border-4 border-white overflow-hidden">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl font-black">{user?.displayName?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-2xl shadow-lg border-2 border-primary/10 flex items-center justify-center text-primary hover:scale-110 transition-transform">
                    <Camera size={18} />
                  </button>
                </div>
                <h2 className="text-2xl font-black text-secondary mb-1">{user?.displayName}</h2>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-8">{user?.email}</p>
                
                <div className="flex items-center justify-center gap-4 py-6 border-t border-gray-50">
                  <div className="text-center">
                    <div className="text-lg font-black text-secondary">Elite</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rank</div>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <div className="text-lg font-black text-secondary">2.5k</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">XP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Mini */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-sm font-black text-secondary uppercase tracking-widest flex items-center gap-2">
                <Award size={18} className="text-yellow-500" /> Achievements
              </h3>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 border border-dashed border-gray-200">
                    <Star size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-secondary">Account Settings</h2>
                  <p className="text-gray-400 font-medium mt-1">Manage your public profile and details</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Shield size={24} />
                </div>
              </div>

              <form onSubmit={handleUpdate} className="p-10 space-y-8">
                {message.text && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-[1.5rem] text-sm font-black uppercase tracking-widest flex items-center gap-3 ${
                    message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                    {message.text}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-secondary"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="w-full px-6 py-4 rounded-2xl bg-100 border-2 border-transparent text-gray-400 cursor-not-allowed font-bold"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300 uppercase tracking-widest">Locked</div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex flex-col md:flex-row items-center gap-6 border-t border-gray-50">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto px-10 h-16 flex items-center justify-center gap-3 text-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" /> SAVE CHANGES
                      </>
                    )}
                  </Button>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <Zap size={16} />
                    <p className="text-[10px] font-black uppercase tracking-widest">Auto-saving is disabled</p>
                  </div>

                  <div className="md:ml-auto">
                    <Button 
                      variant="ghost" 
                      onClick={logout}
                      className="text-red-500 hover:bg-red-50 px-8 h-16 flex items-center gap-3 text-sm"
                    >
                      <LogOut className="w-5 h-5" /> LOGOUT
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
