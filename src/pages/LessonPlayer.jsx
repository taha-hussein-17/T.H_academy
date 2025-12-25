import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCourseById, getCourseProgress, updateLessonProgress } from '../utils/db';
import { 
  ArrowLeft, 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Loader2,
  Award
} from 'lucide-react';
import Button from '../components/Button';

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock lessons for the platform
  const lessons = [
    { id: '1', title: "Introduction to the Course", duration: "15:00", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk" },
    { id: '2', title: "Environment Setup", duration: "25:00", videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8" },
    { id: '3', title: "Core Concepts Deep Dive", duration: "45:00", videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0" },
    { id: '4', title: "Building Your First Project", duration: "1:15:00", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8" },
    { id: '5', title: "Advanced Patterns", duration: "55:00", videoUrl: "https://www.youtube.com/embed/7fPXI_MnBOY" },
    { id: '6', title: "Deployment & Optimization", duration: "35:00", videoUrl: "https://www.youtube.com/embed/2-crBg6wNvE" },
  ];

  const currentLesson = lessons.find(l => l.id === lessonId) || lessons[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
        
        if (user) {
          const progress = await getCourseProgress(user.uid, courseId);
          setCompletedLessons(progress);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, user]);

  const handleComplete = async () => {
    if (!user) return;
    try {
      await updateLessonProgress(user.uid, courseId, currentLesson.id);
      setCompletedLessons([...completedLessons, currentLesson.id]);
      
      // Move to next lesson if available
      const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
      if (currentIndex < lessons.length - 1) {
        const nextLesson = lessons[currentIndex + 1];
        navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-gray-800 flex flex-col transition-all duration-300 relative border-r border-gray-700`}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-white font-bold truncate pr-4">{course?.title}</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-700/50 transition border-b border-gray-700/50 ${lesson.id === currentLesson.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''}`}
            >
              <div className={`mt-1 shrink-0 ${completedLessons.includes(lesson.id) ? 'text-green-500' : 'text-gray-500'}`}>
                {completedLessons.includes(lesson.id) ? <CheckCircle2 className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${lesson.id === currentLesson.id ? 'text-primary' : 'text-gray-300'}`}>
                  {index + 1}. {lesson.title}
                </p>
                <span className="text-xs text-gray-500">{lesson.duration}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 bg-gray-900/50">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Your Progress</span>
              <span>{Math.round((completedLessons.length / lessons.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-1000"
                style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => navigate(`/courses/${courseId}`)}
              className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Award className={`w-5 h-5 ${completedLessons.length === lessons.length ? 'text-yellow-400' : 'text-gray-600'}`} />
            <span className="text-gray-300 text-sm font-bold">T.H Academy Certificate</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 overflow-y-auto bg-black flex flex-col">
          <div className="w-full aspect-video max-h-[70vh] bg-black relative">
            <iframe
              className="w-full h-full"
              src={currentLesson.videoUrl}
              title={currentLesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="flex-1 bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{currentLesson.title}</h1>
                  <p className="text-gray-400">Section 1 • Lesson {lessons.findIndex(l => l.id === currentLesson.id) + 1}</p>
                </div>
                <div className="flex gap-4">
                  {!completedLessons.includes(currentLesson.id) && (
                    <Button 
                      onClick={handleComplete}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700"
                    >
                      Complete Lesson
                    </Button>
                  )}
                  <Button 
                    variant="secondary"
                    onClick={() => {
                      const nextIndex = lessons.findIndex(l => l.id === currentLesson.id) + 1;
                      if (nextIndex < lessons.length) {
                        navigate(`/courses/${courseId}/lessons/${lessons[nextIndex].id}`);
                      }
                    }}
                    disabled={lessons.findIndex(l => l.id === currentLesson.id) === lessons.length - 1}
                    className="flex items-center gap-2"
                  >
                    Next Lesson <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-8">
                <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Lesson Notes</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    In this lesson, we explore the fundamental architecture of the platform. 
                    Pay close attention to the component structure and how state is managed 
                    using the Context API. Make sure to download the project files from 
                    the resources section below.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl text-sm transition font-medium">
                      Project Files.zip
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl text-sm transition font-medium">
                      Course Slides.pdf
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
