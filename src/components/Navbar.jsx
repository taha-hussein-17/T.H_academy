import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Menu, X, User as UserIcon, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

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
    { label: 'Schedule', path: '/schedule' },
    { label: 'Community', path: '/community' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Blog', path: '/blog' },
  ];

  if (isAdmin) {
    navLinks.push({ label: 'Admin', path: '/admin' });
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl py-3 shadow-lg shadow-black/5 border-b border-gray-100' 
        : 'bg-transparent py-6'
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
