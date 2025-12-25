import React from 'react';
import { Award, Target, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    { 
      icon: <Target className="w-10 h-10 text-blue-500" />, 
      title: 'Our Mission', 
      desc: 'To empower developers with the skills they need to build the future of the web through practical, project-based learning.' 
    },
    { 
      icon: <Heart className="w-10 h-10 text-red-500" />, 
      title: 'Passion', 
      desc: 'We are obsessed with teaching. Seeing our students land their dream jobs is what drives us every single day.' 
    },
    { 
      icon: <Award className="w-10 h-10 text-yellow-500" />, 
      title: 'Excellence', 
      desc: 'We don\'t settle for average. Every lesson, video, and resource is crafted to meet the highest industry standards.' 
    },
    { 
      icon: <Shield className="w-10 h-10 text-green-500" />, 
      title: 'Integrity', 
      desc: 'Radical transparency and student success always come before profit. We build trust through results.' 
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-32 md:py-48 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 bg-primary/20 text-primary rounded-2xl text-sm font-black uppercase tracking-[0.2em] mb-8 border border-primary/20"
          >
            Since 2023
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter"
          >
            We're on a mission to <span className="text-primary">redefine</span> tech education.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            T.H Academy was founded with a single goal: to provide high-quality, accessible frontend education to aspiring developers worldwide.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Graduates', value: '5,000+' },
              { label: 'Courses', value: '45+' },
              { label: 'Countries', value: '120+' },
              { label: 'Success Rate', value: '94%' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-secondary mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-secondary mb-8 tracking-tight">Our Story: From a Small Blog to a <span className="text-primary">Global Academy</span></h2>
              <div className="space-y-6">
                <p className="text-gray-500 leading-relaxed text-lg font-medium">
                  Starting as a small blog in 2023, T.H Academy has grown into a leading online platform for frontend development. We've helped thousands of students transition into tech careers at top companies.
                </p>
                <p className="text-gray-500 leading-relaxed text-lg font-medium">
                  Our curriculum is designed by industry experts who have worked at companies like Google, Meta, and Amazon. We focus on what actually matters in the real world: building, testing, and shipping professional applications.
                </p>
                <p className="text-gray-500 leading-relaxed text-lg font-medium">
                  We believe that anyone with curiosity and discipline can become a world-class engineer. Our job is to provide the roadmap and the community to make it happen.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 p-4 bg-white rounded-[3rem] shadow-2xl border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60" 
                  alt="Team working" 
                  className="rounded-[2.5rem] w-full shadow-inner"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-primary text-white p-10 rounded-[2.5rem] shadow-2xl z-20 hidden md:block border-4 border-white">
                <div className="text-5xl font-black mb-1">5+</div>
                <div className="text-xs font-black uppercase tracking-widest opacity-80">Years of<br/>Experience</div>
              </div>
              {/* Background accent */}
              <div className="absolute -top-10 -left-10 w-full h-full bg-primary/5 rounded-[3rem] -z-10 translate-x-4 translate-y-4" />
            </motion.div>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-secondary mb-4">Our Core Values</h2>
            <p className="text-gray-500 font-medium">The principles that guide everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] border border-gray-100 bg-white hover:border-primary/20 hover:shadow-2xl transition-all group"
              >
                <div className="mb-8 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-primary/10 transition-colors">{v.icon}</div>
                <h3 className="text-2xl font-black text-secondary mb-4">{v.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
