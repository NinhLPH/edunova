import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_EXAMS, MOCK_USERS } from '../../mock-data';
import { LogOut, Users, BookOpen, BarChart3, TrendingDown, Video, ClipboardMinus, Home } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TeacherDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const teacherExams = MOCK_EXAMS.filter(e => e.subject === user?.subject);
  const exam = teacherExams.length > 0 ? teacherExams[0] : MOCK_EXAMS[0];

  const scoreDistribution = [
    { name: '< 5', count: 2 },
    { name: '5-6', count: 4 },
    { name: '6-8', count: 15 },
    { name: '8-9', count: 12 },
    { name: '9-10', count: 7 }
  ];

  const topQuestionsMap = {
    'Toán': [
      { id: 'q_03', content: 'Chọn phát biểu đúng nhất về định lí Pythagore', wrongCount: 15 },
      { id: 'q_05', content: 'Tam giác ABC có AB=3cm, AC=4cm, BC=5cm. Tam giác gì?', wrongCount: 9 },
      { id: 'q_02', content: 'Tam giác nào sau đây là tam giác vuông...', wrongCount: 5 }
    ],
    'Văn': [
      { id: 'q_13', content: 'Văn bản Trong lòng mẹ thuộc thể loại gì?', wrongCount: 12 },
      { id: 'q_17', content: 'Biện pháp tu từ: “Tre xung phong vào xe tăng...” là gì?', wrongCount: 8 },
      { id: 'q_20', content: 'Bài thơ Nhớ rừng thể hiện tâm trạng gì?', wrongCount: 6 }
    ],
    'TA': [
      { id: 'q_21', content: 'Choose the word which is stresses differently...', wrongCount: 14 },
      { id: 'q_28', content: 'Luckily, there are many communication...', wrongCount: 10 },
      { id: 'q_30', content: 'They advised ______ a video conference...', wrongCount: 7 }
    ]
  };

  const topWrongQuestions = topQuestionsMap[user?.subject] || topQuestionsMap['Toán'];

  const hasExamData = ['Toán', 'Văn', 'TA'].includes(user?.subject);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div className="page-scroll-wrapper">
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

      <div className="content animate-fade-in" style={{ paddingBottom: '90px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Lớp 8B6</h3>
            <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Sĩ số: 40</p>
          </div>
          <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={28} color="var(--success)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user?.subject || 'Toán Học'}</h3>
            <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Môn phụ trách</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ClipboardMinus size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>Giao bài tập</h3>
          </div>
          <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={28} color="var(--success)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>Lớp học online</h3>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: activeTab === 'report' ? '2px solid var(--primary)' : 'none' }} onClick={() => setActiveTab(activeTab === 'report' ? null : 'report')}>
            <BarChart3 size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Báo cáo điểm</h3>
          </div>
          <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: activeTab === 'wrong' ? '2px solid var(--accent)' : 'none' }} onClick={() => setActiveTab(activeTab === 'wrong' ? null : 'wrong')}>
            <TrendingDown size={28} color="var(--accent)" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Câu sai nhiều</h3>
          </div>
        </div>

        {activeTab === 'report' && (
          <div className="card glass animate-fade-in">
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>Phổ điểm: {exam?.title || 'Tổng quan'}</h3>

            {hasExamData ? (
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
            ) : (
              <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                Không có dữ liệu bài kiểm tra.
              </div>
            )}
          </div>
        )}

        {activeTab === 'wrong' && (
          <div className="card glass animate-fade-in" style={{ borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309' }}>
              <TrendingDown size={20} /> Top 3 câu sai nhiều nhất
            </h3>

            {hasExamData ? (
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
            ) : (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                Không có dữ liệu bài làm.
              </div>
            )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ flexShrink: 0, height: '85px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 50, boxShadow: '0 -10px 20px rgba(0,0,0,0.03)' }}>
        <button style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#059669', cursor: 'pointer', height: '100%' }}>
          <Home size={24} />
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '4px' }}>Trang chủ</span>
        </button>
      </div>
    </div>
  );
}
