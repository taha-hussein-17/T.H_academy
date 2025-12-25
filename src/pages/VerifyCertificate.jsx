import React, { useState } from 'react';
import { Award, ShieldCheck, Search, Download, Share2, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { verifyCertificateById } from '../utils/db';

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await verifyCertificateById(certId.trim());
      setResult(data);
    } catch (err) {
      setResult({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex p-3 bg-green-100 text-green-600 rounded-2xl mb-4"
          >
            <ShieldCheck size={32} />
          </motion.div>
          <h1 className="text-4xl font-black text-secondary">Verify Certificate</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Enter the certificate ID to verify the authenticity of a T.H Academy credential.
          </p>
        </div>

        {/* Search Form */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 mb-12"
        >
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input 
                type="text" 
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="Enter Certificate ID (e.g., THA-12345)"
                className="w-full pl-16 pr-8 py-6 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-lg font-bold placeholder:font-medium"
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-16 text-lg"
              loading={loading}
              disabled={!certId.trim()}
            >
              Verify Credential
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400 font-medium">
            The certificate ID can be found at the bottom of the issued certificate.
          </p>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-8 md:p-12 rounded-[3rem] border-2 shadow-2xl ${
                result.status === 'success' ? 'bg-white border-green-500' : 'bg-red-50 border-red-200'
              }`}
            >
              {result.status === 'success' ? (
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-secondary">Verified Credential</h2>
                      <p className="text-green-600 font-bold">This certificate is authentic and active.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-gray-100">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Student Name</label>
                      <p className="text-xl font-black text-secondary">{result.student}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Course Title</label>
                      <p className="text-xl font-black text-secondary">{result.course}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Issue Date</label>
                      <p className="text-xl font-black text-secondary">{result.issuedDate}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Certificate ID</label>
                      <p className="text-xl font-black text-secondary">{result.id}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex-1 gap-2 border-gray-200">
                      <Download size={18} /> Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2 border-gray-200">
                      <Share2 size={18} /> Share Credential
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
                    <XCircle size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-secondary">Verification Failed</h2>
                    <p className="text-red-600 font-bold mt-2">{result.message}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-10">
          {[
            {
              icon: ShieldCheck,
              title: "Tamper Proof",
              desc: "Our certificates use blockchain technology to ensure they cannot be forged."
            },
            {
              icon: Award,
              title: "Industry Recognized",
              desc: "Employers trust T.H Academy credentials for technical skill validation."
            },
            {
              icon: Share2,
              title: "Easy Sharing",
              desc: "One-click sharing to LinkedIn, Twitter, and professional portfolios."
            }
          ].map((benefit, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mx-auto">
                <benefit.icon size={24} />
              </div>
              <h3 className="font-black text-secondary">{benefit.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
