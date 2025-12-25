import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  User, 
  Search,
  ChevronRight,
  Filter,
  BarChart3
} from 'lucide-react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { getAttendance } from '../utils/db';
import { BookOpen } from 'lucide-react';

const Attendance = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ stats: null, records: [] });

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const attendanceData = await getAttendance(user?.uid);
        setData(attendanceData);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [user]);

  const attendanceStats = data.stats ? [
    { label: 'Attendance Rate', value: `${data.stats.percentage}%`, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Total Sessions', value: data.stats.total.toString(), icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Late Arrivals', value: data.stats.late.toString(), icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Absences', value: data.stats.absent.toString(), icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  ] : [];

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
              Student Portal
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-black text-secondary"
            >
              Attendance <br /> Tracking
            </motion.h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-2xl h-14 px-8 flex items-center gap-2 shadow-xl shadow-primary/20">
              <BarChart3 size={20} />
              View Full Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {attendanceStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100"
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                <stat.icon size={28} />
              </div>
              <div className="text-3xl font-black text-secondary">{stat.value}</div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-secondary">Recent Activity</h2>
              <p className="text-gray-400 text-sm font-medium">Your attendance history for the current month.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search history..."
                className="pl-12 pr-6 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none w-full sm:w-64 font-medium text-sm"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.records.map((record) => (
                  <tr key={record.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-secondary">{record.date}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <BookOpen size={14} />
                        </div>
                        <span className="font-bold text-secondary">{record.subject}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">{record.time}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        record.status === 'Present' ? 'bg-green-100 text-green-600' :
                        record.status === 'Late' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-gray-300 hover:text-primary transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-gray-50/50 text-center">
            <button className="text-sm font-black text-primary uppercase tracking-widest hover:text-secondary transition-colors">
              Load More History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;