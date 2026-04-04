import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_EXAMS } from '../../mock-data';
import { PlayCircle, Bot, BookOpen, Clock, Video, LogOut, Calculator, Zap, FlaskConical, Globe, PenTool, Leaf, Heart, Hourglass, Map, Home, FileText } from 'lucide-react';

export const iconMap = {
  'Toán': Calculator,
  'Lý': Zap,
  'Hóa': FlaskConical,
  'TA': Globe,
  'Văn': PenTool,
  'Sinh': Leaf,
  'GDCD': Heart,
  'Sử': Hourglass,
  'Địa': Map
};

export const colorMap = {
  'Toán': '#ef4444',
  'Lý': '#3b82f6',
  'Hóa': '#8b5cf6',
  'TA': '#0ea5e9',
  'Văn': '#ec4899',
  'Sinh': '#10b981',
  'GDCD': '#f43f5e',
  'Sử': '#f59e0b',
  'Địa': '#84cc16'
};

export default function StudentDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [bottomTab, setBottomTab] = useState('home');

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div className="page-scroll-wrapper">
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

      <div className="content animate-fade-in" style={{ paddingBottom: '120px' }}>
        {bottomTab === 'home' && (
          <div className="animate-fade-in">
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>Tất cả các môn học</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['Toán', 'Văn', 'TA', 'Lý', 'Hóa', 'Sinh', 'GDCD', 'Sử', 'Địa'].map(sub => {
                const IconComponent = iconMap[sub];
                const mainColor = colorMap[sub];
                return (
                  <button
                    key={sub}
                    onClick={() => navigate('/subject/' + encodeURIComponent(sub))}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      flex: '1 1 calc(33.333% - 6px)',
                      padding: '12px 0',
                      borderRadius: '16px',
                      border: `1px solid #e2e8f0`,
                      background: '#f8fafc',
                      color: '#475569',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s',
                      textAlign: 'center'
                    }}
                  >
                    <IconComponent size={24} color={mainColor} />
                    {sub === 'TA' ? 'Tiếng Anh' : sub}
                  </button>
                )
              })}
            </div>

            {/* Remind */}
            <div className="card" style={{ marginTop: '20px', background: 'rgba(255,255,255,0.6)' }}>
              <p className="text-secondary" style={{ fontSize: '0.9rem', textAlign: 'center' }}>
                Em đã hoàn thành 80% mục tiêu học Toán tuần này. Hãy tiếp tục phát huy! 🚀
              </p>
            </div>
          </div>
        )}

        {bottomTab === 'exams' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px' }}>
              Bài kiểm tra
            </h2>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['Toán', 'Văn', 'TA', 'Lý', 'Hóa', 'Sinh', 'GDCD', 'Sử', 'Địa'].map(sub => {
                const IconComponent = iconMap[sub];
                const mainColor = colorMap[sub];
                return (
                  <button
                    key={sub}
                    onClick={() => navigate('/subject-exams/' + encodeURIComponent(sub))}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      flex: '1 1 calc(33.333% - 6px)',
                      padding: '12px 0',
                      borderRadius: '16px',
                      border: `1px solid #e2e8f0`,
                      background: '#f8fafc',
                      color: '#475569',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s',
                      textAlign: 'center'
                    }}
                  >
                    <IconComponent size={24} color={mainColor} />
                    {sub === 'TA' ? 'Tiếng Anh' : sub}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
      </div>

      {/* FAB */}
      <button className="fab" onClick={() => navigate('/ai-tutor')} title="Hỏi Gia sư AI" style={{ bottom: '105px' }}>
        <Bot size={28} />
      </button>

      {/* Bottom Nav */}
      <div style={{ flexShrink: 0, height: '85px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 50, boxShadow: '0 -10px 20px rgba(0,0,0,0.03)' }}>
        <button onClick={() => setBottomTab('home')} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: bottomTab === 'home' ? 'var(--primary)' : '#94a3b8', cursor: 'pointer', transition: 'color 0.2s', height: '100%' }}>
          <Home size={24} />
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '4px' }}>Trang chủ</span>
        </button>
        <button onClick={() => setBottomTab('exams')} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: bottomTab === 'exams' ? 'var(--primary)' : '#94a3b8', cursor: 'pointer', transition: 'color 0.2s', height: '100%' }}>
          <FileText size={24} />
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '4px' }}>Bài kiểm tra</span>
        </button>
      </div>
    </div>
  );
}
