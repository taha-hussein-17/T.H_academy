import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search as SearchIcon, 
  BookOpen, 
  FileText, 
  ArrowRight, 
  Filter, 
  X,
  Loader2,
  ChevronRight,
  Clock,
  User,
  Star
} from 'lucide-react';
import { getCourses, getBlogPosts } from '../utils/db';
import Button from '../components/Button';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState({ courses: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'courses', 'posts'

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults({ courses: [], posts: [] });
        return;
      }

      setLoading(true);
      try {
        const [courses, posts] = await Promise.all([
          getCourses(),
          getBlogPosts()
        ]);

        const filteredCourses = courses.filter(c => 
          c.title.toLowerCase().includes(query.toLowerCase()) || 
          c.description?.toLowerCase().includes(query.toLowerCase())
        );

        const filteredPosts = posts.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase()) || 
          p.excerpt?.toLowerCase().includes(query.toLowerCase())
        );

        setResults({ courses: filteredCourses, posts: filteredPosts });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  const totalResults = results.courses.length + results.posts.length;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-2xl group-focus-within:bg-primary/20 transition-all" />
            <div className="relative flex items-center bg-white rounded-[2.5rem] p-2 shadow-2xl shadow-black/5 border border-gray-100">
              <SearchIcon className="ml-6 text-gray-400" size={24} />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for courses, articles, or topics..."
                className="flex-1 px-6 py-4 bg-transparent border-none outline-none text-xl font-bold text-secondary placeholder:text-gray-300"
              />
              <Button type="submit" className="px-10 py-5 rounded-[2rem] text-lg">Search</Button>
            </div>
          </form>
          
          {query && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center text-gray-500 font-medium"
            >
              Showing {totalResults} results for <span className="text-secondary font-black">"{query}"</span>
            </motion.p>
          )}
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-16">
          {[
            { id: 'all', label: 'All Results', count: totalResults },
            { id: 'courses', label: 'Courses', count: results.courses.length },
            { id: 'posts', label: 'Articles', count: results.posts.length },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3
                ${activeFilter === filter.id 
                  ? 'bg-secondary text-white shadow-xl' 
                  : 'bg-white text-gray-400 hover:bg-gray-100'}`}
            >
              {filter.label}
              <span className={`px-2 py-0.5 rounded-lg text-[10px] ${activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
            <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-sm">Searching Academy...</p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Courses Section */}
            {(activeFilter === 'all' || activeFilter === 'courses') && results.courses.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <BookOpen size={24} />
                  </div>
                  <h2 className="text-3xl font-black text-secondary">Courses</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.courses.map((course) => (
                    <Link key={course.id} to={`/courses/${course.id}`}>
                      <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-black/5 flex flex-col h-full group"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img src={course.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                          <h3 className="text-xl font-black text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {course.duration}</span>
                            <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {course.rating}</span>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-2xl font-black text-secondary">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all">
                              <ChevronRight size={20} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Posts Section */}
            {(activeFilter === 'all' || activeFilter === 'posts') && results.posts.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-3xl font-black text-secondary">Articles</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.posts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`}>
                      <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-black/5 flex flex-col h-full group"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                          <h3 className="text-xl font-black text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                            <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
                          </div>
                          <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-6">{post.excerpt}</p>
                          <div className="mt-auto flex justify-end">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all">
                              <ArrowRight size={20} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {query && totalResults === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                  <X size={48} />
                </div>
                <h3 className="text-3xl font-black text-secondary mb-4">No matches found</h3>
                <p className="text-gray-500 text-lg max-w-md mx-auto font-medium">
                  We couldn't find anything matching your search. Try different keywords or browse our categories.
                </p>
                <div className="mt-12 flex justify-center gap-4">
                  <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
                  <Button variant="outline" onClick={() => setSearchTerm('')}>Clear Search</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;