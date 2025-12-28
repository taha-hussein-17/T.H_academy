import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Lock, Bell, Shield, Eye, 
  Globe, Moon, Laptop, CreditCard,
  LogOut, ChevronRight, Camera,
  CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notifStates, setNotifStates] = useState({
    'Course Updates': true,
    'Leaderboard Alerts': true,
    'Community Mentions': false,
    'Newsletter': true
  });
  const [privacyStates, setPrivacyStates] = useState({
    'Public Profile': true,
    'Show on Leaderboard': true,
    'Search Engine Indexing': false,
    'Course Activity': true
  });

  const toggleNotif = (title) => {
    setNotifStates(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const togglePrivacy = (title) => {
    setPrivacyStates(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-10 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="md:w-80 shrink-0">
            <h1 className="text-3xl font-black text-secondary mb-8">Settings</h1>
            <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-black/5 border border-gray-100">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
                      ${activeTab === tab.id 
                        ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                        : 'text-gray-400 hover:bg-gray-50 hover:text-secondary'}`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-gray-100"
            >
              {activeTab === 'profile' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-black text-secondary mb-2">Profile Information</h2>
                    <p className="text-gray-500 font-medium">Update your photo and personal details.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                        {user?.photoURL ? (
                          <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User size={48} className="text-primary" />
                        )}
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-primary transition-colors">
                        <Camera size={18} />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-secondary mb-1">Profile Photo</h4>
                      <p className="text-sm text-gray-500 font-medium mb-4">JPG, GIF or PNG. Max size of 800K</p>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">Upload New</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user?.displayName}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition font-bold text-secondary"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition font-bold text-secondary"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Bio</label>
                      <textarea 
                        rows="4"
                        placeholder="Tell us about yourself..."
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition font-bold text-secondary resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-black text-secondary mb-2">Notification Preferences</h2>
                    <p className="text-gray-500 font-medium">Control how and when you receive updates.</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { title: 'Course Updates', desc: 'New lessons and course announcements' },
                      { title: 'Leaderboard Alerts', desc: 'When you change rank or receive a badge' },
                      { title: 'Community Mentions', desc: 'When someone replies to your comments' },
                      { title: 'Newsletter', desc: 'Weekly tips and academy news' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50">
                        <div>
                          <h4 className="font-black text-secondary mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleNotif(item.title)}
                          className={`w-14 h-8 rounded-full transition-all relative ${notifStates[item.title] ? 'bg-primary' : 'bg-gray-300'}`}
                        >
                          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${notifStates[item.title] ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-black text-secondary mb-2">Security Settings</h2>
                    <p className="text-gray-500 font-medium">Manage your password and security options.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Change Password</h4>
                      <div className="grid gap-4">
                        <input type="password" placeholder="Current Password" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
                        <input type="password" placeholder="New Password" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold" />
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl border-2 border-red-50 space-y-4">
                      <h4 className="text-red-500 font-black">Danger Zone</h4>
                      <p className="text-sm text-gray-500 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
                      <Button variant="ghost" className="text-red-500 hover:bg-red-50 px-0">Delete Account</Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-black text-secondary mb-2">Privacy & Security</h2>
                    <p className="text-gray-500 font-medium">Manage your visibility and data privacy.</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { title: 'Public Profile', desc: 'Allow others to see your progress and badges' },
                      { title: 'Show on Leaderboard', desc: 'Display your name in the global ranking' },
                      { title: 'Search Engine Indexing', desc: 'Allow search engines to find your profile' },
                      { title: 'Course Activity', desc: 'Show what courses you are currently taking' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50">
                        <div>
                          <h4 className="font-black text-secondary mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => togglePrivacy(item.title)}
                          className={`w-14 h-8 rounded-full transition-all relative ${privacyStates[item.title] ? 'bg-primary' : 'bg-gray-300'}`}
                        >
                          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${privacyStates[item.title] ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 rounded-[2rem] bg-secondary text-white space-y-4">
                    <div className="flex items-center gap-3">
                      <Eye className="text-primary" />
                      <h4 className="font-black">Incognito Mode</h4>
                    </div>
                    <p className="text-sm text-white/60 font-medium">While active, your progress won't be visible to others, and you won't appear on the leaderboard.</p>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Enable Incognito</Button>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-black text-secondary mb-2">Billing & Subscription</h2>
                    <p className="text-gray-500 font-medium">Manage your payment methods and invoices.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-secondary to-secondary/80 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <CreditCard size={120} />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-8">Primary Card</p>
                      <div className="space-y-1 mb-8">
                        <p className="text-xl font-black">•••• •••• •••• 4242</p>
                        <p className="text-sm font-medium text-white/60">Expires 12/26</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="font-black text-lg">Visa</p>
                        <button className="text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">Edit</button>
                      </div>
                    </div>

                    <div className="p-8 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center group hover:border-primary transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all mb-4">
                        <CreditCard size={24} />
                      </div>
                      <h4 className="font-black text-secondary mb-1">Add New Method</h4>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Credit or Debit Card</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-secondary">Recent Invoices</h3>
                    <div className="space-y-3">
                      {[
                        { id: '#INV-001', date: 'Dec 12, 2025', amount: '$49.00', status: 'Paid' },
                        { id: '#INV-002', date: 'Nov 12, 2025', amount: '$49.00', status: 'Paid' },
                        { id: '#INV-003', date: 'Oct 12, 2025', amount: '$49.00', status: 'Paid' },
                      ].map((inv, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-secondary">
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="font-black text-secondary">{inv.id}</p>
                              <p className="text-xs text-gray-500 font-medium">{inv.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-secondary">{inv.amount}</p>
                            <p className="text-[10px] font-black uppercase text-green-500 tracking-widest">{inv.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {success && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-green-500 font-black text-sm uppercase tracking-widest"
                    >
                      <CheckCircle2 size={18} /> Saved Successfully
                    </motion.span>
                  )}
                </div>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-12 rounded-2xl shadow-xl shadow-primary/20"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;