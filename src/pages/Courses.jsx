import React, { useEffect, useState } from 'react';
import { Star, Clock, Users, BookOpen, Loader2, Search, Filter, Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getCourses, enrollInCourse, seedInitialData, deleteData } from '../utils/db';
import { useAuth } from '../context/AuthContext';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data);
      setFilteredCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const results = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
    setFilteredCourses(results);
  }, [searchTerm, selectedLevel, courses]);

  const handleSeed = async () => {
    try {
      setSeeding(true);
      await seedInitialData();
      await fetchCourses();
    } catch (err) {
      console.error("Seeding failed:", err);
    } finally {
      setSeeding(false);
    }
  };

  const handleDeleteCourse = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await deleteData('courses', id);
      await fetchCourses();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete course.");
    }
  };

  const handleEnroll = async (courseId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await enrollInCourse(user.uid, courseId);
      alert("Successfully enrolled!");
      navigate('/dashboard');
    } catch (err) {
      console.error("Enrollment failed:", err);
      alert("Failed to enroll. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Explore Our Courses</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Choose from our wide range of frontend development courses and start your journey today.
          </p>
          {isAdmin && (
            <Button 
              onClick={() => navigate('/admin', { state: { tab: 'courses', action: 'add' } })}
              className="rounded-2xl h-14 px-8 flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Add New Course
            </Button>
          )}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter className="text-gray-400 w-5 h-5 shrink-0" />
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition whitespace-nowrap ${
                  selectedLevel === level 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <h3 className="text-2xl font-black text-gray-400 mb-6">No courses found matching your search.</h3>
            {courses.length === 0 && (
              <Button 
                variant="secondary" 
                onClick={handleSeed}
                disabled={seeding}
                className="rounded-2xl h-16 px-10"
              >
                {seeding ? "Seeding Data..." : "Seed Initial Courses"}
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-gray-100 group cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <div className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-xl text-xs font-black text-primary uppercase tracking-widest shadow-lg">
                      {course.level}
                    </div>
                    {course.isPremium && (
                      <div className="bg-secondary text-primary px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                        <Star size={12} fill="currentColor" />
                        PRO
                      </div>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="absolute top-6 right-6 flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/admin', { state: { tab: 'courses', editItem: course } });
                        }}
                        className="bg-white/95 backdrop-blur p-2.5 rounded-xl text-primary shadow-lg hover:bg-primary hover:text-white transition-all"
                        title="Edit Course"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={(e) => handleDeleteCourse(e, course.id)}
                        className="bg-white/95 backdrop-blur p-2.5 rounded-xl text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all"
                        title="Delete Course"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex gap-2">
                      {course.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-white/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">{course.category || 'Development'}</span>
                    <div className="flex items-center text-yellow-500 gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-black">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-secondary mb-3 group-hover:text-primary transition-colors leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-6 text-xs font-black text-gray-400 uppercase tracking-widest mb-8 pb-8 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{course.students} Students</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                        <span className="text-3xl font-black text-secondary tracking-tighter">{course.price}</span>
                      </div>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnroll(course.id);
                        }}
                        variant={course.isPremium ? 'secondary' : 'primary'} 
                        className="px-8 h-14 rounded-2xl font-black uppercase tracking-widest text-xs"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
