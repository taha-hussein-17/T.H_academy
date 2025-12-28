import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ChevronRight,
  LayoutDashboard,
  Users,
  Zap
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  getCourses, 
  getBlogPosts, 
  getFAQs, 
  getLeaderboard,
  getUsers,
  getExams,
  getAllSubmissions,
  addData, 
  updateData, 
  deleteData 
} from '../utils/db';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Loading from '../components/Loading';

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('courses');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Handle state passed from other pages
    if (location.state) {
      if (location.state.tab) setActiveTab(location.state.tab);
      if (location.state.action === 'add') {
        setIsAdding(true);
        setEditingItem({});
      }
      if (location.state.editItem) {
        setEditingItem(location.state.editItem);
        setIsAdding(false);
      }
    }
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let result = [];
      if (activeTab === 'courses') result = await getCourses();
      else if (activeTab === 'blog') result = await getBlogPosts();
      else if (activeTab === 'faqs') result = await getFAQs();
      else if (activeTab === 'leaderboard' || activeTab === 'users') result = await getUsers();
      else if (activeTab === 'exams') result = await getExams();
      else if (activeTab === 'submissions') result = await getAllSubmissions();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = Object.fromEntries(formData.entries());
    
    // Parse JSON fields if they exist in the form
    try {
      if (newItem.curriculum) newItem.curriculum = JSON.parse(newItem.curriculum);
      if (newItem.learningPoints) newItem.learningPoints = JSON.parse(newItem.learningPoints);
      if (newItem.tags) newItem.tags = JSON.parse(newItem.tags);
      if (newItem.questions) newItem.questions = JSON.parse(newItem.questions);
      if (newItem.points) newItem.points = parseInt(newItem.points);
      if (newItem.courses) newItem.courses = parseInt(newItem.courses);
      if (newItem.duration) newItem.duration = parseInt(newItem.duration);
    } catch (err) {
      console.error("JSON Parsing failed:", err);
      setMessage({ type: 'error', text: 'Invalid JSON format in nested fields.' });
      return;
    }

    setLoading(true);
    try {
      const collectionName = activeTab === 'courses' ? 'courses' : 
                             activeTab === 'blog' ? 'blog_posts' : 
                             (activeTab === 'leaderboard' || activeTab === 'users') ? 'users_xp' : 
                             activeTab === 'exams' ? 'exams' : 'faqs';
      
      if (isAdding) {
        await addData(collectionName, newItem);
        setMessage({ type: 'success', text: 'Item added successfully!' });
      } else {
        await updateData(collectionName, editingItem.id, newItem);
        setMessage({ type: 'success', text: 'Item updated successfully!' });
      }
      
      setEditingItem(null);
      setIsAdding(false);
      fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: 'Operation failed.' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    setLoading(true);
    try {
      const collectionName = activeTab === 'courses' ? 'courses' : 
                             activeTab === 'blog' ? 'blog_posts' : 
                             (activeTab === 'leaderboard' || activeTab === 'users') ? 'users_xp' : 'faqs';
      await deleteData(collectionName, id);
      setMessage({ type: 'success', text: 'Item deleted successfully!' });
      fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: 'Delete failed.' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filteredData = data.filter(item => 
    (item.title || item.category || item.name || item.userName || item.examTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [stats, setStats] = useState({
    totalUsers: '0',
    totalCourses: '0',
    totalBlogPosts: '0',
    activeNow: '154'
  });

  useEffect(() => {
    const fetchStats = async () => {
      const users = await getUsers();
      const courses = await getCourses();
      const blog = await getBlogPosts();
      setStats({
        totalUsers: users.length.toString(),
        totalCourses: courses.length.toString(),
        totalBlogPosts: blog.length.toString(),
        activeNow: Math.floor(Math.random() * 50 + 100).toString()
      });
    };
    fetchStats();
  }, []);

  if (loading && data.length === 0) {
    return <Loading />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md border border-red-100">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You do not have permission to view this page. Please log in with an admin account.</p>
          <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-secondary flex items-center gap-3">
              <Database className="text-primary" />
              Admin Console
            </h1>
            <p className="text-gray-500 mt-2">Manage your platform's content and data in real-time.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button 
              onClick={() => { 
                setIsAdding(true); 
                setEditingItem(
                  activeTab === 'courses' ? { curriculum: [], learningPoints: [], tags: [] } :
                  activeTab === 'faqs' ? { questions: [] } :
                  {}
                ); 
              }}
              className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-primary/20"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </div>
        </div>

        {/* Message Toast */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`fixed top-24 right-4 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
                message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
              }`}
            >
              {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span className="font-semibold">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-gray-100 sticky top-32">
              <nav className="space-y-2">
                {[
                  { id: 'courses', label: 'Courses', icon: BookOpen },
                  { id: 'exams', label: 'Exams', icon: FileText },
                  { id: 'submissions', label: 'Student Answers', icon: CheckCircle2 },
                  { id: 'blog', label: 'Blog Posts', icon: FileText },
                  { id: 'faqs', label: 'FAQs', icon: MessageSquare },
                  { id: 'leaderboard', label: 'Leaderboard', icon: Database },
                  { id: 'users', label: 'Users & Stats', icon: LayoutDashboard },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                      activeTab === tab.id 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-secondary'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'users' ? (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  {[
                    { label: 'Total Users', value: stats.totalUsers, icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: 'text-primary', bg: 'bg-primary/5' },
                    { label: 'Blog Posts', value: stats.totalBlogPosts, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'Active Now', value: stats.activeNow, icon: Database, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100"
                    >
                      <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                        <stat.icon size={24} />
                      </div>
                      <div className="text-2xl font-black text-secondary">{stat.value}</div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-xl font-black text-secondary">User Management</h2>
                    <span className="text-xs font-bold text-gray-400">{data.length} total users</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                          <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                          <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined</th>
                          <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {data.map(user => (
                          <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
                                  {user.name ? user.name[0] : 'U'}
                                </div>
                                <div>
                                  <p className="font-bold text-secondary">{user.name || 'Unknown User'}</p>
                                  <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                user.email?.includes('admin') || user.email?.includes('taha') ? 'bg-secondary text-primary' : 'bg-gray-100 text-gray-500'
                              }`}>
                                {user.email?.includes('admin') || user.email?.includes('taha') ? 'Admin' : 'Student'}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-sm text-gray-500 font-medium">{user.joined || 'Dec 2025'}</td>
                            <td className="px-8 py-6 text-right">
                              <button 
                                onClick={() => { setEditingItem(user); setIsAdding(false); }}
                                className="p-2 text-gray-300 hover:text-primary transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                {loading ? (
                <div className="p-20 flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
                  <p className="font-medium">Loading content...</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {filteredData.length === 0 ? (
                    <div className="p-20 text-center text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>No items found matching your search.</p>
                    </div>
                  ) : (
                    filteredData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4 min-w-0">
                          {item.image || item.avatar ? (
                            <img src={item.image || item.avatar} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                              <Database className="text-gray-400 w-6 h-6" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="font-bold text-secondary truncate">{item.title || item.name || item.category || `${item.userName} - ${item.examTitle}`}</h4>
                            <p className="text-sm text-gray-500 truncate">
                              {activeTab === 'submissions' ? (
                                <span className={`font-black uppercase tracking-tighter ${item.status === 'graded' ? 'text-green-500' : 'text-yellow-500'}`}>
                                  {item.status === 'graded' ? `Graded: ${item.grade}%` : 'Pending Review'}
                                </span>
                              ) : (
                                item.description || item.email || item.author || (item.questions ? `${item.questions.length} Questions` : '')
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {activeTab === 'submissions' ? (
                            <button 
                              onClick={() => navigate(`/admin/grade/${item.id}`)}
                              className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-all shadow-md"
                            >
                              {item.status === 'graded' ? 'View/Edit Grade' : 'Grade Now'}
                            </button>
                          ) : (
                            <>
                              <button 
                                onClick={() => { setEditingItem(item); setIsAdding(false); }}
                                className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {(editingItem || isAdding) && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
              onClick={() => { setEditingItem(null); setIsAdding(false); }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-2xl font-black text-secondary">
                  {isAdding ? 'Add New Item' : 'Edit Item'}
                </h2>
                <button 
                  onClick={() => { setEditingItem(null); setIsAdding(false); }}
                  className="p-3 rounded-2xl hover:bg-gray-100 text-gray-400 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {/* Common Fields */}
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">
                        {activeTab === 'faqs' ? 'Category' : (activeTab === 'leaderboard' || activeTab === 'users') ? 'Name' : 'Title'}
                      </label>
                      <input
                        name={activeTab === 'faqs' ? 'category' : (activeTab === 'leaderboard' || activeTab === 'users') ? 'name' : 'title'}
                        defaultValue={activeTab === 'faqs' ? editingItem?.category : (activeTab === 'leaderboard' || activeTab === 'users') ? editingItem?.name : editingItem?.title}
                        required
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    {activeTab === 'exams' && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Duration (Minutes)</label>
                          <input
                            type="number"
                            name="duration"
                            defaultValue={editingItem?.duration || 60}
                            required
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Questions (JSON format)</label>
                          <textarea
                            name="questions"
                            defaultValue={JSON.stringify(editingItem?.questions || [], null, 2)}
                            rows="8"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 font-mono text-xs focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                            placeholder='[{"q": "Question?", "options": ["A", "B"], "correct": 0}]'
                          />
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            Must be valid JSON array of objects.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {(activeTab === 'leaderboard' || activeTab === 'users') && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Email Address</label>
                          <input 
                            name="email" 
                            type="email"
                            defaultValue={editingItem?.email} 
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 outline-none" 
                            required 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Points (XP)</label>
                            <input type="number" name="points" defaultValue={editingItem?.points} className="w-full px-6 py-4 rounded-2xl border border-gray-100 outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Courses Completed</label>
                            <input type="number" name="courses" defaultValue={editingItem?.courses} className="w-full px-6 py-4 rounded-2xl border border-gray-100 outline-none" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Avatar URL</label>
                          <input name="avatar" defaultValue={editingItem?.avatar} className="w-full px-6 py-4 rounded-2xl border border-gray-100 outline-none" />
                        </div>
                      </>
                    )}

                    {(activeTab !== 'faqs' && activeTab !== 'leaderboard') && (
                      <div className="space-y-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Description / Excerpt</label>
                        <textarea
                          name={activeTab === 'courses' ? 'description' : 'excerpt'}
                          defaultValue={activeTab === 'courses' ? editingItem?.description : editingItem?.excerpt}
                          required
                          rows="3"
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                        />
                      </div>
                    )}

                    {activeTab === 'courses' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Price</label>
                            <input name="price" defaultValue={editingItem?.price} className="w-full px-6 py-4 rounded-2xl border border-gray-100 outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Level</label>
                            <select name="level" defaultValue={editingItem?.level} className="w-full px-6 py-4 rounded-2xl border border-gray-100 outline-none">
                              <option>Beginner</option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                              <option>All Levels</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Curriculum (JSON)</label>
                          <textarea
                            name="curriculum"
                            defaultValue={JSON.stringify(editingItem?.curriculum || [], null, 2)}
                            rows="4"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 font-mono text-xs focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                            placeholder='[{"title": "Lesson 1", "duration": "10:00", "free": true}]'
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Learning Points (JSON Array)</label>
                          <textarea
                            name="learningPoints"
                            defaultValue={JSON.stringify(editingItem?.learningPoints || [], null, 2)}
                            rows="3"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 font-mono text-xs focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                            placeholder='["Learn X", "Learn Y"]'
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Tags (JSON Array)</label>
                          <textarea
                            name="tags"
                            defaultValue={JSON.stringify(editingItem?.tags || [], null, 2)}
                            rows="2"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 font-mono text-xs focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                            placeholder='["React", "JS"]'
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'faqs' && (
                      <div className="space-y-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Questions (JSON format)</label>
                        <textarea
                          name="questions"
                          defaultValue={JSON.stringify(editingItem?.questions || [], null, 2)}
                          rows="8"
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 font-mono text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                          placeholder='[{"q": "Question?", "a": "Answer"}]'
                        />
                        <p className="text-[10px] text-gray-400 font-bold">Must be a valid JSON array of objects with "q" and "a" fields.</p>
                      </div>
                    )}
                    
                    {activeTab !== 'faqs' && (
                      <div className="space-y-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Image URL</label>
                        <input name="image" defaultValue={editingItem?.image} className="w-full px-6 py-4 rounded-2xl border border-gray-100 outline-none" />
                      </div>
                    )}
                    
                    {activeTab === 'blog' && (
                      <div className="space-y-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-tighter">Full Content (Markdown)</label>
                        <textarea
                          name="content"
                          defaultValue={editingItem?.content}
                          rows="6"
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    {isAdding ? 'Create Item' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingItem(null); setIsAdding(false); }}
                    className="px-10 py-5 rounded-[2rem] border-2 border-gray-100 font-black uppercase tracking-widest text-sm text-gray-400 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
