import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Wallet
} from 'lucide-react';
import { getCourseById, enrollInCourse } from '../utils/db';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: user?.displayName || ''
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        if (!data) {
          navigate('/courses');
          return;
        }
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing delay (Stripe/PayPal imitation)
    setTimeout(async () => {
      try {
        await enrollInCourse(user.uid, courseId);
        setCompleted(true);
        setProcessing(false);
        
        // Redirect to course after 3 seconds
        setTimeout(() => {
          navigate(`/courses/${courseId}/lessons/1`);
        }, 3000);
      } catch (err) {
        console.error(err);
        setProcessing(false);
      }
    }, 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md w-full border border-green-100"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">
            Congratulations! You have successfully enrolled in <strong>{course.title}</strong>.
            Redirecting you to the course player...
          </p>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3 }}
              className="h-full bg-green-500"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Payment Form */}
          <div className="flex-1">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-[3rem] shadow-xl p-8 md:p-12 border border-gray-100"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <CreditCard className="text-primary" />
                Checkout
              </h1>

              <div className="space-y-8">
                {/* Payment Method Selector */}
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        paymentMethod === 'card' 
                        ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' 
                        : 'border-gray-100 hover:border-gray-200 text-gray-500'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="font-semibold">Stripe / Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        paymentMethod === 'paypal' 
                        ? 'border-[#0070ba] bg-[#0070ba]/5 text-[#0070ba] shadow-lg shadow-[#0070ba]/10' 
                        : 'border-gray-100 hover:border-gray-200 text-gray-500'
                      }`}
                    >
                      <div className="w-5 h-5 bg-[#0070ba] text-white rounded-full flex items-center justify-center text-[10px] font-bold">P</div>
                      <span className="font-semibold">PayPal</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleCheckout} className="space-y-6">
                  {paymentMethod === 'card' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            required
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all pl-14"
                          />
                          <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            required
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">CVV</label>
                          <div className="relative">
                            <input
                              type="password"
                              name="cvv"
                              required
                              maxLength="3"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="***"
                              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all pr-12"
                            />
                            <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-50 p-8 rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
                      <div className="w-16 h-16 bg-[#0070ba]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-[#0070ba] text-2xl font-bold italic">PayPal</div>
                      </div>
                      <p className="text-gray-600 mb-6">سيتم توجيهك إلى صفحة PayPal لإتمام عملية الدفع بأمان.</p>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Email:</span>
                        <span className="font-bold text-gray-800">{user?.email}</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
                    <ShieldCheck className="text-blue-600 w-6 h-6 flex-shrink-0" />
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Your payment information is encrypted and processed securely. We never store your credit card details.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className={`w-full text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group ${
                      paymentMethod === 'paypal' ? 'bg-[#0070ba] hover:bg-[#005ea6] shadow-[#0070ba]/20' : 'bg-primary hover:bg-secondary shadow-primary/20'
                    }`}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        {paymentMethod === 'paypal' ? 'Connecting to PayPal...' : 'Processing Payment...'}
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'paypal' ? 'Pay with PayPal' : 'Complete Enrollment'}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-96">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="sticky top-32 space-y-6"
            >
              {/* Course Card */}
              <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                <img 
                  src={course.image || 'https://via.placeholder.com/400x200'} 
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      {course.level}
                    </span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Course Price</span>
                      <span className="font-semibold">${course.price}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service Fee</span>
                      <span className="font-semibold text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                      <span>Total</span>
                      <span>${course.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  <span className="text-sm">30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  <span className="text-sm">Lifetime access to content</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  <span className="text-sm">Verified Certificate of Completion</span>
                </div>
              </div>

              {/* Support */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Need help? <a href="/faq" className="text-primary font-semibold hover:underline">Visit our Help Center</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
