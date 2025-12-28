import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Clock, 
  GraduationCap, 
  ChevronRight, 
  CheckCircle, 
  PlayCircle 
} from 'lucide-react';
import { getLearningPaths } from '../utils/db';
import Loading from '../components/Loading';

const LearningPaths = () => {
  const navigate = useNavigate();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      const data = await getLearningPaths();
      setPaths(data);
      setLoading(false);
    };
    fetchPaths();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-secondary mb-4 tracking-tight"
          >
            المسارات التعليمية المنظمة
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto font-medium"
          >
            لا تشتت نفسك، اختر مسارك المفضل واتبع خارطة الطريق للوصول إلى الاحتراف.
          </motion.p>
        </div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 overflow-hidden border border-gray-100 flex flex-col md:flex-row group"
            >
              {/* Image Section */}
              <div className="md:w-1/3 relative overflow-hidden">
                <img 
                  src={path.image} 
                  alt={path.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-${path.color}-600/80 to-transparent md:bg-gradient-to-r`} />
                <div className="absolute bottom-6 left-6 text-white md:hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <Rocket size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">{path.level}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-2/3 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 bg-${path.color}-50 text-${path.color}-600 text-xs font-black uppercase tracking-widest rounded-lg mb-3`}>
                      {path.duration}
                    </span>
                    <h2 className="text-2xl font-black text-secondary mb-2">{path.title}</h2>
                  </div>
                  <div className="hidden md:flex flex-col items-end">
                    <div className={`w-12 h-12 rounded-2xl bg-${path.color}-50 flex items-center justify-center text-${path.color}-600 mb-1`}>
                      <GraduationCap size={24} />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{path.coursesCount} Courses</span>
                  </div>
                </div>

                <p className="text-gray-500 font-medium mb-6 leading-relaxed">
                  {path.description}
                </p>

                {/* Steps / Roadmap Preview */}
                <div className="space-y-3 mb-8">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">خارطة الطريق:</h3>
                  {path.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3">
                      {step.status === 'completed' ? (
                        <CheckCircle size={18} className="text-green-500" />
                      ) : step.status === 'current' ? (
                        <PlayCircle size={18} className="text-blue-500 animate-pulse" />
                      ) : (
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-200" />
                      )}
                      <span className={`text-sm font-bold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-secondary'}`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => navigate('/courses')}
                  className={`mt-auto w-full py-4 rounded-2xl bg-secondary text-white font-black uppercase tracking-widest text-sm hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-lg shadow-secondary/10`}
                >
                  ابدأ المسار الآن
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">هل أنت مستعد لتغيير مسارك المهني؟</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto font-medium">
              انضم إلى آلاف الطلاب الذين حققوا أحلامهم من خلال مساراتنا التعليمية المتكاملة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="px-10 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
              >
                استشارة تعليمية مجانية
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="px-10 py-4 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
              >
                تصفح كافة المسارات
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningPaths;
