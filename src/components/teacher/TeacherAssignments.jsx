import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { MOCK_EXAMS } from '../../mock-data';
import { ChevronLeft, Upload, Download, CheckCircle, ClipboardList, Clock, Users } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function TeacherAssignments() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [previewExam, setPreviewExam] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const fileInputRef = useRef(null);

  const assignedClass = user?.classes?.[0] || '8B6'; // Default if none

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const formattedQuestions = data.map((row, idx) => ({
        id: `q_new_${Date.now()}_${idx}`,
        content: row["Câu hỏi"],
        options: {
          A: String(row["Đáp án A"] || ""),
          B: String(row["Đáp án B"] || ""),
          C: String(row["Đáp án C"] || ""),
          D: String(row["Đáp án D"] || "")
        },
        correct_answer: row["Đáp án đúng"],
        concept: row["Chủ đề"] || "Tổng hợp",
        explanation: row["Giải thích"] || ""
      }));

      setPreviewExam({
        title: file.name.replace('.xlsx', ''),
        questions: formattedQuestions
      });
    };
    reader.readAsBinaryString(file);
    e.target.value = null;
  };

  const confirmImport = () => {
    const newExam = {
      id: `exam_${Date.now()}`,
      title: `[Mới] ${previewExam.title}`,
      subject: user?.subject,
      assigned_to_class: assignedClass,
      duration_minutes: 15,
      teacher_id: user?.id,
      questions: previewExam.questions
    };

    MOCK_EXAMS.push(newExam);
    setToastMsg(`Đã giao bài thành công cho lớp ${assignedClass}!`);
    setTimeout(() => setToastMsg(''), 3000);
    setPreviewExam(null);
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        "Câu hỏi": "Bậc của đa thức x^2y^5 - x^2y^4 + y^6 + 1 là?",
        "Đáp án A": "4",
        "Đáp án B": "5",
        "Đáp án C": "6",
        "Đáp án D": "7",
        "Đáp án đúng": "D",
        "Chủ đề": "Đa Thức",
        "Giải thích": "Bậc cao nhất là 2+5 = 7"
      },
      {
        "Câu hỏi": "Thủ đô của Việt Nam là?",
        "Đáp án A": "Hồ Chí Minh",
        "Đáp án B": "Hà Nội",
        "Đáp án C": "Đà Nẵng",
        "Đáp án D": "Huế",
        "Đáp án đúng": "B",
        "Chủ đề": "Tổng hợp",
        "Giải thích": "Thủ đô của Việt Nam là thủ đô Hà Nội từ năm 1945."
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "De_Thi_Mau");
    XLSX.writeFile(wb, "Form_Mau_Edunova.xlsx");
  };

  const teacherExams = MOCK_EXAMS.filter(e => e.teacher_id === user?.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>

      <div className="page-scroll-wrapper">
        <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #10b981, #059669)', padding: '24px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
          <div>
            <button onClick={() => navigate('/teacher-dash')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <ChevronLeft size={24} /> <span style={{ fontWeight: '500' }}>Trở về</span>
            </button>
            <h1 style={{ fontSize: '1.4rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList /> Quản lý Giao Bài Tập
            </h1>
          </div>
        </div>

        <div className="content animate-fade-in" style={{ padding: '20px', paddingBottom: '90px' }}>

          <div className="card glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '2px dashed var(--primary)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginBottom: '12px' }} onClick={() => fileInputRef.current.click()}>
              <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '50%', marginBottom: '12px' }}>
                <Upload size={32} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>+ Tạo Bài Mới (Import Excel)</h3>
            </div>
            <button onClick={downloadTemplate} style={{ background: 'white', border: '1px solid var(--primary)', borderRadius: '12px', padding: '8px 16px', fontSize: '0.85rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)' }}>
              <Download size={16} /> Tải Form Mẫu
            </button>
            <input type="file" accept=".xlsx, .xls" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px', color: '#334155' }}>Các bài tập đã giao ({teacherExams.length})</h3>

          {teacherExams.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {teacherExams.map((exam, idx) => (
                <div 
                  key={idx} 
                  className="card" 
                  style={{ padding: '16px', background: 'white', borderRadius: '16px', borderLeft: '4px solid var(--primary)', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => setPreviewExam({ ...exam, isExisting: true })}
                >
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '8px' }}>{exam.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={16} /> {exam.duration_minutes} phút</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ClipboardList size={16} /> {exam.questions.length} câu hỏi</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}><Users size={14} /> {exam.assigned_to_class}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '20px 0', textAlign: 'center', color: '#64748b' }}>Chưa có bài tập nào.</div>
          )}

        </div>
      </div>

      {previewExam && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', width: '90%', maxWidth: '480px', maxHeight: '80vh', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--primary)' }}>{previewExam.isExisting ? 'Chi tiết Bài tập' : 'Xác nhận Bài Mới'}</h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>Hệ thống nhận diện được <b>{previewExam.questions.length} câu hỏi</b> từ file {previewExam.title}.</p>

            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {previewExam.questions.map((q, idx) => (
                <div key={idx} style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '8px' }}>Câu {idx + 1}: {q.content}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.85rem' }}>
                    <div style={{ background: q.correct_answer === 'A' ? '#ecfdf5' : 'transparent', padding: '4px 8px', borderRadius: '6px' }}><b>A.</b> {q.options.A}</div>
                    <div style={{ background: q.correct_answer === 'B' ? '#ecfdf5' : 'transparent', padding: '4px 8px', borderRadius: '6px' }}><b>B.</b> {q.options.B}</div>
                    <div style={{ background: q.correct_answer === 'C' ? '#ecfdf5' : 'transparent', padding: '4px 8px', borderRadius: '6px' }}><b>C.</b> {q.options.C}</div>
                    <div style={{ background: q.correct_answer === 'D' ? '#ecfdf5' : 'transparent', padding: '4px 8px', borderRadius: '6px' }}><b>D.</b> {q.options.D}</div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 'bold', marginTop: '8px' }}>Đáp án: {q.correct_answer}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {previewExam.isExisting ? (
                <button onClick={() => setPreviewExam(null)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>Đóng</button>
              ) : (
                <>
                  <button onClick={() => setPreviewExam(null)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', color: '#64748b', fontWeight: 'bold', cursor: 'pointer' }}>Hủy bỏ</button>
                  <button onClick={confirmImport} style={{ flex: 2, padding: '12px', borderRadius: '12px', border: 'none', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
                    <CheckCircle size={18} /> Giao bài cho {assignedClass}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="animate-fade-in" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)', fontWeight: 'bold', zIndex: 200, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={20} /> {toastMsg}
        </div>
      )}
    </div>
  );
}
