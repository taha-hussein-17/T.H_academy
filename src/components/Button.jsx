import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-black transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-4 h-10 text-xs uppercase tracking-widest',
    md: 'px-8 h-12 text-sm uppercase tracking-widest',
    lg: 'px-12 h-16 text-lg uppercase tracking-widest',
  };

  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5',
    secondary: 'bg-secondary text-white hover:bg-slate-800 shadow-xl shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-0.5',
    outline: 'bg-transparent text-secondary border-2 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-primary',
    white: 'bg-white text-primary hover:bg-gray-50 shadow-xl shadow-black/5 hover:shadow-black/10 hover:-translate-y-0.5',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5',
    success: 'bg-green-500 text-white hover:bg-green-600 shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-0.5',
  };

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className} rounded-2xl`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
