import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Clock, MessageCircle, Share2, Bookmark, Loader2 } from 'lucide-react';
import { getBlogPostById } from '../utils/db';
import Button from '../components/Button';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogPostById(id);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-black text-secondary mb-4">Post Not Found</h2>
        <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full mb-16">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-black uppercase tracking-widest text-xs transition-colors mb-4"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <div className="flex gap-3">
              <span className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">
                {post.category}
              </span>
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-xl text-xs font-black uppercase tracking-widest">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/80 font-bold">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-white/10">
                  <User size={20} className="text-primary" />
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <span>{post.comments} Comments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="prose prose-xl prose-primary max-w-none">
              <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12 italic border-l-4 border-primary pl-6">
                {post.excerpt}
              </p>
              
              <div className="text-gray-700 leading-relaxed space-y-8 font-medium whitespace-pre-line">
                {post.content}
              </div>
            </div>

            {/* Tags & Actions */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-sm font-bold">#React</span>
                <span className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-sm font-bold">#Frontend</span>
                <span className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-sm font-bold">#WebDev</span>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-gray-50 p-8 rounded-[2.5rem] sticky top-32">
              <h3 className="text-xl font-black text-secondary mb-6">About the Author</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <User size={32} />
                </div>
                <div>
                  <h4 className="font-black text-secondary">{post.author}</h4>
                  <p className="text-sm text-gray-500 font-bold">Senior Instructor</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                Expert frontend developer with over 10 years of experience building modern web applications.
              </p>
              <Button variant="outline" className="w-full rounded-xl py-3 text-sm">Follow Author</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;