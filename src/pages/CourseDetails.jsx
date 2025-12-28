import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getCourseById, 
  enrollInCourse, 
  getUserEnrollments, 
  deleteData,
  getReviewsByCourseId,
  addReview
} from '../utils/db';
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
  Trash2,
  MessageCircle,
  Send
} from 'lucide-react';
import Button from '../components/Button';
import Loading from '../components/Loading';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

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
        const [courseData, reviewData] = await Promise.all([
          getCourseById(id),
          getReviewsByCourseId(id)
        ]);
        
        setCourse(courseData);
        setReviews(reviewData || []);
        
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
    navigate(`/checkout/${id}`);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/courses/${id}` } } });
      return;
    }
    if (!newReview.comment.trim()) return;

    setSubmittingReview(true);
    try {
      const review = await addReview({
        courseId: id,
        userId: user.uid,
        userName: user.displayName,
        rating: newReview.rating,
        comment: newReview.comment
      });
      setReviews(prev => [review, ...prev]);
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <Loading />;
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

            {/* Reviews Section */}
            <section className="pt-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-secondary flex items-center gap-3">
                  <MessageCircle className="text-primary" />
                  Student Reviews
                </h3>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-black text-secondary">{course.rating}</span>
                  <span className="text-gray-400 text-sm">({reviews.length} reviews)</span>
                </div>
              </div>

              {/* Add Review Form */}
              {enrolled && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
                  <h4 className="text-lg font-bold text-secondary mb-4">Leave a Review</h4>
                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Share your experience with this course..."
                      className="w-full p-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[120px]"
                      required
                    />
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={submittingReview}
                        className="flex items-center gap-2"
                      >
                        {submittingReview ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        Post Review
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black">
                            {review.userName?.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-bold text-secondary">{review.userName}</h5>
                            <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4 opacity-20" />
                    <p className="text-gray-400 font-medium">No reviews yet. Be the first to review!</p>
                  </div>
                )}
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
