import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '../mock-data';
import { useAuth } from '../App';
import { BookOpen, User, Lock, ArrowRight, Shield, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = MOCK_USERS.find(u => u.cccd === userId && u.password === password);

    if (user) {
      setUser(user);
      if (user.role === 'STUDENT') navigate('/student-dash');
      if (user.role === 'TEACHER') navigate('/teacher-dash');
      if (user.role === 'PARENT') navigate('/parent-dash');
    } else {
      setError('Tài khoản hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div style={{ padding: '0px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="header" style={{ padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ margin: '0 auto', background: 'rgba(255,255,255,0.2)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <BookOpen color="white" size={32} />
        </div>
        <h1 style={{ fontSize: '2rem' }}>EduNova AI</h1>
        <p style={{ opacity: 0.8, marginTop: '8px' }}>Nền tảng học đường thông minh tích hợp AI</p>
      </div>

      <div className="content animate-fade-in" style={{ marginTop: '-20px', position: 'relative', zIndex: 11, background: 'var(--bg-color)', borderRadius: '24px 24px 0 0' }}>
        <div className="card glass">
          <h2 className="card-title text-center" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Đăng nhập hệ thống</h2>
          <p className="text-center text-secondary mb-4"></p>

          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} /> Số CCCD
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Nhập CCCD"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} /> Mật khẩu
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red text-center mb-4" style={{ fontSize: '0.9rem' }}>{error}</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary" onClick={handleLogin}>
              Đăng nhập <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
