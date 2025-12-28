import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, ArrowRight, Video } from 'lucide-react';
import { getEvents } from '../utils/db';
import Loading from '../components/Loading';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const handleBooking = (eventId) => {
    setBooking(eventId);
    setTimeout(() => {
      setBooking(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-secondary mb-4 tracking-tighter"
          >
            الأحداث والورش التدريبية
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto font-medium"
          >
            ابقَ على اطلاع دائم بأحدث ورش العمل والندوات المباشرة لتطوير مهاراتك.
          </motion.p>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 overflow-hidden border border-gray-100 group"
            >
              <div className="relative h-64">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-xs font-black text-primary uppercase tracking-widest">
                  {event.type}
                </div>
              </div>
              
              <div className="p-10">
                <div className="flex flex-wrap gap-6 mb-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-primary" />
                    {event.instructor}
                  </div>
                </div>

                <h2 className="text-2xl font-black text-secondary mb-4 group-hover:text-primary transition-colors">
                  {event.title}
                </h2>
                
                <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                  {event.description}
                </p>

                <button 
                  onClick={() => handleBooking(event.id)}
                  disabled={booking === event.id}
                  className="w-full py-4 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-lg shadow-secondary/10 disabled:opacity-70"
                >
                  {booking === event.id ? 'جاري الحجز...' : (
                    <>
                      احجز مقعدك الآن
                      <Video size={18} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="bg-secondary text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Video size={18} />
          </div>
          تم حجز مقعدك بنجاح! ستصلك تفاصيل الحضور عبر البريد.
        </div>
      </div>
    </div>
  );
};

export default Events;
