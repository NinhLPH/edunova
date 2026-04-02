import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { CheckCircle, XCircle, ChevronLeft, Bot } from 'lucide-react';

export default function QuizResult() {
  const { quizResult, setWrongQuestionContext } = useAuth();
  const navigate = useNavigate();

  if (!quizResult) return <Navigate to="/student-dash" />;

  const { score, correctCount, totalCount, details, examTitle } = quizResult;
  const isPass = parseFloat(score) >= 5.0;

  const handleAskAI = (question) => {
    setWrongQuestionContext(question);
    navigate('/ai-tutor');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '40px' }}>
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <button onClick={() => navigate('/student-dash')} style={{ position: 'absolute', left: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
          <ChevronLeft size={28} />
        </button>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Kết Quả Bài Làm</h2>
      </div>

      <div className="content animate-fade-in" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{examTitle}</h3>

        <div style={{ background: isPass ? 'var(--success)' : 'var(--danger)', width: '120px', height: '120px', borderRadius: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>{score}</h1>
        </div>

        <p style={{ marginTop: '16px', fontSize: '1.1rem', fontWeight: '500' }}>
          Tuyệt vời! Bạn đã làm đúng {correctCount}/{totalCount} câu.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '24px 0' }} />

        <h4 style={{ textAlign: 'left', fontSize: '1.2rem', marginBottom: '16px', fontWeight: 'bold' }}>Chi tiết câu sai cần khắc phục:</h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {details.filter(d => !d.isCorrect).map((q, index) => (
            <div key={q.questionId} className="card glass" style={{ textAlign: 'left', borderLeft: '4px solid var(--danger)' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>Câu hỏi: {q.questionContent}</p>
              <p className="text-red" style={{ fontSize: '0.9rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <XCircle size={16} /> Bạn chọn: {q.userAnswer ? `${q.userAnswer}. ${q.options[q.userAnswer]}` : 'Chưa chọn'}
              </p>

              <div className="ai-bubble" onClick={() => handleAskAI(q)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#856404', fontWeight: '600' }}>
                  <Bot size={20} />
                  Bạn cần Gia sư AI trợ giúp giải thích câu này chứ?
                </div>
                <p style={{ fontSize: '0.85rem', marginTop: '4px', opacity: 0.8 }}>Nhấn vào đây để xem lời giải chi tiết 1-1 ngay nhé!</p>
              </div>
            </div>
          ))}

          {details.filter(d => !d.isCorrect).length === 0 && (
            <div className="card glass" style={{ textAlign: 'center', color: 'var(--success)', fontWeight: 'bold', padding: '30px' }}>
              <CheckCircle size={48} style={{ margin: '0 auto 10px' }} />
              <p>Chúc mừng! Bạn đã trả lời đúng tất cả các câu hỏi.</p>
            </div>
          )}
        </div>

        <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => navigate('/student-dash')}>
          Quay lại màn hình chính
        </button>
      </div>
    </div>
  );
}
