import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_EXAMS } from '../../mock-data';
import { Clock, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function QuizTaker() {
  const { user, setCurrentQuiz, setQuizResult } = useAuth();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const currentExam = MOCK_EXAMS[0];
    setExam(currentExam);
    setCurrentQuiz(currentExam);
    setTimeLeft(currentExam.duration_minutes * 60);
  }, [setCurrentQuiz]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelectOption = (questionId, optionKey) => {
    setAnswers({ ...answers, [questionId]: optionKey });
  };

  const handleSubmit = () => {
    if (!exam) return;

    let correctCount = 0;
    const details = exam.questions.map(q => {
      const isCorrect = answers[q.id] === q.correct_answer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        questionContent: q.content,
        options: q.options,
        userAnswer: answers[q.id] || null,
        correctAnswer: q.correct_answer,
        isCorrect,
        concept: q.concept
      };
    });

    const score = (correctCount / exam.questions.length) * 10;

    setQuizResult({
      examId: exam.id,
      examTitle: exam.title,
      score: score.toFixed(1),
      correctCount,
      totalCount: exam.questions.length,
      details,
      timestamp: new Date().toISOString()
    });

    navigate('/test-result');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!exam) return <div className="content">Loading...</div>;

  return (
    <div style={{ paddingBottom: '80px', height: '100%' }}>
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/student-dash')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0 8px 0 0' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Kiểm tra 15p</h2>
          <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>{exam.subject}</p>
        </div>
        <div style={{ background: 'white', color: 'var(--danger)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={16} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="content animate-fade-in" style={{ marginTop: '10px' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-primary)' }}>
          {exam.title}
        </h1>
        <p className="text-secondary mb-4" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertTriangle size={16} /> Hãy đọc kỹ câu hỏi trước khi chọn đáp án
        </p>

        {exam.questions.map((q, index) => (
          <div key={q.id} className="card glass" style={{ marginBottom: '24px' }}>
            <p style={{ fontWeight: '600', marginBottom: '16px', fontSize: '1.05rem', lineHeight: '1.5' }}>
              <span style={{ color: 'var(--primary)' }}>Câu {index + 1}:</span> {q.content}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(q.options).map(([key, val]) => (
                <label
                  key={key}
                  className={`quiz-option ${answers[q.id] === key ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === key}
                    onChange={() => handleSelectOption(q.id, key)}
                  />
                  <span><strong>{key}.</strong> {val}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button className="btn btn-primary" onClick={handleSubmit} style={{ marginTop: '10px', padding: '16px', fontSize: '1.1rem' }}>
          <CheckCircle2 size={24} /> Nộp bài ngay
        </button>
      </div>
    </div>
  );
}
