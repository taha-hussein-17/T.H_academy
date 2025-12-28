import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Save,
  User,
  FileText,
  Clock
} from 'lucide-react';
import { getAllSubmissions, getExamById, gradeSubmission } from '../utils/db';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Loading from '../components/Loading';

const AdminGradeExam = () => {
  const { submissionId } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submissions = await getAllSubmissions();
        const sub = submissions.find(s => s.id === submissionId);
        if (!sub) {
          navigate('/admin');
          return;
        }
        setSubmission(sub);
        setGrade(sub.grade || '');
        setFeedback(sub.feedback || '');

        const examData = await getExamById(sub.examId);
        setExam(examData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [submissionId, navigate]);

  const handleSaveGrade = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    try {
      await gradeSubmission(submissionId, {
        grade: parseInt(grade),
        feedback: feedback
      });
      navigate('/admin', { state: { tab: 'submissions' } });
    } catch (err) {
      console.error(err);
      alert('Failed to save grade.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAdmin) return <div>Access Denied</div>;
  if (loading) return <Loading />;
  if (!submission || !exam) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/admin', { state: { tab: 'submissions' } })}
          className="flex items-center gap-2 text-gray-500 font-black uppercase tracking-widest text-xs mb-8 hover:text-secondary transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black text-secondary mb-2">Grade Submission</h1>
            <p className="text-gray-500 font-medium">Reviewing answers for <span className="text-primary font-bold">{exam.title}</span></p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <User size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Student</p>
              <p className="text-lg font-black text-secondary">{submission.userName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Answers Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-secondary flex items-center gap-3">
              <FileText className="text-primary" />
              Student Answers
            </h2>
            
            {exam.questions.map((question, idx) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-6">
                  <span className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 font-black text-sm shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-xl font-black text-secondary leading-tight">
                    {question.text}
                  </h3>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Student Answer:</p>
                  {question.type === 'multiple-choice' ? (
                    <div className="space-y-3">
                      {question.options.map((option, optIdx) => (
                        <div 
                          key={optIdx}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                            submission.answers[question.id] === optIdx
                              ? (optIdx === question.correct ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                              : (optIdx === question.correct ? 'border-green-200 bg-green-50/30 text-green-600' : 'border-transparent text-gray-400')
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black ${
                            submission.answers[question.id] === optIdx ? 'bg-current text-white' : 'border-current'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span className="font-bold">{option}</span>
                          {submission.answers[question.id] === optIdx && (
                            <span className="ml-auto text-[10px] font-black uppercase">
                              {optIdx === question.correct ? 'Correct' : 'Incorrect'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg font-medium text-secondary whitespace-pre-wrap">
                      {submission.answers[question.id] || <span className="italic text-gray-400">No answer provided</span>}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Grading Form */}
          <div className="bg-secondary text-white rounded-[3rem] p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-primary" />
              Final Grade & Feedback
            </h2>

            <form onSubmit={handleSaveGrade} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Final Score (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      required
                      className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-8 py-6 text-4xl font-black text-center focus:border-primary focus:bg-white/20 outline-none transition-all"
                      placeholder="0"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl font-black text-white/20">%</span>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Instructor Feedback</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="4"
                    className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-8 py-6 text-lg font-medium focus:border-primary focus:bg-white/20 outline-none transition-all resize-none"
                    placeholder="Provide constructive feedback to the student..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  onClick={() => navigate('/admin', { state: { tab: 'submissions' } })}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 h-16 rounded-2xl font-black"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isSaving}
                  className="bg-primary hover:bg-white hover:text-primary px-12 h-16 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center gap-3"
                >
                  <Save size={20} />
                  Save Grade
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGradeExam;
