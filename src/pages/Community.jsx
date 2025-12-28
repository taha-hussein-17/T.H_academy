import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare as ChatBubbleLeftRightIcon, 
  ThumbsUp as HandThumbUpIcon, 
  Send as PaperAirplaneIcon,
  Plus as PlusIcon,
  Search as MagnifyingGlassIcon,
  User as UserCircleIcon,
  Hash as HashtagIcon,
  Calendar as CalendarDaysIcon
} from 'lucide-react';
import { 
  getCommunityPosts, 
  addCommunityPost, 
  likeCommunityPost, 
  addCommunityComment 
} from '../utils/db';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isPosting, setIsPosting] = useState(false);
  const [commentingOn, setCommentingOn] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getCommunityPosts();
    setPosts([...data]);
    setLoading(false);
  };

  const handleLike = async (postId) => {
    if (!user) return;
    const updatedPost = await likeCommunityPost(postId, user.uid);
    if (updatedPost) {
      setPosts(posts.map(p => p.id === postId ? { ...updatedPost } : p));
    }
  };

  const handleAddComment = async (postId) => {
    if (!user || !newComment.trim()) return;
    const comment = {
      author: user.displayName || 'User',
      content: newComment,
    };
    const addedComment = await addCommunityComment(postId, comment);
    if (addedComment) {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, addedComment] };
        }
        return p;
      }));
      setNewComment('');
      setCommentingOn(null);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;

    setIsPosting(true);
    const newPost = {
      author: {
        name: user.displayName || 'User',
        avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`,
        role: user.isAdmin ? 'Instructor' : 'Student'
      },
      content: newPostContent,
      tags: ['General']
    };

    await addCommunityPost(newPost);
    setNewPostContent('');
    fetchPosts();
    setIsPosting(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = ['All', ...new Set(posts.flatMap(p => p.tags))];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مجتمع الأكاديمية</h1>
          <p className="text-gray-600">شارك أفكارك، اسأل، وتعلم مع زملائك في T.H Academy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post Card */}
            {user && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <img 
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <form onSubmit={handleCreatePost} className="flex-1">
                    <textarea
                      placeholder={`بماذا تفكر يا ${user.displayName.split(' ')[0]}؟`}
                      className="w-full bg-gray-50 border-none rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none mb-3"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                      <div className="flex space-x-4 space-x-reverse text-gray-500">
                        {/* Add more post options here like image upload */}
                      </div>
                      <button
                        type="submit"
                        disabled={!newPostContent.trim() || isPosting}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium flex items-center transition-all disabled:opacity-50"
                      >
                        {isPosting ? 'جاري النشر...' : (
                          <>
                            <PaperAirplaneIcon className="w-5 h-5 ml-2 transform rotate-180" />
                            نشر
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Posts List */}
            <AnimatePresence>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden"
                  >
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
                        <div>
                          <h3 className="font-bold text-gray-900 flex items-center">
                            {post.author.name}
                            {post.author.role === 'Instructor' && (
                              <span className="mr-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                مدرب
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <CalendarDaysIcon className="w-3.5 h-3.5 ml-1" />
                            {new Date(post.timestamp).toLocaleDateString('ar-EG', { 
                              day: 'numeric', 
                              month: 'long', 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap text-right">
                      {post.content}
                    </div>

                    {/* Post Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="flex items-center text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100">
                          <HashtagIcon className="w-3 h-3 ml-1 text-gray-400" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Footer / Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex space-x-6 space-x-reverse">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center transition-colors group ${
                            user && post.likedBy?.includes(user.uid) 
                              ? 'text-blue-600' 
                              : 'text-gray-500 hover:text-blue-600'
                          }`}
                        >
                          <HandThumbUpIcon className={`w-5 h-5 ml-1.5 ${user && post.likedBy?.includes(user.uid) ? 'fill-current' : ''}`} />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        <button 
                          onClick={() => setCommentingOn(commentingOn === post.id ? null : post.id)}
                          className={`flex items-center transition-colors group ${
                            commentingOn === post.id ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
                          }`}
                        >
                          <ChatBubbleLeftRightIcon className="w-5 h-5 ml-1.5" />
                          <span className="text-sm font-medium">{post.comments.length}</span>
                        </button>
                      </div>
                    </div>

                    {/* Comment Input */}
                    {commentingOn === post.id && (
                      <div className="mt-4 flex items-center space-x-2 space-x-reverse">
                        <input
                          type="text"
                          placeholder="اكتب تعليقاً..."
                          className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={!newComment.trim()}
                          className="bg-blue-600 text-white p-2 rounded-xl disabled:opacity-50"
                        >
                          <PaperAirplaneIcon className="w-4 h-4 transform rotate-180" />
                        </button>
                      </div>
                    )}

                    {/* Quick Comments Section */}
                    {post.comments.length > 0 && (
                      <div className="mt-4 pt-4 space-y-3">
                        {post.comments.slice(0, 2).map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-2 space-x-reverse bg-gray-50 p-3 rounded-xl">
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                                <span className="text-[10px] text-gray-400">
                                  {new Date(comment.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                  <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">لا توجد منشورات حالياً</h3>
                  <p className="text-gray-500">كن أول من يشارك في المجتمع!</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث في المنشورات..."
                  className="w-full pr-10 pl-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tags / Categories */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">التصنيفات</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                      selectedTag === tag 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4">إحصائيات المجتمع</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 text-sm">الأعضاء النشطين</span>
                  <span className="font-bold">+1.2k</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 text-sm">المنشورات اليوم</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 text-sm">المناقشات المحلولة</span>
                  <span className="font-bold">85%</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-blue-500/30">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm font-medium transition-colors">
                  قوانين المجتمع
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
