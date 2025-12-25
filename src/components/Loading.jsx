import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Loading = () => {
  const name = "T.H Academy";
  
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      {/* Animated Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
        animate={{ 
          scale: [0.5, 1.1, 1],
          opacity: 1,
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="bg-primary text-white w-20 h-20 flex items-center justify-center rounded-3xl shadow-2xl shadow-primary/30 mb-8"
      >
        <BookOpen size={40} />
      </motion.div>

      {/* Animated Text */}
      <div className="flex space-x-1">
        {name.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: index * 0.05,
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5
            }}
            className="text-3xl font-black text-secondary tracking-tighter"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Progress Line */}
      <motion.div 
        className="w-48 h-1.5 bg-gray-100 rounded-full mt-8 overflow-hidden"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </motion.div>

      {/* Background Decorative Elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"
      />
    </div>
  );
};

export default Loading;
