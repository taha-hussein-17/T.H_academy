import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, Award, Star, CheckCircle2, ArrowRight, 
  Play, ShieldCheck, Zap, Globe, MessageSquare, Heart,
  Sparkles, Code, Rocket, Brain, Quote, Mail, ChevronDown,
  Instagram, Twitter, Github, Linkedin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { getCourses } from '../utils/db';

const Home = () => {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getCourses();
        setFeaturedCourses(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  if (loading) return <Loading />;

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 bg-white overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary/10 rounded-2xl text-primary text-sm font-black mb-10 border border-primary/10"
              >
                <Sparkles size={18} className="animate-bounce" />
                <span className="uppercase tracking-wider">The Future of Learning is Here</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-black text-secondary leading-[0.9] tracking-tight mb-8">
                Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Dream</span> Career In Tech
              </h1>
              
              <p className="text-xl text-gray-500 leading-relaxed max-w-xl mb-12 font-medium">
                Master the world's most in-demand technologies with expert-led courses, real-world projects, and a community of 10,000+ developers.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="px-12 h-20 text-xl group shadow-2xl shadow-primary/30 rounded-3xl"
                  onClick={() => navigate('/courses')}
                >
                  Get Started Free
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
                <button 
                  onClick={() => navigate('/courses')}
                  className="flex items-center justify-center gap-4 px-10 h-20 text-secondary font-black hover:bg-gray-50 rounded-3xl border-2 border-gray-100 transition-all hover:border-primary/20"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <Play fill="currentColor" size={18} />
                  </div>
                  Watch Preview
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-10 mt-16 pt-12 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1,2,3,4,5].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-2xl border-4 border-white shadow-sm object-cover" alt="" />
                    ))}
                  </div>
                  <div>
                    <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-sm font-black text-secondary">4.9/5 Rating</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-gray-100 hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 font-black">
                    10k+
                  </div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Global Students</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative lg:ml-10"
            >
              <div className="relative z-10 p-4 bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070" 
                  className="rounded-[3.5rem] w-full aspect-[4/5] object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                  alt="" 
                />
                
                {/* Floating UI Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -left-12 top-1/4 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-white/50 flex items-center gap-5 max-w-[240px]"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Success Story</p>
                    <p className="text-sm font-black text-secondary">Hired at Google</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  className="absolute -right-12 bottom-1/3 bg-secondary/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-white/10 flex items-center gap-5 text-white"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                    <Code size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Live Mentorship</p>
                    <p className="text-sm font-black">Join 24/7 Room</p>
                  </div>
                </motion.div>

                {/* Tech Stack Floating Badges */}
                <div className="absolute -left-20 bottom-10 flex flex-col gap-4">
                  {['React', 'Next.js', 'Tailwind'].map((tech, i) => (
                    <motion.div
                      key={tech}
                      animate={{ x: [0, 15, 0] }}
                      transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                      className="px-6 py-3 bg-white shadow-xl rounded-2xl border border-gray-100 flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-black text-secondary">{tech}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              </div>
              
              {/* Background Geometric Shapes */}
              <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl" />
              <div className="absolute -z-20 top-0 left-0 w-full h-full border-[20px] border-gray-50 rounded-[5rem] translate-x-10 translate-y-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="py-20 border-y border-gray-100 bg-gray-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-black text-gray-400 uppercase tracking-[0.4em] mb-16">Trusted by developers from world-class teams</p>
          
          <div className="relative flex overflow-hidden">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-24 md:gap-40 whitespace-nowrap"
            >
              {[
                "GOOGLE", "MICROSOFT", "AMAZON", "NETFLIX", "META", "VERCEL", "STRIPE", "AIRBNB"
              ].map((brand, i) => (
                <span key={i} className="text-3xl md:text-4xl font-black tracking-tighter text-secondary/20 hover:text-primary transition-colors cursor-default">
                  {brand}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                "GOOGLE", "MICROSOFT", "AMAZON", "NETFLIX", "META", "VERCEL", "STRIPE", "AIRBNB"
              ].map((brand, i) => (
                <span key={i+"-clone"} className="text-3xl md:text-4xl font-black tracking-tighter text-secondary/20 hover:text-primary transition-colors cursor-default">
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20"
          >
            {[
              { icon: BookOpen, label: "Premium Courses", value: "50+", color: "bg-blue-500" },
              { icon: Users, label: "Active Students", value: "10k+", color: "bg-purple-500" },
              { icon: Award, label: "Certificates Issued", value: "8k+", color: "bg-green-500" },
              { icon: Star, label: "Expert Mentors", value: "25+", color: "bg-yellow-500" }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="relative group">
                <div className="flex flex-col items-center">
                  <div className={`w-20 h-20 ${stat.color} rounded-[2.5rem] flex items-center justify-center mb-8 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-black/20`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-5xl md:text-6xl font-black mb-3 tracking-tighter">{stat.value}</div>
                  <div className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-primary font-black uppercase tracking-[0.2em] text-sm"
              >
                Start Learning Today
              </motion.span>
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-black text-secondary"
              >
                Featured <span className="text-primary">Masterclasses</span>
              </motion.h2>
            </div>
            <Button 
              variant="outline" 
              className="border-gray-200 hover:border-primary text-secondary"
              onClick={() => navigate('/courses')}
            >
              Explore All Courses <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[2.5rem] h-[500px] animate-pulse" />
              ))
            ) : (
              featuredCourses.map((course, index) => (
                <motion.div 
                  key={course.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all group cursor-pointer"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur text-secondary rounded-xl text-xs font-black shadow-sm">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-yellow-400 mb-4">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-black text-secondary">{course.rating}</span>
                      <span className="text-sm font-bold text-gray-400">({course.students} students)</span>
                    </div>
                    <h3 className="text-2xl font-black text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                        <BookOpen size={18} className="text-primary" />
                        {course.duration}
                      </div>
                      <div className="text-2xl font-black text-primary">
                        {course.price}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Your Path to <span className="text-primary">Mastery</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto font-medium">Three simple steps to launch your career in frontend development.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                icon: Brain,
                title: "Choose Path",
                desc: "Select a curated learning path that aligns with your career goals.",
                step: "01"
              },
              {
                icon: Code,
                title: "Build Projects",
                desc: "Learn by doing. Build real-world applications with expert guidance.",
                step: "02"
              },
              {
                icon: Award,
                title: "Get Certified",
                desc: "Receive a verified certificate and join our talent network.",
                step: "03"
              }
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {i < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-px bg-white/10" />
                )}
                <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 relative">
                  <item.icon size={40} className="text-primary group-hover:text-white transition-colors" />
                  <span className="absolute -top-4 -right-4 w-10 h-10 bg-secondary border-4 border-white/10 rounded-full flex items-center justify-center text-xs font-black">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-black uppercase tracking-[0.2em] text-sm"
            >
              Success Stories
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-black text-secondary mt-4">What Our <span className="text-primary">Students</span> Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Frontend Developer at Vercel",
                image: "https://i.pravatar.cc/150?img=32",
                content: "T.H Academy completely changed my career path. The projects are real-world and the mentorship is top-notch. I went from zero to a job at Vercel in 6 months!",
                rating: 5
              },
              {
                name: "Sarah Chen",
                role: "Senior UI Engineer",
                image: "https://i.pravatar.cc/150?img=44",
                content: "The advanced courses here are truly advanced. No fluff, just pure architectural knowledge. Best investment I've made in my professional development.",
                rating: 5
              },
              {
                name: "Marco Rossi",
                role: "Fullstack Developer",
                image: "https://i.pravatar.cc/150?img=12",
                content: "I've tried many platforms, but the community and the structured learning paths here are what make the difference. Highly recommended for serious learners.",
                rating: 5
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 relative group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute -top-6 left-10 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  <Quote size={20} fill="currentColor" />
                </div>
                <div className="flex text-yellow-400 mb-6 mt-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 font-medium leading-relaxed mb-8 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-black text-secondary">{t.name}</h4>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-black uppercase tracking-[0.2em] text-sm"
            >
              Why Choose T.H Academy
            </motion.span>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-secondary mt-4 mb-6"
            >
              Everything you need to <span className="text-primary">Succeed</span>
            </motion.h2>
            <p className="text-gray-500 text-lg font-medium">
              We provide the tools, community, and expert guidance to help you reach your full potential as a modern developer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: ShieldCheck, 
                title: "Industry Certification", 
                desc: "Get recognized by top tech companies with our verifiable certificates of completion.",
                color: "blue"
              },
              { 
                icon: Zap, 
                title: "Accelerated Learning", 
                desc: "Our curriculum is designed to get you job-ready in weeks, not years, focusing on what matters.",
                color: "orange"
              },
              { 
                icon: MessageSquare, 
                title: "24/7 Expert Support", 
                desc: "Get stuck? Our team of industry experts and community mentors are here to help you 24/7.",
                color: "green"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-gray-50 rounded-[3rem] hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all group border border-transparent hover:border-gray-100"
              >
                <div className={`w-20 h-20 rounded-[2rem] bg-${feature.color}-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-10 h-10 text-${feature.color}-500`} />
                </div>
                <h3 className="text-2xl font-black text-secondary mb-4">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (Pro View) */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6">Simple, <span className="text-primary">Pro</span> Pricing</h2>
            <p className="text-gray-500 text-lg">Choose the plan that's right for your career goals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Starter", price: "Free", features: ["Access to 5 free courses", "Community support", "Basic certificates", "Public profile"], pro: false },
              { name: "Pro", price: "$19/mo", features: ["Access to all courses", "Priority support", "Premium certificates", "Job board access", "Live workshops"], pro: true },
              { name: "Business", price: "$49/mo", features: ["Team management", "Custom learning paths", "LMS integration", "Dedicated manager", "API access"], pro: false }
            ].map((plan, i) => (
              <div key={i} className={`p-10 rounded-[3rem] ${plan.pro ? 'bg-secondary text-white shadow-2xl scale-105 z-10' : 'bg-white border border-gray-100'} transition-all`}>
                <div className="mb-8">
                  <h3 className={`text-xl font-black mb-2 ${plan.pro ? 'text-primary' : 'text-gray-400'}`}>{plan.name}</h3>
                  <div className="text-5xl font-black tracking-tighter">{plan.price}</div>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 font-medium">
                      <CheckCircle2 size={18} className={plan.pro ? 'text-primary' : 'text-green-500'} />
                      <span className={plan.pro ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.pro ? 'primary' : 'outline'} 
                  className="w-full h-16 rounded-2xl text-lg"
                  onClick={() => navigate('/courses')}
                >
                  {plan.pro ? 'Get Pro Access' : 'Start for Free'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6">Frequently Asked <span className="text-primary">Questions</span></h2>
            <p className="text-gray-500 text-lg">Everything you need to know about the platform and courses.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Do I get a certificate after completion?", a: "Yes! Every premium course comes with a verifiable certificate that you can share on LinkedIn or with employers." },
              { q: "Can I access the courses offline?", a: "Yes, with our mobile app you can download lessons and watch them anytime, anywhere." },
              { q: "Is there a community for support?", a: "Absolutely. You'll get access to our private Discord community where thousands of students and mentors help each other." },
              { q: "What happens if I'm not satisfied?", a: "We offer a 30-day money-back guarantee. If you're not happy, we'll refund your purchase, no questions asked." }
            ].map((faq, i) => (
              <div 
                key={i}
                className="border-2 border-gray-50 rounded-3xl overflow-hidden transition-all hover:border-primary/20"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-8 text-left group"
                >
                  <span className="text-xl font-black text-secondary group-hover:text-primary transition-colors">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-all ${openFaq === i ? 'rotate-180 bg-primary text-white' : 'text-gray-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-secondary rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4" />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-primary text-xs font-black uppercase tracking-widest mb-8"
                >
                  <Users size={16} />
                  Join the movement
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                  Connect with a global <span className="text-primary">community</span> of creators
                </h2>
                <p className="text-xl text-gray-400 font-medium mb-12 leading-relaxed">
                  Don't learn alone. Join our Discord server to get help, share your progress, and network with other developers.
                </p>
                <Button 
                  size="lg" 
                  className="px-12 h-20 text-xl rounded-[2rem]"
                  onClick={() => navigate('/community')}
                >
                  Join Discord Community
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Instagram, label: "Instagram", followers: "50k+" },
                  { icon: Twitter, label: "Twitter", followers: "25k+" },
                  { icon: Github, label: "GitHub", followers: "100k+" },
                  { icon: Linkedin, label: "LinkedIn", followers: "80k+" }
                ].map((social, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] text-center group cursor-pointer"
                  >
                    <social.icon size={32} className="mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-white font-black text-xl mb-1">{social.followers}</div>
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-tighter">{social.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] h-[300px] bg-black/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">Ready to start your development career?</h2>
            <p className="text-xl text-white/80 font-medium">
              Join thousands of students who are already learning and growing with T.H Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 px-12 h-16 text-lg"
                onClick={() => navigate('/signup')}
              >
                Join for Free
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 px-12 h-16 text-lg"
                onClick={() => navigate('/courses')}
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      {/* <footer className="pt-32 pb-10 bg-secondary text-white overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-2xl rotate-3">
                  <BookOpen className="h-7 w-7" />
                </div>
                <span className="text-3xl font-black tracking-tighter">T.H Academy</span>
              </div>
              <p className="text-gray-400 font-medium leading-relaxed">
                Empowering the next generation of developers with world-class education and community support.
              </p>
              <div className="flex items-center gap-4">
                {[Instagram, Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary transition-all group">
                    <Icon size={20} className="text-gray-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Platform", links: ["All Courses", "Leaderboard", "Learning Paths", "Certificates"] },
              { title: "Resources", links: ["Community", "Blog", "Success Stories", "Newsletter"] },
              { title: "Support", links: ["Help Center", "Terms of Service", "Privacy Policy", "Contact Us"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-primary">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 font-medium">© 2024 T.H Academy. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-500 font-medium uppercase tracking-widest text-xs">System Status: Operational</span>
            </div>
          </div>
        </div>
      </footer> */}
      {/* Newsletter / CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-secondary rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
            {/* Background elements for CTA */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-2xl text-primary text-xs font-black uppercase tracking-widest border border-white/5">
                  <Sparkles size={14} />
                  Limited Time Offer
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  Ready to start your <span className="text-primary">tech journey</span> today?
                </h2>
                <p className="text-gray-400 text-lg font-medium max-w-md">
                  Join 10,000+ students and get 20% off your first premium course. No credit card required to start.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button 
                    size="lg" 
                    className="h-16 px-10 shadow-xl shadow-primary/20"
                    onClick={() => navigate('/signup')}
                  >
                    Create Free Account
                  </Button>
                  <button 
                    onClick={() => navigate('/courses')}
                    className="h-16 px-10 rounded-2xl border-2 border-white/10 text-white font-black hover:bg-white/5 transition-all"
                  >
                    View Pricing
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-8 border border-white/10">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                  <Mail className="text-primary" /> Get Learning Tips
                </h3>
                <p className="text-gray-400 mb-8 text-sm font-medium">
                  We send weekly emails with free tutorials, job opportunities, and design inspiration. No spam, ever.
                </p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl transition shadow-lg shadow-primary/20">
                    Subscribe to Newsletter
                  </button>
                  <p className="text-[10px] text-gray-500 text-center font-bold uppercase tracking-widest">
                    By subscribing, you agree to our Terms of Service
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
