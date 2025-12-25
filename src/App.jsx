import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import LessonPlayer from './pages/LessonPlayer';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import VerifyCertificate from './pages/VerifyCertificate';
import Legal from './pages/Legal';
import BlogPost from './pages/BlogPost';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { seedInitialData } from './utils/db';

// Simple AdminRoute component
const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

function App() {
  useEffect(() => {
    // Proactively seed initial data if collections are empty
    const initDB = async () => {
      try {
        console.log("Checking database status...");
        await seedInitialData();
        console.log("Database is ready.");
      } catch (err) {
        console.error("Database initialization failed. Please ensure Firestore is enabled in your Firebase Console.", err);
      }
    };
    initDB();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/search" element={<Search />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route 
              path="/checkout/:courseId" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/:courseId/lessons/:lessonId" 
              element={
                <ProtectedRoute>
                  <LessonPlayer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
