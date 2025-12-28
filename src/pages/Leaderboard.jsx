import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, TrendingUp, Search, Loader2, Book, Zap, Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLeaderboard, deleteData } from '../utils/db';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard(50);
      setTopStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to remove this user from the leaderboard?')) return;
    try {
      await deleteData('users_xp', id);
      await fetchLeaderboard();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user ranking.");
    }
  };

  const filteredStudents = topStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  // Handle empty state
  if (topStudents.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 flex flex-col items-center justify-center">
        <Trophy size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-black text-secondary">No rankings yet</h2>
        <p className="text-gray-500 mt-2">Start learning to be the first on the leaderboard!</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-20 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="inline-flex p-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl mb-4 shadow-lg shadow-yellow-200"
          >
            <Trophy size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tight">Top Performers</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Celebrate the hard work and achievements of our top learners. Keep learning to climb the ranks!
          </p>
        </div>

        {/* Top 3 Podium */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end">
            {/* Rank 2 */}
            {topStudents[1] && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-[3rem] shadow-xl text-center relative order-2 md:order-1 h-fit border border-gray-100 group hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center border-4 border-white text-gray-500 font-black text-xl shadow-md">
                  2
                </div>
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => navigate('/admin', { state: { tab: 'leaderboard', editItem: topStudents[1] } })}
                      className="p-2 bg-white shadow-md rounded-xl text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      <Pencil size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(topStudents[1].id)}
                      className="p-2 bg-white shadow-md rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
                <div className="relative inline-block mb-6">
                  <img src={topStudents[1].avatar} alt="" className="w-28 h-28 rounded-3xl mx-auto border-4 border-gray-50 object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center border-4 border-white text-gray-500">
                    <Medal size={20} />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-secondary mb-1">{topStudents[1].name}</h3>
                <div className="text-primary text-lg font-bold mb-6">{topStudents[1].points.toLocaleString()} XP</div>
                <div className="flex justify-center gap-2">
                  <span className="px-5 py-2 bg-gray-50 text-gray-600 rounded-2xl text-xs font-black uppercase tracking-widest">{topStudents[1].courses} Courses</span>
                </div>
              </motion.div>
            )}

            {/* Rank 1 */}
            {topStudents[0] && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center relative order-1 md:order-2 z-10 border-4 border-yellow-400 group hover:scale-[1.02] transition-all duration-500"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center border-4 border-white text-white font-black shadow-xl shadow-yellow-200">
                  <Trophy size={36} />
                </div>
                {isAdmin && (
                  <div className="absolute top-6 right-6 flex gap-2">
                    <button 
                      onClick={() => navigate('/admin', { state: { tab: 'leaderboard', editItem: topStudents[0] } })}
                      className="p-2.5 bg-white shadow-lg rounded-xl text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(topStudents[0].id)}
                      className="p-2.5 bg-white shadow-lg rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                <div className="relative inline-block mb-8">
                  <img src={topStudents[0].avatar} alt="" className="w-40 h-40 rounded-[2.5rem] mx-auto border-4 border-yellow-50 object-cover group-hover:rotate-3 transition-transform" />
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center border-4 border-white text-white shadow-lg">
                    <Star size={28} fill="currentColor" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-secondary mb-2">{topStudents[0].name}</h3>
                <div className="text-primary text-2xl font-black mb-8">{topStudents[0].points.toLocaleString()} XP</div>
                <div className="flex justify-center">
                  <span className="px-6 py-3 bg-yellow-400 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-yellow-200">
                    <Zap size={16} fill="currentColor" />
                    Elite Champion
                  </span>
                </div>
              </motion.div>
            )}

            {/* Rank 3 */}
            {topStudents[2] && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8 rounded-[3rem] shadow-xl text-center relative order-3 h-fit border border-gray-100 group hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center border-4 border-white text-orange-600 font-black text-xl shadow-md">
                  3
                </div>
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => navigate('/admin', { state: { tab: 'leaderboard', editItem: topStudents[2] } })}
                      className="p-2 bg-white shadow-md rounded-xl text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      <Pencil size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(topStudents[2].id)}
                      className="p-2 bg-white shadow-md rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
                <div className="relative inline-block mb-6">
                  <img src={topStudents[2].avatar} alt="" className="w-28 h-28 rounded-3xl mx-auto border-4 border-orange-50 object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center border-4 border-white text-orange-600">
                    <Medal size={20} />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-secondary mb-1">{topStudents[2].name}</h3>
                <div className="text-primary text-lg font-bold mb-6">{topStudents[2].points.toLocaleString()} XP</div>
                <div className="flex justify-center gap-2">
                  <span className="px-5 py-2 bg-gray-50 text-gray-600 rounded-2xl text-xs font-black uppercase tracking-widest">{topStudents[2].courses} Courses</span>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* List of other students */}
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-black text-secondary">Global Rankings</h2>
              <p className="text-gray-400 font-medium mt-1">Showing the top performers this month</p>
            </div>
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-8 py-4 bg-gray-50 rounded-[1.5rem] border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 w-full md:w-80 text-sm font-bold transition-all outline-none"
              />
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-50"
          >
            <AnimatePresence mode="popLayout">
              {filteredStudents.slice(searchQuery ? 0 : 3).map((student) => (
                <motion.div 
                  key={student.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 md:px-12 md:py-8 flex items-center gap-8 hover:bg-gray-50/80 transition-all group"
                >
                  <div className="w-12 text-2xl font-black text-gray-200 group-hover:text-primary transition-colors text-center">
                    {student.rank}
                  </div>
                  <div className="relative">
                    <img src={student.avatar} alt="" className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover shadow-sm border-2 border-white" />
                    {student.rank <= 10 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-lg border-2 border-white flex items-center justify-center text-[10px] text-white">
                        <Star size={10} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-black text-secondary truncate">{student.name}</h4>
                    <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-gray-400 mt-2">
                      <span className="flex items-center gap-2">
                        <Book size={14} className="text-blue-500" />
                        {student.courses} Courses
                      </span>
                      <span className="hidden sm:flex items-center gap-2 text-green-500 bg-green-50 px-2 py-0.5 rounded-lg">
                        <TrendingUp size={14} />
                        Rising
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div>
                      <div className="text-xl font-black text-secondary tracking-tight">{student.points.toLocaleString()}</div>
                      <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Points</div>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate('/admin', { state: { tab: 'leaderboard', editItem: student } })}
                          className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(student.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredStudents.length === 0 && (
              <div className="p-20 text-center">
                <Search size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-black text-secondary">No students found</h3>
                <p className="text-gray-400 mt-2">Try searching for a different name</p>
              </div>
            )}
          </motion.div>
          
          <div className="p-10 bg-gray-50/50 text-center border-t border-gray-100">
            <button className="px-8 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-secondary font-black text-sm hover:shadow-md hover:-translate-y-1 transition-all uppercase tracking-widest">
              Show More Rankings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
