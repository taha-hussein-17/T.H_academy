import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Book, Clock, Award, Settings, LogOut, Loader2, Star, ChevronRight, Zap } from 'lucide-react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { getUserEnrollments, getCourseProgress, getUserStats } from '../utils/db';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseProgress, setCourseProgress] = useState({});
  const [userStats, setUserStats] = useState({ points: '0', hours: '0', courses: 0 });
  const [activeTab, setActiveTab] = useState('Dashboard');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const [enrollments, stats] = await Promise.all([
            getUserEnrollments(user.uid),
            getUserStats(user.uid)
          ]);
          
          setEnrolledCourses(enrollments);
          setUserStats(stats);
          
          // Fetch progress for each course
          const progressMap = {};
          const totalLessons = 6; // Mock total lessons
          for (const course of enrollments) {
            const completedIds = await getCourseProgress(user.uid, course.id);
            progressMap[course.id] = Math.round((completedIds.length / totalLessons) * 100);
          }
          setCourseProgress(progressMap);
        } catch (err) {
          console.error("Error fetching dashboard data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const stats = [
    { label: 'Active Courses', value: userStats.courses, icon: Book, color: 'blue' },
    { label: 'Total Points', value: userStats.points, icon: Award, color: 'purple' },
    { label: 'Hours Learned', value: userStats.hours, icon: Clock, color: 'green' },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 to-blue-600/10 -z-0" />
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary shadow-xl border-4 border-white group-hover:rotate-6 transition-transform">
                  <span className="text-4xl font-black">{user?.displayName?.charAt(0) || 'U'}</span>
                </div>
                <h2 className="text-2xl font-black text-secondary">{user?.displayName}</h2>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-1 mb-8">{user?.email}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 rounded-xl text-[10px]" onClick={() => navigate('/profile')}>
                    <Settings className="w-4 h-4 mr-2" /> PROFILE
                  </Button>
                  <Button variant="ghost" className="h-12 rounded-xl text-[10px] text-red-500 hover:bg-red-50" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" /> LOGOUT
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-2">
              {[
                { label: 'Dashboard', icon: Book },
                { label: 'My Courses', icon: Book },
                { label: 'Certificates', icon: Award },
                { label: 'Achievements', icon: Star },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                    ${activeTab === item.label ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-50 hover:text-secondary'}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {activeTab === 'Dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-xl transition-all">
                      <div className={`w-16 h-16 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                        <stat.icon size={28} />
                      </div>
                      <div>
                        <p className="text-3xl font-black text-secondary tracking-tighter">{stat.value}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-secondary mb-2">Welcome back, {user?.displayName}! 👋</h3>
                    <p className="text-gray-500 font-medium mb-10">You have completed 75% of your weekly goal. Keep it up!</p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">
                        Resume Last Lesson
                      </Button>
                      <Button variant="outline" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={() => navigate('/courses')}>
                        Browse More
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-secondary">Continue Learning</h3>
                    <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline" onClick={() => setActiveTab('My Courses')}>View All</button>
                  </div>

                  {enrolledCourses.length === 0 ? (
                    <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-100 text-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <Book size={32} />
                      </div>
                      <h4 className="text-xl font-black text-secondary mb-2">No active courses</h4>
                      <p className="text-gray-400 font-medium mb-8">Start your learning journey by exploring our catalog.</p>
                      <Button variant="primary" className="h-14 px-12 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={() => navigate('/courses')}>
                        Browse Catalog
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {enrolledCourses.slice(0, 2).map((course) => (
                        <div key={course.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col">
                          <div className="flex justify-between items-start mb-6">
                            <h4 className="text-xl font-black text-secondary group-hover:text-primary transition-colors leading-tight pr-4">{course.title}</h4>
                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                              {course.level || 'Beginner'}
                            </div>
                          </div>
                          
                          <div className="space-y-6 mt-auto">
                            <div className="space-y-3">
                              <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Course Progress</span>
                                <span className="text-lg font-black text-primary tracking-tighter">{courseProgress[course.id] || 0}%</span>
                              </div>
                              <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden p-0.5 border border-gray-100">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${courseProgress[course.id] || 0}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="bg-primary h-full rounded-full shadow-sm" 
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                <span>12h left</span>
                              </div>
                              <Button 
                                className="h-12 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]"
                                onClick={() => navigate(`/courses/${course.id}/lessons/1`)}
                              >
                                Continue
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'My Courses' && (
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-secondary">My Learning Path</h3>
                <div className="grid grid-cols-1 gap-6">
                  {enrolledCourses.length > 0 ? enrolledCourses.map(course => (
                    <div key={course.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
                      <img src={course.image} className="w-full md:w-48 h-32 rounded-2xl object-cover" alt="" />
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between">
                          <h4 className="text-xl font-black text-secondary">{course.title}</h4>
                          <span className="text-primary font-black text-lg">{courseProgress[course.id] || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full transition-all" style={{ width: `${courseProgress[course.id] || 0}%` }} />
                        </div>
                        <div className="flex gap-4">
                          <Button size="sm" onClick={() => navigate(`/courses/${course.id}/lessons/1`)}>Resume Course</Button>
                          <Button variant="outline" size="sm" onClick={() => navigate(`/courses/${course.id}`)}>Course Details</Button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-20 bg-white rounded-[3rem]">
                      <p className="text-gray-400">You haven't enrolled in any courses yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Certificates' && (
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-secondary">My Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                      <Award size={40} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-secondary">React Mastery</h4>
                      <p className="text-gray-400 text-sm">Issued on Dec 20, 2025</p>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/verify-certificate')}>Verify Credential</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Achievements' && (
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-secondary">My Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Fast Learner', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                    { label: 'Top Contributor', icon: Star, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Course Finisher', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
                  ].map((ach, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col items-center space-y-4">
                      <div className={`w-16 h-16 ${ach.bg} ${ach.color} rounded-2xl flex items-center justify-center`}>
                        <ach.icon size={32} />
                      </div>
                      <span className="font-black text-secondary text-xs text-center uppercase tracking-widest">{ach.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
