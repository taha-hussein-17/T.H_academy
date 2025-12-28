import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Menu, X, User as UserIcon, LogOut, Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { getNotifications, markNotificationRead } from '../utils/db';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        const data = await getNotifications(user.uid);
        setNotifications(data || []);
      }
    };
    fetchNotifications();
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = async (id) => {
    await markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Paths', path: '/learning-paths' },
    { label: 'Reviews', path: '/testimonials' },
    { label: 'Events', path: '/events' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Community', path: '/community' },
    { label: 'About', path: '/about' },
  ];

  if (isAdmin) {
    navLinks.push({ label: 'Admin', path: '/admin' });
  }

  return (
    <nav className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white border-b border-gray-100 ${
      scrolled 
        ? 'py-3 shadow-lg shadow-black/5' 
        : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black text-secondary tracking-tighter">T.H Academy</span>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="px-5 py-2 text-gray-500 hover:text-primary font-black text-sm uppercase tracking-widest transition-all rounded-xl hover:bg-primary/5 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-1/2" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/search" className="p-2 text-gray-400 hover:text-primary transition-colors">
              <Search size={20} />
            </Link>

            {user && (
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-primary transition-colors relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[110]"
                    >
                      <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                        <h4 className="font-black text-secondary uppercase tracking-widest text-xs">Notifications</h4>
                        {unreadCount > 0 && (
                          <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {unreadCount} New
                          </span>
                        )}
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id}
                              onClick={() => handleMarkRead(notif.id)}
                              className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer relative ${!notif.read ? 'bg-primary/5' : ''}`}
                            >
                              {!notif.read && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />}
                              <p className="text-sm font-bold text-secondary mb-1">{notif.title}</p>
                              <p className="text-xs text-gray-500 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-gray-400 mt-2 font-medium">{new Date(notif.date).toLocaleDateString()}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-400">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p className="text-sm font-medium">No notifications yet</p>
                          </div>
                        )}
                      </div>
                      <Link 
                        to="/settings?tab=notifications" 
                        className="block p-4 text-center text-xs font-bold text-primary hover:bg-gray-50 transition-colors"
                        onClick={() => setShowNotifications(false)}
                      >
                        View All Settings
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {user ? (
              <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
                <Link to="/dashboard" className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                      <UserIcon className="w-5 h-5 text-primary group-hover:text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-tighter">Student</p>
                    <p className="text-sm font-black text-secondary leading-tight">{user.displayName}</p>
                  </div>
                </Link>
                <div className="flex items-center gap-1">
                  <Link 
                    to="/settings" 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all"
                    title="Settings"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="px-6 font-black uppercase tracking-widest text-sm text-gray-500">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="px-8 rounded-2xl shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-sm h-12">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-secondary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl p-6 space-y-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="block p-4 text-gray-600 hover:text-primary font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-gray-50 transition-all"
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <div className="pt-6 border-t border-gray-100 space-y-2">
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                  <UserIcon className="w-6 h-6 text-primary" />
                  <span className="font-black text-secondary">{user.displayName}</span>
                </Link>
                <Link 
                  to="/settings" 
                  onClick={() => setIsOpen(false)}
                  className="block p-4 text-gray-600 hover:text-primary font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-gray-50 transition-all"
                >
                  Account Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full p-4 text-left text-red-500 font-black uppercase tracking-widest text-sm"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="secondary" className="w-full rounded-2xl">Log In</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-2xl">Sign Up</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
