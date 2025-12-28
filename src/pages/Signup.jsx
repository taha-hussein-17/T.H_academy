import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { Mail, Lock, User, AlertCircle, Chrome } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signup(email, password, displayName);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to create an account. ' + err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Google Sign-In failed. Make sure it is enabled in Firebase Console.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-secondary">Join T.H Academy</h2>
          <p className="mt-2 text-sm text-gray-600">Start your journey today</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button 
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-100 hover:bg-gray-50 transition-all text-secondary"
          >
            <Chrome className="w-5 h-5 text-red-500" />
            Sign Up with Google
          </Button>

          <Button 
            onClick={handleGuestLogin}
            variant="secondary"
            className="w-full flex items-center justify-center gap-3 py-4 bg-gray-100 hover:bg-gray-200 text-secondary border-none"
          >
            Explore as Guest
          </Button>

          <div className="relative flex items-center justify-center py-4">
            <div className="border-t border-gray-100 w-full"></div>
            <span className="absolute bg-white px-4 text-xs font-black text-gray-400 uppercase tracking-widest">or</span>
          </div>
        </div>

        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                placeholder="Full Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 text-lg"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
