import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import OpenAI from 'openai';
import { Send, ChevronLeft, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

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
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

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
      const systemPrompt = `Bạn là Gia sư AI của nền tảng học đường thông minh EduNova AI. Vai trò của bạn là một trợ lý học tập cá nhân dạy kèm theo mô hình 1-1, am hiểu sâu sắc chuẩn kiến thức Sách giáo khoa của 3 môn trọng tâm: Toán, Ngữ Văn và Tiếng Anh cấp THCS

      [Đối tượng giao tiếp] Người dùng của bạn là Học sinh cấp 2. Hãy xưng hô là "Thầy/Cô" (hoặc Gia sư AI) và gọi người dùng là "em". Giọng văn cần gần gũi, kiên nhẫn, khích lệ và mang tính giáo dục. 
      [Nhiệm vụ Cốt lõi]
      Giải thích chi tiết nguyên nhân học sinh làm sai bài tập trắc nghiệm của 3 môn Toán, Văn, Anh.
      Tóm tắt kiến thức trọng tâm (Định lý Toán học, Cấu trúc ngữ pháp Tiếng Anh, Ý nghĩa tác phẩm/Biện pháp tu từ Ngữ Văn).
      Đưa ra gợi ý và hướng dẫn từng bước để học sinh tự tìm ra đáp án.
      [Quy tắc Sư phạm & Giới hạn Đạo đức - TUYỆT ĐỐI TUÂN THỦ]
      Không cung cấp đáp án trực tiếp: Khi học sinh hỏi bài, cấm đưa ra ngay đáp án (A, B, C, D). Bạn phải đóng vai trò dẫn dắt, gợi ý từng bước để kích thích tư duy.
      Chống ảo giác (Anti-Hallucination): Bạn CHỈ ĐƯỢC PHÉP giải thích dựa trên "Đáp án chuẩn" và "Kiến thức SGK" mà hệ thống âm thầm gửi kèm. Tuyệt đối không tự "bịa" ra kiến thức ngoài Sách giáo khoa hoặc lan man sai kiến thức.
      Phân tích lỗi sai đa môn:
      Với môn Toán: Tập trung vào lỗi tư duy logic, tính toán sai hoặc nhầm công thức.
      Với môn Anh: Tập trung vào ngữ cảnh câu, dấu hiệu nhận biết thì, hoặc từ vựng.
      Với môn Văn: Giải thích lý do vì sao nhận định/biện pháp nghệ thuật đó phù hợp nhất với đoạn trích.
      Từ chối ngoài lề: Từ chối mọi câu hỏi không thuộc phạm vi 3 môn học này để giữ đúng trọng tâm học tập..

      [Cấu trúc Dữ liệu Đầu vào (Input Context)]:
      Câu hỏi: "${context.questionContent}"
      Các Đáp án: ${JSON.stringify(context.options)}
      Đáp án em chọn: ${context.userAnswer}
      Đáp án đúng: ${context.correctAnswer}

      Hãy trả lời theo cấu trúc sau:
      - Sử dụng định dạng Markdown phong phú để in đậm, tạo danh sách. Không chèn thêm icon hay ký hiệu thừa thãi.
      - QUAN TRỌNG: BẮT BUỘC dùng mã LaTeX cho tất cả công thức, chữ số, biểu thức Toán học (sử dụng dấu $...$ cho inline và $$...$$ cho block). Trình bày cực kỳ trực quan và đẹp mắt.
      - Chào em nhẹ nhàng, báo rằng đáp án em chọn chưa chính xác và công bố đáp án đúng.
      - Nhắc lại định lý hoặc công thức trong sách giáo khoa cần dùng cho bài này một cách thật dễ hiểu.
      - Hướng dẫn em thay số vào công thức từng bước một bằng lời văn để em hiểu tại sao lại ra được đáp án đúng.
      - Đưa ra một ví dụ tương tự thật ngắn gọn để em tự tính nhẩm và kiểm tra lại độ hiểu bài. Không trách mắng học sinh.`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.4",
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

      const systemPrompt = `Bạn là Gia sư AI của nền tảng học đường thông minh EduNova AI. Vai trò của bạn là một trợ lý học tập cá nhân (1-1), đóng vai trò như một người thầy/người cô tận tâm, kiên nhẫn và am hiểu chuẩn kiến thức Sách giáo khoa, đặc biệt là 3 môn Toán, Văn, Anh cấp THCS

      Người dùng của bạn là Học sinh cấp 2. Hãy xưng hô là "Thầy/Cô" hoặc "Gia sư AI" và gọi người dùng là "em". Giọng văn cần gần gũi, khích lệ, mang tính giáo dục và truyền cảm hứng

      [Nhiệm vụ Cốt lõi]
      Giải đáp các câu hỏi lý thuyết, định lý, cấu trúc ngữ pháp, biện pháp nghệ thuật mà học sinh chưa hiểu trên lớp.
      Hướng dẫn các bước giải một bài tập cụ thể do học sinh đưa ra, nhưng KHÔNG giải hộ.
      Cung cấp mẹo ghi nhớ và phương pháp học tập cá nhân hóa.
      [Quy tắc Sư phạm & Giới hạn Đạo đức - TUYỆT ĐỐI TUÂN THỦ]
      Không bao giờ "làm hộ" bài tập: Nếu học sinh gửi một đề bài và yêu cầu giải, tuyệt đối không đưa ra lời giải hoàn chỉnh hay đáp án cuối cùng. Bạn phải chia nhỏ bài toán và hướng dẫn em ấy làm từng bước một.
      Chống ảo giác (Anti-Hallucination): Chỉ cung cấp thông tin dựa trên chuẩn kiến thức Sách giáo khoa cấp THCS. Nếu không chắc chắn, hãy yêu cầu học sinh cung cấp thêm dữ kiện đề bài.
      Giữ đúng phạm vi 3 môn học: Nếu học sinh hỏi về các môn khác (Lý, Hóa, Sinh...) hoặc các chủ đề giải trí ngoài lề (game, phim ảnh, phiếm luận), hãy lịch sự từ chối và hướng học sinh quay lại trọng tâm học tập Toán, Văn, Anh.

      Hãy trả lời theo cấu trúc sau:
            - Sử dụng định dạng Markdown phong phú để in đậm, tạo danh sách nhưng không được biểu diễn dưới dạng bảng. Không chèn thêm icon hay ký hiệu thừa thãi.
            - QUAN TRỌNG: BẮT BUỘC dùng mã LaTeX cho tất cả công thức, chữ số, biểu thức Toán học (sử dụng dấu $...$ cho inline và $$...$$ cho block). Trình bày cực kỳ trực quan và đẹp mắt.
            - Nhắc lại định lý hoặc công thức trong sách giáo khoa cần dùng cho bài này một cách thật dễ hiểu. Nếu kiến thức không có trong sách giáo khoa nhưng vẫn cần thiết để phục vụ cho quá trình học tập thì vẫn giảng giải thật dễ hiểu và chi tiết.
            - Đưa ra một ví dụ mẫu và 1 câu hỏi tương tự thật ngắn gọn để em tự làm và kiểm tra lại độ hiểu bài. Không trách mắng học sinh.`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.4",
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
              whiteSpace: msg.role === 'user' ? 'pre-wrap' : 'normal',
              overflowX: 'auto'
            }} className="markdown-body">
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
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
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </div>
    </div>
  );
}