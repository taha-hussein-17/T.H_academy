import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
              <span className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform">T</span>
              <span>T.H Academy</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              The premier destination for frontend mastery. Learn from experts, build real projects, and join a global community of developers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all group">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all group">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/courses" className="text-gray-400 hover:text-primary transition">All Courses</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-primary transition">Leaderboard</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary transition">Academy Blog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-lg font-bold mb-8">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition">FAQ Help Center</Link></li>
              <li><Link to="/verify-certificate" className="text-gray-400 hover:text-primary transition">Verify Certificate</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-primary transition">Student Dashboard</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-8">Join Our Newsletter</h4>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Subscribe to get the latest tutorials, course updates, and exclusive discounts.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition group-hover:border-white/20"
                />
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-primary/20">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2025 T.H Academy. All rights reserved. Built with ❤️ for developers.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-white transition">Terms of Service</Link>
            <Link to="/legal" className="text-xs text-gray-500 hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
