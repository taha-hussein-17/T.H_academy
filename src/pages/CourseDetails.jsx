import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, enrollInCourse, getUserEnrollments, deleteData } from '../utils/db';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle2, 
  PlayCircle,
  Loader2,
  Lock,
  Shield,
  Pencil,
  Trash2
} from 'lucide-react';
import Button from '../components/Button';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const handleDeleteCourse = async () => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await deleteData('courses', id);
      navigate('/courses');
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete course.");
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCourseById(id);
        setCourse(courseData);
        
        if (user) {
          const enrollments = await getUserEnrollments(user.uid);
          setEnrolled(enrollments.some(e => e.id === id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, user]);

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/checkout/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-bold text-secondary mb-4">Course not found</h2>
        <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
      </div>
    );
  }

  const lessons = course.curriculum || [
    { title: "Introduction to the Course", duration: "15:00", free: true },
    { title: "Environment Setup", duration: "25:00", free: true },
    { title: "Core Concepts Deep Dive", duration: "45:00", free: false },
    { title: "Building Your First Project", duration: "1:15:00", free: false },
    { title: "Advanced Patterns", duration: "55:00", free: false },
    { title: "Deployment & Optimization", duration: "35:00", free: false },
  ];

  const learningPoints = course.learningPoints || [
    "Master modern development features",
    "Advanced State Management",
    "Performance Optimization",
    "Real-world Deployment",
    "Testing & Debugging",
    "UI/UX Best Practices"
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-secondary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Courses
            </button>
            
            {isAdmin && (
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/admin', { state: { tab: 'courses', editItem: course } })}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-xl border border-primary/30 hover:bg-primary/30 transition-all font-bold"
                >
                  <Pencil size={18} />
                  Edit Course
                </button>
                <button 
                  onClick={handleDeleteCourse}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-all font-bold"
                >
                  <Trash2 size={18} />
                  Delete Course
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm font-bold border border-primary/30">
                  {course.level}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-bold">{course.rating}</span>
                </div>
                {course.isPremium && (
                  <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border border-yellow-500/30">
                    PRO
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {course.longDescription || course.description}
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{course.students} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{course.duration} Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>{lessons.length} Lessons</span>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full aspect-video object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-secondary">{course.price}</span>
                      <span className="text-gray-400 line-through text-lg">$199</span>
                    </div>
                    {course.isPremium && (
                      <div className="bg-secondary/5 px-4 py-2 rounded-2xl border border-secondary/10">
                        <span className="text-xs font-bold text-secondary/60 block uppercase tracking-tighter">Premium Content</span>
                        <span className="text-sm font-black text-secondary">PRO ACCESS</span>
                      </div>
                    )}
                  </div>
                  {enrolled ? (
                    <Button 
                      className="w-full py-4 text-lg"
                      onClick={() => navigate('/dashboard')}
                    >
                      Go to Dashboard
                    </Button>
                  ) : (
                    <Button 
                      className="w-full py-4 text-lg"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Enroll Now"}
                    </Button>
                  )}
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Full lifetime access • Certificate of completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-2xl font-bold text-secondary mb-6">What you'll learn</h3>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningPoints.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-secondary mb-6">Course Curriculum</h3>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {lessons.map((lesson, i) => (
                  <div 
                    key={i} 
                    className={`p-6 flex items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50 transition ${!enrolled && !lesson.free ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${enrolled || lesson.free ? 'bg-blue-50 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                        {enrolled || lesson.free ? <PlayCircle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary">{lesson.title}</h4>
                        <span className="text-sm text-gray-400">{lesson.duration}</span>
                      </div>
                    </div>
                    {lesson.free && !enrolled && (
                      <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded">FREE PREVIEW</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-secondary mb-6">Course Includes</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <PlayCircle className="w-4 h-4 text-primary" /> 12.5 hours on-demand video
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <BookOpen className="w-4 h-4 text-primary" /> 15 downloadable resources
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <Users className="w-4 h-4 text-primary" /> Lifetime access
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <Shield className="w-4 h-4 text-primary" /> Certificate of completion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
