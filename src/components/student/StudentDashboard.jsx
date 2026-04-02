import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_EXAMS } from '../../mock-data';
import { PlayCircle, Bot, BookOpen, Clock, Video, LogOut } from 'lucide-react';

export default function StudentDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState('Toán');
  const upcomingTest = MOCK_EXAMS.find(e => e.subject === selectedSubject) || MOCK_EXAMS[0];

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <div className="header" style={{ borderBottomRightRadius: '24px', borderBottomLeftRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen />
            Dashboard Học Sinh
          </h1>
          <p>Hôm nay là một ngày tuyệt vời để học tập!</p>
        </div>
        <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Đăng xuất">
          <LogOut size={20} />
        </button>
      </div>

      <div className="content animate-fade-in" style={{ paddingBottom: '100px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Xin chào, <span style={{ color: 'var(--primary)' }}>{user?.name}</span>!
        </h2>

        {/* Online class */}
        <div className="card glass" style={{ borderLeft: '4px solid var(--success)', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#166534' }}>
            <Video size={20} />
            Lớp học trực tuyến sắp tới
          </h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', marginBottom: '16px', color: '#14532d' }}>
            <Clock size={16} />Toán lớp 8 - Hình học (14:00 Hôm nay)
          </p>
          <button className="btn" style={{ background: 'var(--success)', color: 'white', borderRadius: '12px', padding: '12px', border: 'none' }} onClick={() => alert('Chức năng tham gia Google Meet sẽ ra mắt trong MVP tiếp theo!')}>
            Tham gia (Google Meet)
          </button>
        </div>

        {/* Subject Toggles */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', marginTop: '24px' }}>
          {['Toán', 'Văn', 'TA'].map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                background: selectedSubject === sub ? 'var(--primary)' : '#e2e8f0',
                color: selectedSubject === sub ? 'white' : '#475569',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                flex: 1
              }}
            >
              Môn {sub === 'TA' ? 'Tiếng Anh' : sub}
            </button>
          ))}
        </div>

        {/* Exam */}
        <div className="card glass" style={{ borderLeft: '4px solid var(--primary)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
            <PlayCircle size={20} />
            Bài kiểm tra cần làm
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '4px', fontWeight: '500' }}>
            {upcomingTest?.title}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            <Clock size={14} /> Thời gian: {upcomingTest?.duration_minutes} phút
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/take-test', { state: { examId: upcomingTest?.id } })}>
            Làm bài ngay
          </button>
        </div>

        {/* Remind */}
        <div className="card" style={{ marginTop: '20px', background: 'rgba(255,255,255,0.6)' }}>
          <p className="text-secondary" style={{ fontSize: '0.9rem', textAlign: 'center' }}>
            Em đã hoàn thành 80% mục tiêu học Toán tuần này. Hãy tiếp tục phát huy! 🚀
          </p>
        </div>
      </div>

      {/* FAB */}
      <button className="fab" onClick={() => navigate('/ai-tutor')} title="Hỏi Gia sư AI">
        <Bot size={28} />
      </button>
    </div>
  );
}
