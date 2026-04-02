import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_EXAMS, MOCK_USERS } from '../../mock-data';
import { LogOut, Users, BookOpen, BarChart3, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TeacherDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const exam = MOCK_EXAMS[0];

  const scoreDistribution = [
    { name: '< 5', count: 2 },
    { name: '5-6', count: 4 },
    { name: '6-8', count: 15 },
    { name: '8-9', count: 12 },
    { name: '9-10', count: 7 }
  ];

  const topWrongQuestions = [
    { id: 'q_03', content: 'Chọn phát biểu đúng nhất về định lí Pythagore', wrongCount: 15 },
    { id: 'q_05', content: 'Tam giác ABC có AB=3cm, AC=4cm, BC=5cm. Tam giác gì?', wrongCount: 9 },
    { id: 'q_02', content: 'Tam giác nào sau đây là tam giác vuông...', wrongCount: 5 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '40px' }}>
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
        <div>
          <h1 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen /> Dashboard Giáo Viên
          </h1>
          <p style={{ fontSize: '0.85rem' }}>Xin chào, thầy/cô {user?.name}</p>
        </div>
        <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
          <LogOut size={24} />
        </button>
      </div>

      <div className="content animate-fade-in">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Lớp 8B6</h3>
            <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Sĩ số: 40</p>
          </div>
          <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={28} color="var(--success)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Toán Học</h3>
            <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Môn phụ trách</p>
          </div>
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 /> Báo cáo: {exam.title}
        </h2>

        <div className="card glass">
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>Phổ điểm của lớp</h3>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card glass" style={{ borderLeft: '4px solid var(--accent)', marginTop: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309' }}>
            <TrendingDown size={20} /> Top 3 câu sai nhiều nhất
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topWrongQuestions.map((q, idx) => (
              <div key={idx} style={{ padding: '12px', background: 'white', borderRadius: '12px', border: '1px solid #fde68a' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px' }}>{idx + 1}. {q.content}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>{q.wrongCount} học sinh sai</span>
                  <span style={{ padding: '4px 8px', background: '#fef3c7', color: '#b45309', borderRadius: '12px', fontWeight: '600' }}>Cần ôn tập gấp</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
