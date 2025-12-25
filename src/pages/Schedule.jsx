import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { getSchedule } from '../utils/db';

const Schedule = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('All');
  const [scheduleData, setScheduleData] = useState([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getSchedule();
        // Flatten the data if it comes in day-grouped format or handle it accordingly
        // LOCAL_SCHEDULE is [{day, classes: []}, ...]
        // The original component expected flat [{id, day, time, ...}, ...]
        const flatData = data.flatMap(dayGroup => 
          dayGroup.classes.map(cls => ({
            ...cls,
            day: dayGroup.day,
            // Add colors based on subject or random for demo
            color: cls.subject.includes('React') ? 'bg-blue-500' : 
                   cls.subject.includes('UX') ? 'bg-purple-500' :
                   cls.subject.includes('CSS') ? 'bg-cyan-500' :
                   cls.subject.includes('Java') ? 'bg-yellow-500' :
                   cls.subject.includes('Node') ? 'bg-green-500' : 'bg-pink-500'
          }))
        );
        setScheduleData(flatData);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const filteredSchedule = selectedDay === 'All' 
    ? scheduleData 
    : scheduleData.filter(item => item.day === selectedDay);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary font-black uppercase tracking-widest text-sm"
            >
              Academic Calendar
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-black text-secondary"
            >
              Class <br /> Schedule
            </motion.h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-2xl h-14 px-8 flex items-center gap-2">
              <Download size={20} />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Day Filter */}
        <div className="flex overflow-x-auto gap-2 pb-6 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedDay('All')}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap
              ${selectedDay === 'All' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
          >
            All Days
          </button>
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap
                ${selectedDay === day ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedule.length > 0 ? (
            filteredSchedule.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700`} />
                
                <div className="flex items-center justify-between mb-8">
                  <div className={`px-4 py-2 ${item.color} text-white text-[10px] font-black uppercase tracking-widest rounded-xl`}>
                    {item.day}
                  </div>
                  <div className="text-gray-400 flex items-center gap-2 text-xs font-bold">
                    <Clock size={14} />
                    {item.time.split(' - ')[0]}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-secondary mb-2 group-hover:text-primary transition-colors">
                  {item.subject}
                </h3>
                
                <div className="space-y-4 mt-8 pt-8 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instructor</p>
                      <p className="text-sm font-bold text-secondary">{item.instructor || item.teacher}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold text-secondary">{item.room}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold text-secondary">No classes scheduled</h3>
              <p className="text-gray-500">Select another day or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;