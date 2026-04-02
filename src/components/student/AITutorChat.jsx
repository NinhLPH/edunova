import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import OpenAI from 'openai';
import { Send, ChevronLeft, Bot, User, Loader2 } from 'lucide-react';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function AITutorChat() {
  const { wrongQuestionContext, setWrongQuestionContext, user } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (wrongQuestionContext) {
      const initialMessage = {
        role: 'assistant',
        content: `Chào em ${user?.name}, em đã làm sai câu hỏi sau:\n**${wrongQuestionContext.questionContent}**\nEm đã chọn: ${wrongQuestionContext.userAnswer ? wrongQuestionContext.options[wrongQuestionContext.userAnswer] : 'Không chọn'}.\n\nThầy/Cô AI sẽ phân tích tại sao em sai và hướng dẫn cách làm đúng. Em đợi một chút nhé...`
      };

      setMessages([initialMessage]);
      handleExplainWrongAnswer(wrongQuestionContext);
    } else {
      setMessages([
        {
          role: 'assistant',
          content: `Chào ${user?.name}! Em cần Thầy/Cô AI hỗ trợ giải thích bài tập, tóm tắt kiến thức hay tìm phương pháp học môn Toán lớp 8 hôm nay nào?`
        }
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleExplainWrongAnswer(context) {
    setIsLoading(true);
    try {
      const systemPrompt = `Bạn là một gia sư AI nhiệt tình và thân thiện của nền tảng EduNova. Học sinh vừa làm sai câu hỏi trắc nghiệm sau: 
      Câu hỏi: "${context.questionContent}"
      Các Đáp án: ${JSON.stringify(context.options)}
      Đáp án em chọn: ${context.userAnswer}
      Đáp án đúng: ${context.correctAnswer}

      Hãy đóng vai trò gia sư, gọi học sinh là "em" và xưng "Thầy" (hoặc "Cô"). 

      QUY TẮC TRÌNH BÀY BẮT BUỘC (RẤT QUAN TRỌNG):
      1. TUYỆT ĐỐI KHÔNG dùng định dạng Markdown (Không dùng dấu # để làm tiêu đề, không dùng dấu sao ** để in đậm).
      2. TUYỆT ĐỐI KHÔNG dùng mã LaTeX hay các kí tự toán học phức tạp như \\[, \\], \\(, \\), \\sqrt. 
      3. Chỉ sử dụng văn bản thuần túy, trình bày thoáng bằng cách xuống dòng. 
      4. Với các phép toán, hãy diễn đạt bằng lời văn dễ hiểu hoặc kí hiệu cơ bản trên bàn phím. Ví dụ: viết "bình phương", "mũ 2" thay vì dùng dấu ^; viết "căn bậc hai" thay vì dùng kí hiệu căn.

      Hãy trả lời theo cấu trúc sau:
      - Bước 1 (Động viên): Chào em nhẹ nhàng, báo rằng đáp án em chọn chưa chính xác và công bố đáp án đúng.
      - Bước 2 (Gợi ý kiến thức): Nhắc lại định lý hoặc công thức trong sách giáo khoa cần dùng cho bài này một cách thật dễ hiểu.
      - Bước 3 (Giải thích chi tiết): Hướng dẫn em thay số vào công thức từng bước một bằng lời văn để em hiểu tại sao lại ra được đáp án đúng.
      - Bước 4 (Luyện tập): Đưa ra một ví dụ tương tự thật ngắn gọn để em tự tính nhẩm và kiểm tra lại độ hiểu bài. Không trách mắng học sinh.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt }]
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Xin lỗi, hiện tại hệ thống AI đang bảo trì hoặc mất kết nối mạng. Em thử lại sau nhé." }]);
      console.error("OpenAI Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSendMessage = async () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal.trim();
    setInputVal('');

    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      //history for AI
      const chatHistory = newMessages.map(m => ({ role: m.role, content: m.content }));

      const systemPrompt = `Bạn là gia sư AI EduNova, chuyên môn Toán, Văn, Anh cấp THCS. Hãy trả lời ngắn gọn, tạo động lực cho học sinh, xưng Hô Thầy-Em hoặc Cô-Em.

      QUY TẮC TRÌNH BÀY BẮT BUỘC (RẤT QUAN TRỌNG):
      1. TUYỆT ĐỐI KHÔNG dùng định dạng Markdown (Không dùng dấu # để làm tiêu đề, không dùng dấu sao ** để in đậm).
      2. TUYỆT ĐỐI KHÔNG dùng mã LaTeX hay các kí tự toán học phức tạp ví dụ như \\[, \\], \\(, \\), \\sqrt. 
      3. Chỉ sử dụng văn bản thuần túy, trình bày thoáng bằng cách xuống dòng. 
      4. Với các phép toán, hãy diễn đạt bằng lời văn dễ hiểu hoặc kí hiệu cơ bản trên bàn phím. Ví dụ: viết "bình phương", "mũ 2" thay vì dùng dấu ^; viết "căn bậc hai" thay vì dùng kí hiệu căn.

      Hãy trả lời theo cấu trúc sau:
      - Nhắc lại định lý hoặc công thức trong sách giáo khoa cần dùng cho bài này một cách thật dễ hiểu. Nếu kiến thức không có trong sách giáo khoa nhưng vẫn cần thiết để phục vụ cho quá trình học tập thì vẫn giảng giải thật dễ hiểu và chi tiết.
      - Đưa ra một ví dụ mẫu và 1 câu hỏi tương tự thật ngắn gọn để em tự làm và kiểm tra lại độ hiểu bài. Không trách mắng học sinh.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory
        ]
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Hệ thống AI đang gặp sự cố quá tải, mong em thông cảm chờ vài giây rồi thử lại nhé." }]);
      console.error("OpenAI Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setWrongQuestionContext(null);
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100%' }}>
      <div className="header" style={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', padding: '20px' }}>
        <button onClick={handleBack} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', marginRight: '16px' }}>
          <ChevronLeft size={28} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: 'white' }}>Gia Sư AI 1-1</h2>
          <p style={{ fontSize: '0.8rem', opacity: 0.9, margin: 0, color: 'white' }}>Luôn sẵn sàng hỗ trợ bạn</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 16px', overflowY: 'auto', background: '#f4f7f6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            gap: '8px'
          }}>
            {msg.role === 'assistant' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '18px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <Bot size={20} color="#8b5cf6" />
              </div>
            )}

            <div style={{
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: '20px',
              borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '20px',
              borderTopRightRadius: msg.role === 'user' ? '4px' : '20px',
              background: msg.role === 'user' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'white',
              color: msg.role === 'user' ? 'white' : '#333',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '18px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="#64748b" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '18px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} color="#8b5cf6" />
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '20px', background: 'white', display: 'flex', alignItems: 'center' }}>
              <Loader2 className="animate-spin" size={20} color="#8b5cf6" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '12px' }}>
        <input
          type="text"
          style={{ margin: 0, padding: '12px 20px', borderRadius: '24px', flex: 1, border: '1px solid #ccc', outline: 'none' }}
          placeholder="Nhập câu hỏi của em..."
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button
          style={{ width: '48px', height: '48px', borderRadius: '24px', padding: 0, background: '#8b5cf6', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}