import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import Loading from '../components/Loading';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // List of admin emails
  const ADMIN_EMAILS = ['admin@thacademy.com', 'taha@thacademy.com', 'anzma@thacademy.com'];

  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const loginAsGuest = () => {
    const guestUser = {
      uid: 'guest-user',
      displayName: 'Guest Learner',
      email: 'guest@thacademy.com',
      isGuest: true,
      photoURL: 'https://i.pravatar.cc/150?img=12'
    };
    setUser(guestUser);
    setIsAdmin(false);
    return guestUser;
  };

  const loginAsAdmin = () => {
    const adminUser = {
      uid: 'admin-user',
      displayName: 'System Admin',
      email: 'admin@thacademy.com',
      isGuest: true,
      photoURL: 'https://i.pravatar.cc/150?img=32'
    };
    setUser(adminUser);
    setIsAdmin(true);
    return adminUser;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        setIsAdmin(ADMIN_EMAILS.includes(currentUser.email.toLowerCase()));
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    isAdmin,
    signup,
    login,
    loginWithGoogle,
    loginAsGuest,
    loginAsAdmin,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
