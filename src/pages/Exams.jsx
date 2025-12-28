import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Play,
  Calendar,
  Award
} from 'lucide-react';
import { getExams, getSubmissionsByUserId } from '../utils/db';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Loading from '../components/Loading';

const Exams = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsData, submissionsData] = await Promise.all([
          getExams(),
          user ? getSubmissionsByUserId(user.uid) : []
        ]);
        setExams(examsData);
        setSubmissions(submissionsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex p-4 bg-primary/10 text-primary rounded-[2rem] mb-6"
          >
            <FileText size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-secondary mb-4">Exams & Assessments</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Test your knowledge and earn your certification by completing these official exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {exams.map((exam) => {
            const submission = submissions.find(s => s.examId === exam.id);
            const isCompleted = !!submission;
            const isGraded = submission?.status === 'graded';

            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] p-8 md:p-10 shadow-xl border border-gray-100 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-gray-50 rounded-2xl text-primary">
                    <FileText size={24} />
                  </div>
                  {isCompleted ? (
                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 ${
                      isGraded ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {isGraded ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      {isGraded ? 'Graded' : 'Pending Review'}
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest">
                      Available
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-secondary mb-4">{exam.title}</h3>
                <p className="text-gray-500 mb-8 flex-grow leading-relaxed">
                  {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Clock size={18} />
                    <span className="text-sm font-bold">{exam.duration} Minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Calendar size={18} />
                    <span className="text-sm font-bold">Official Exam</span>
                  </div>
                </div>

                {isGraded ? (
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-800 font-bold">Your Score:</span>
                      <span className="text-2xl font-black text-green-600">{submission.grade}%</span>
                    </div>
                    <p className="text-green-700/70 text-sm font-medium italic">
                      "{submission.feedback || 'Great work on completing the exam!'}"
                    </p>
                  </div>
                ) : isCompleted ? (
                  <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100 mb-6 flex items-center gap-4">
                    <AlertCircle className="text-yellow-600 shrink-0" />
                    <p className="text-yellow-800 text-sm font-bold leading-tight">
                      Your answers have been submitted. An instructor will review and grade them soon.
                    </p>
                  </div>
                ) : null}

                <Button
                  onClick={() => navigate(`/exams/${exam.id}`)}
                  disabled={isCompleted}
                  className={`w-full h-16 rounded-2xl text-lg font-black flex items-center justify-center gap-3 ${
                    isCompleted ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 size={20} />
                      Already Submitted
                    </>
                  ) : (
                    <>
                      <Play size={20} fill="currentColor" />
                      Start Exam Now
                    </>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {exams.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-400">No exams available at the moment.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;
