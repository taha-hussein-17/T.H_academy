import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Animated Illustration */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <h1 className="text-[12rem] md:text-[16rem] font-black text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 relative z-10"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 mx-auto">
                <Search size={48} />
              </div>
              <p className="text-xl font-black text-secondary">Page Not Found</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight">
            Oops! This page has gone off the grid.
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            The link you followed might be broken, or the page may have been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="px-10 h-16 text-lg group w-full sm:w-auto">
              <Home className="mr-2 group-hover:-translate-y-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-10 h-16 text-secondary font-black hover:bg-gray-100 rounded-2xl transition-all w-full sm:w-auto"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="pt-12 border-t border-gray-200">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Popular Pages</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/courses" className="text-secondary hover:text-primary font-bold transition">Courses</Link>
            <Link to="/blog" className="text-secondary hover:text-primary font-bold transition">Blog</Link>
            <Link to="/leaderboard" className="text-secondary hover:text-primary font-bold transition">Leaderboard</Link>
            <Link to="/faq" className="text-secondary hover:text-primary font-bold transition">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
