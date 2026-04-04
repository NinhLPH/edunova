import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_USERS, MOCK_EXAMS } from '../../mock-data';
import { LogOut, User as IconUser, AlertCircle, TrendingUp, CheckCircle2, ChevronDown, PieChart as PieChartIcon, Home } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as PieTooltip, Legend } from 'recharts';

export default function ParentDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const childrenList = user?.student_ids?.map(id => MOCK_USERS.find(u => u.id === id)) || [];
  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [activeTab, setActiveTab] = useState(null);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const exam = MOCK_EXAMS[0];

  const correctCount = 8;
  const totalCount = 10;
  const incorrectCount = totalCount - correctCount;

  const pieData = [
    { name: 'Đúng', value: correctCount, color: 'var(--success)' },
    { name: 'Sai', value: incorrectCount, color: 'var(--danger)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
        <div>
          <h1 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Sổ Liên Lạc Điện Tử
          </h1>
          <p style={{ fontSize: '0.85rem' }}>Xin chào phụ huynh, {user?.name}</p>
        </div>
        <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
          <LogOut size={24} />
        </button>
      </div>

      <div className="content animate-fade-in" style={{ paddingBottom: '90px' }}>
        {childrenList.length > 0 && (
          <div className="input-group" style={{ position: 'relative' }}>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconUser size={16} /> Chọn học sinh
            </label>
            <div style={{ position: 'relative' }}>
              <select
                className="input-field"
                style={{ appearance: 'none', paddingRight: '40px', fontWeight: 'bold' }}
                value={selectedChild?.id}
                onChange={e => setSelectedChild(childrenList.find(c => c.id === e.target.value))}
              >
                {childrenList.map(c => (
                  <option key={c.id} value={c.id}>{c.name} - Lớp {c.class}</option>
                ))}
              </select>
              <ChevronDown size={20} style={{ position: 'absolute', right: '12px', top: '14px', color: '#64748b', pointerEvents: 'none' }} />
            </div>
          </div>
        )}

        {selectedChild && (
          <>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
              <TrendingUp size={24} color="var(--primary)" /> Kết quả học tập gần đây
            </h2>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: activeTab === 'report' ? '2px solid var(--primary)' : 'none' }} onClick={() => setActiveTab(activeTab === 'report' ? null : 'report')}>
                <PieChartIcon size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Báo cáo học tập</h3>
              </div>
              <div className="card glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: activeTab === 'attendance' ? '2px solid var(--success)' : 'none' }} onClick={() => setActiveTab(activeTab === 'attendance' ? null : 'attendance')}>
                <CheckCircle2 size={28} color="var(--success)" style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Điểm danh</h3>
              </div>
            </div>

            {activeTab === 'report' && (
              <div className="card glass animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '4px' }}>{exam.title}</h3>
                    <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Môn: {exam.subject}</p>
                  </div>
                  <div style={{ background: 'var(--success)', color: 'white', padding: '6px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    8.0 đ
                  </div>
                </div>

                {/* Chart */}
                <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        stroke="none"
                        animationDuration={800}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <PieTooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontWeight: 'bold' }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -70%)', textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>80%</span><br />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Hoàn thành</span>
                  </div>
                </div>

                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px', marginTop: '16px', display: 'flex', gap: '10px' }}>
                  <AlertCircle size={24} color="var(--danger)" style={{ flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: '600', color: '#991b1b', fontSize: '0.9rem', marginBottom: '4px' }}>Lỗ hổng kiến thức phát hiện:</p>
                    <p style={{ fontSize: '0.8rem', color: '#b91c1c' }}>Con làm sai 2 câu ở chủ đề <b>Hình học (Định lý Pitago đảo)</b>. Hệ thống đã giao thêm bài luyện tập cải thiện.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="card glass animate-fade-in" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderLeft: '4px solid var(--success)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '8px', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} /> Điểm danh (Tự động)
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#14532d' }}>Con đã tham gia đầy đủ lớp học trực tuyến tuần này (Thời gian trung bình: 42 phút/buổi).</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'sticky', bottom: 0, marginTop: 'auto', left: 0, right: 0, height: '85px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', zIndex: 50, boxShadow: '0 -10px 20px rgba(0,0,0,0.03)' }}>
        <button style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#be185d', cursor: 'pointer', height: '100%' }}>
          <Home size={24} />
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '4px' }}>Trang chủ</span>
        </button>
      </div>
    </div>
  );
}
