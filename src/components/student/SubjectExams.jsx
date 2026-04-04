import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_EXAMS } from '../../mock-data';
import { ChevronLeft, PlayCircle, Clock, AlertTriangle } from 'lucide-react';
import { iconMap, colorMap } from './StudentDashboard';

export default function SubjectExams() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const subName = decodeURIComponent(subjectId);
  const mainColor = colorMap[subName] || 'var(--primary)';
  const IconComponent = iconMap[subName] || PlayCircle;

  // Ideally, filter to get ALL exams for this subject
  // Right now MOCK_EXAMS only has 1 or 0 for each subject, but we will support multiple.
  const subjectExams = MOCK_EXAMS.filter(e => e.subject === subName);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', background: 'var(--bg-color)', overflow: 'hidden' }}>
      
      <div className="page-scroll-wrapper">
        {/* Dynamic Header */}
        <div className="header" style={{ 
          background: mainColor, 
          padding: '30px 24px', 
          borderBottomLeftRadius: '30px', 
          borderBottomRightRadius: '30px',
          color: 'white',
          boxShadow: `0 10px 30px ${mainColor}60`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background shape */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.2 }}>
            <IconComponent size={180} />
          </div>

          <div style={{ position: 'relative', zIndex: 10 }}>
            <button onClick={() => navigate('/student-dash')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0 8px 0 0', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <ChevronLeft size={28} />
              <span style={{ fontWeight: '500' }}>Trở về</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
                <IconComponent size={36} color="white" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Môn {subName === 'TA' ? 'Tiếng Anh' : subName}</h1>
                <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '4px' }}>Danh sách Bài kiểm tra</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content animate-fade-in" style={{ paddingBottom: '40px', marginTop: '20px' }}>
          
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--text-primary)' }}>Nhiệm vụ của em</h3>
          
          {subjectExams.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {subjectExams.map((exam, idx) => (
                <div key={idx} className="card glass" style={{ borderLeft: `6px solid ${mainColor}` }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: mainColor }}>
                    <PlayCircle size={20} />
                    Bài kiểm tra
                  </h3>
                  <p style={{ fontSize: '1rem', marginBottom: '6px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {exam.title}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    <Clock size={16} /> Thời gian làm bài: {exam.duration_minutes} phút
                  </p>
                  <button 
                    className="btn" 
                    onClick={() => navigate('/take-test', { state: { examId: exam.id } })}
                    style={{ background: mainColor, color: 'white', border: 'none', padding: '14px', borderRadius: '12px', width: '100%', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: `0 4px 12px ${mainColor}50` }}
                  >
                    Làm bài ngay
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="card glass" style={{ borderLeft: `6px solid ${mainColor}` }}>
              <div style={{ padding: '24px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '50%' }}>
                  <AlertTriangle size={36} color="#94a3b8" />
                </div>
                <p style={{ color: '#64748b', fontWeight: '500', fontSize: '0.95rem', marginTop: '8px' }}>
                  Tuyệt vời! Em đã hoàn thành mọi bài tập.
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  (Không có dữ liệu bài kiểm tra mới)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
