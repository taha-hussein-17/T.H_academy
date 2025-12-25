import React from 'react';
import { Shield, Lock, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Legal = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-2xl mb-4"
          >
            <Shield size={32} />
          </motion.div>
          <h1 className="text-4xl font-black text-secondary">Legal Center</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Your privacy and trust are important to us. Here you'll find information on how we handle your data and our terms of service.
          </p>
        </div>

        {/* Content Tabs (Simplified as a single page for now) */}
        <div className="space-y-12">
          {/* Privacy Policy */}
          <section id="privacy" className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-black text-secondary">Privacy Policy</h2>
            </div>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                At T.H Academy, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary">1. Information We Collect</h3>
                <p>
                  We collect information that you provide directly to us, such as when you create an account, enroll in a course, or contact us for support. This may include your name, email address, and profile picture.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary">2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about your progress and academy updates.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary">3. Data Security</h3>
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. Your data is stored behind secured networks and is only accessible by a limited number of persons.
                </p>
              </div>
            </div>
          </section>

          {/* Terms of Service */}
          <section id="terms" className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-black text-secondary">Terms of Service</h2>
            </div>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                By using T.H Academy, you agree to comply with and be bound by the following terms and conditions of use.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary">1. Use License</h3>
                <p>
                  Permission is granted to temporarily access the materials on T.H Academy's website for personal, non-commercial transitory viewing only.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary">2. User Conduct</h3>
                <p>
                  Users are expected to conduct themselves in a respectful manner within the community. Any form of harassment or sharing of copyrighted material is strictly prohibited.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-secondary">3. Disclaimer</h3>
                <p>
                  The materials on T.H Academy's website are provided on an 'as is' basis. T.H Academy makes no warranties, expressed or implied.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Contact */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 font-medium">
            Last updated: December 24, 2025. For any questions, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;
