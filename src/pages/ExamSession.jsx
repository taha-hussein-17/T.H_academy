import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Timer
} from 'lucide-react';
import { getExamById, submitExam } from '../utils/db';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Loading from '../components/Loading';

const ExamSession = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const data = await getExamById(id);
        if (!data) {
          navigate('/exams');
          return;
        }
        setExam(data);
        setTimeLeft(data.duration * 60);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && exam && !isFinished) {
      handleSubmit();
    }
  }, [timeLeft, isFinished, exam]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      await submitExam({
        examId: id,
        examTitle: exam.title,
        userId: user.uid,
        userName: user.displayName,
        answers: answers,
        timeSpent: exam.duration * 60 - timeLeft
      });
      setIsFinished(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!exam) return null;

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md w-full border border-green-100"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-secondary mb-4">Exam Submitted!</h2>
          <p className="text-gray-500 mb-8 font-medium">
            Your answers have been successfully submitted for review. An instructor will grade your exam soon.
          </p>
          <Button onClick={() => navigate('/exams')} className="w-full h-14 rounded-2xl">
            Back to Exams
          </Button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-secondary">{exam.title}</h1>
            <p className="text-gray-400 font-bold mt-1">
              Question {currentQuestionIndex + 1} of {exam.questions.length}
            </p>
          </div>
          <div className={`flex items-center gap-4 px-8 py-4 rounded-[2rem] border-2 transition-colors ${
            timeLeft < 300 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-white border-gray-100 text-secondary'
          }`}>
            <Timer size={24} />
            <span className="text-2xl font-black tabular-nums">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 mb-8"
        >
          <h2 className="text-2xl font-black text-secondary mb-8 leading-tight">
            {currentQuestion.text}
          </h2>

          {currentQuestion.type === 'multiple-choice' ? (
            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(currentQuestion.id, idx)}
                  className={`w-full flex items-center gap-6 p-6 rounded-2xl border-2 text-left transition-all ${
                    answers[currentQuestion.id] === idx
                      ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10'
                      : 'border-gray-50 hover:border-gray-200 text-gray-600'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 font-black ${
                    answers[currentQuestion.id] === idx ? 'border-primary bg-primary text-white' : 'border-gray-200'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg font-bold">{option}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-64 p-8 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-lg font-medium resize-none"
              />
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <AlertCircle size={14} />
                Be as descriptive as possible. This will be graded by an instructor.
              </p>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-6">
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-secondary transition-all ${
              currentQuestionIndex === 0 ? 'opacity-0' : 'hover:bg-white'
            }`}
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              className="h-16 px-12 rounded-[2rem] text-lg font-black flex items-center gap-3 bg-secondary hover:bg-black shadow-xl"
            >
              Submit Exam
              <Send size={20} />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="h-16 px-12 rounded-[2rem] text-lg font-black flex items-center gap-3"
            >
              Next Question
              <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSession;
