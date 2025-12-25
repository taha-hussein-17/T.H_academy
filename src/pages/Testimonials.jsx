import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { getTestimonials } from '../utils/db';
import Loading from '../components/Loading';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getTestimonials();
      setTestimonials(data);
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest mb-6"
          >
            Success Stories
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-secondary mb-6 tracking-tighter"
          >
            قصص نجاح <span className="text-primary">طلابنا</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            نحن لا نبيع كورسات، نحن نبني مستقبلاً. اقرأ ما يقوله طلابنا الذين غيروا حياتهم المهنية معنا.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-10 rounded-[3rem] relative group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 border border-transparent hover:border-gray-100"
            >
              <Quote className="absolute top-8 right-10 text-primary/10 w-16 h-16 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(t.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>

              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-10 relative z-10 italic">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform"
                />
                <div>
                  <h4 className="text-lg font-black text-secondary leading-tight">{t.name}</h4>
                  <p className="text-sm font-bold text-primary uppercase tracking-tighter">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Quote */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 bg-secondary text-white rounded-[4rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          </div>

          <Quote className="mx-auto mb-10 text-primary w-16 h-16" />
          <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tighter max-w-4xl mx-auto">
            "الأكاديمية ليست مجرد مكان للتعلم، بل هي عائلة تدفعك نحو الأفضل دائماً."
          </h2>
          <div className="flex flex-col items-center">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D35AQGF6NvpuU2rEA/profile-framedphoto-shrink_200_200/B4DZlRVn5XJcAY-/0/1758006247325?e=1767276000&v=beta&t=kF2TQ2FG_fz9JdjwiATDfOpOXGuoHYWS_kpPJEp5940" 
              className="w-20 h-20 rounded-full border-4 border-primary shadow-2xl mb-4 object-cover"
              alt="Founder"
            />
            <p className="text-xl font-black">طه حسين</p>
            <p className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Founder of T.H Academy</p>
          </div>
        </motion.div>

        {/* Join Community */}
        <div className="mt-32 text-center">
          <h3 className="text-3xl font-black text-secondary mb-4 tracking-tighter">كن جزءاً من قصة نجاحنا القادمة</h3>
          <p className="text-gray-500 font-medium mb-10">ابدأ رحلتك اليوم وانضم إلى أكثر من 5,000 طالب ناجح.</p>
          <button className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center gap-4 mx-auto group">
            اشترك الآن في الكورسات
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
