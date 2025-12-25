import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search, Tag, MessageCircle, Loader2, Pencil, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getBlogPosts, deleteData } from '../utils/db';
import { useAuth } from '../context/AuthContext';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deleteData('blog_posts', id);
      await fetchPosts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete post.");
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(posts.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary font-black uppercase tracking-widest text-sm"
            >
              Academy Blog
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-black text-secondary"
            >
              Latest Insights & <br /> Tutorials
            </motion.h1>
            {isAdmin && (
              <Button 
                onClick={() => navigate('/admin', { state: { tab: 'blog', action: 'add' } })}
                className="rounded-2xl h-14 px-8 flex items-center gap-2 mt-6"
              >
                <Plus size={20} />
                Add New Post
              </Button>
            )}
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
            />
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Link to={`/blog/${filteredPosts[0].id}`}>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative rounded-[3rem] overflow-hidden mb-16 group cursor-pointer shadow-2xl"
            >
              <div className="aspect-[21/9] w-full relative">
                <img src={filteredPosts[0].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-3xl">
                <span className="inline-block px-4 py-2 bg-primary rounded-xl text-sm font-black mb-6">FEATURED POST</span>
                <h2 className="text-3xl md:text-5xl font-black mb-6 group-hover:text-primary transition-colors leading-tight">
                  {filteredPosts[0].title}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/80">
                  <span className="flex items-center gap-2"><User size={16} /> {filteredPosts[0].author}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-2"><Tag size={16} /> {filteredPosts[0].category}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Categories */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all
                ${selectedCategory === cat ? 'bg-secondary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
            >
              {cat === 'All' ? 'All Posts' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post, index) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <motion.article 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col h-full"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur text-primary rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">
                      {post.category}
                    </span>
                  </div>
                  {isAdmin && (
                    <div className="absolute top-6 right-6 flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate('/admin', { state: { tab: 'blog', editItem: post } });
                        }}
                        className="bg-white/95 backdrop-blur p-2.5 rounded-xl text-primary shadow-lg hover:bg-primary hover:text-white transition-all"
                        title="Edit Post"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={(e) => handleDeletePost(e, post.id)}
                        className="bg-white/95 backdrop-blur p-2.5 rounded-xl text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all"
                        title="Delete Post"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {new Date(post.date).toLocaleDateString()}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <span className="flex items-center gap-1.5"><Tag size={14} className="text-primary" /> {post.readTime || '5 min read'}</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-secondary mb-4 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-black text-primary">
                        {post.author[0]}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Author</p>
                        <p className="text-xs font-black text-secondary">{post.author}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <section className="mt-32 relative rounded-[3rem] bg-secondary p-12 md:p-20 text-center text-white overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-black leading-tight">Never miss an update from T.H Academy</h2>
            <p className="text-gray-400 text-lg">
              Subscribe to our newsletter and get the latest tutorials and career tips delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-8 py-5 bg-white/10 rounded-2xl border-2 border-white/10 focus:border-primary focus:bg-white/20 text-white outline-none transition-all placeholder:text-white/40"
              />
              <Button size="lg" className="px-12">Subscribe</Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
