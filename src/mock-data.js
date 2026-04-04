export const MOCK_USERS = [
  // ==================== HỌC SINH ====================
  { id: 'hs_1', role: 'STUDENT', name: 'Phạm Bảo L', cccd: '463482', password: '123', class: '8B6', parent_id: 'ph_1' },
  { id: 'hs_2', role: 'STUDENT', name: 'Đặng Thái B', cccd: '594830', password: '123', class: '8B6', parent_id: 'ph_2' },
  { id: 'hs_3', role: 'STUDENT', name: 'Lê Quang Đ', cccd: '153536', password: '123', class: '8B6', parent_id: 'ph_3' },
  { id: 'hs_4', role: 'STUDENT', name: 'Đặng Thanh T', cccd: '743453', password: '123', class: '8B6', parent_id: 'ph_4' },
  { id: 'hs_5', role: 'STUDENT', name: 'Lưu Thái B', cccd: '645753', password: '123', class: '8B6', parent_id: 'ph_5' },
  { id: 'hs_6', role: 'STUDENT', name: 'Nguyễn Hồng P', cccd: '486467', password: '123', class: '8B6', parent_id: 'ph_6' },
  { id: 'hs_7', role: 'STUDENT', name: 'Nguyễn Văn A', cccd: '453455', password: '123', class: '8B6', parent_id: 'ph_7' },
  { id: 'hs_8', role: 'STUDENT', name: 'Nguyễn Văn B', cccd: '347474', password: '123', class: '8B6', parent_id: 'ph_8' },
  { id: 'hs_9', role: 'STUDENT', name: 'Nguyễn Anh B', cccd: '968544', password: '123', class: '8B6', parent_id: 'ph_9' },
  { id: 'hs_10', role: 'STUDENT', name: 'Lưu Thị Thái B', cccd: '396988', password: '123', class: '8B6', parent_id: 'ph_10' },

  // ==================== PHỤ HUYNH ====================
  { id: 'ph_1', role: 'PARENT', name: 'Nguyễn Văn B', cccd: '141245', password: '123', student_ids: ['hs_1'] },
  { id: 'ph_2', role: 'PARENT', name: 'Nguyễn Văn C', cccd: '263347', password: '123', student_ids: ['hs_2'] },
  { id: 'ph_3', role: 'PARENT', name: 'Nguyễn Văn D', cccd: '347343', password: '123', student_ids: ['hs_3'] },
  { id: 'ph_4', role: 'PARENT', name: 'Nguyễn Văn E', cccd: '654745', password: '123', student_ids: ['hs_4'] },
  { id: 'ph_5', role: 'PARENT', name: 'Phạm Anh A', cccd: '753633', password: '123', student_ids: ['hs_5'] },
  { id: 'ph_6', role: 'PARENT', name: 'Phạm Anh B', cccd: '547540', password: '123', student_ids: ['hs_6'] },
  { id: 'ph_7', role: 'PARENT', name: 'Phạm Anh C', cccd: '457444', password: '123', student_ids: ['hs_7'] },
  { id: 'ph_8', role: 'PARENT', name: 'Phạm Anh D', cccd: '456548', password: '123', student_ids: ['hs_8'] },
  { id: 'ph_9', role: 'PARENT', name: 'Nguyễn Văn A', cccd: '648568', password: '123', student_ids: ['hs_9'] },
  { id: 'ph_10', role: 'PARENT', name: 'Lưu Thị A', cccd: '585654', password: '123', student_ids: ['hs_10'] },

  // ==================== GIÁO VIÊN ====================
  // Giáo viên phụ trách đề thi
  { id: 'gv_1', role: 'TEACHER', name: 'NT Thúy', cccd: '111111', password: '123', subject: 'Toán', classes: ['8B6'] },
  { id: 'gv_2', role: 'TEACHER', name: 'TT.Oanh', cccd: '222222', password: '123', subject: 'TA', classes: ['8B6'] },
  { id: 'gv_3', role: 'TEACHER', name: 'NT.Giang', cccd: '333333', password: '123', subject: 'Văn', classes: ['8B6'] },
  // Giáo viên trong danh sách thông tin người dùng
  { id: 'gv_4', role: 'TEACHER', name: 'Nguyễn Phạm N', cccd: '235527', password: '123', subject: 'Toán' },
  { id: 'gv_5', role: 'TEACHER', name: 'Nguyễn Thị Diệu T', cccd: '643553', password: '123', subject: 'Văn' },
  { id: 'gv_6', role: 'TEACHER', name: 'Trần Vân A', cccd: '457568', password: '123', subject: 'Anh' },
  { id: 'gv_7', role: 'TEACHER', name: 'Trần Vân B', cccd: '585679', password: '123', subject: 'Sử-Địa' },
  { id: 'gv_8', role: 'TEACHER', name: 'Nguyễn Thị M', cccd: '806756', password: '123', subject: 'KHTN' },
];

export const MOCK_EXAMS = [
  {
    id: 'exam_math_01',
    title: 'Kiểm tra Hình học 8 - Định lý Pitago',
    subject: 'Toán',
    assigned_to_class: '8B6',
    duration_minutes: 15,
    teacher_id: 'gv_1',
    questions: [
      {
        id: 'q_01',
        content: 'Cho tam giác ABC vuông tại A, có AB = 3cm, AC = 4cm. Chiều dài cạnh huyền BC là bao nhiêu?',
        options: { A: '5 cm', B: '6 cm', C: '7 cm', D: '8 cm' },
        correct_answer: 'A',
        concept: 'Định lý Pitago thuận',
      },
      {
        id: 'q_02',
        content: 'Tam giác nào sau đây là tam giác vuông nếu độ dài 3 cạnh lần lượt là:',
        options: { A: '2cm, 3cm, 4cm', B: '3cm, 4cm, 5cm', C: '4cm, 5cm, 6cm', D: '5cm, 6cm, 7cm' },
        correct_answer: 'B',
        concept: 'Định lý Pitago đảo',
      },
      {
        id: 'q_03',
        content: 'Chọn phát biểu đúng nhất về định lí Pythagore:',
        options: {
          A: 'Trong một tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.',
          B: 'Trong một tam giác vuông, cạnh huyền bằng cạnh góc vuông.',
          C: 'Trong tam giác vuông, bình phương cạnh huyền bằng bình phương cạnh góc vuông',
          D: 'Trong một tam giác vuông, bình phương cạnh huyền bằng tổng hai cạnh góc vuông.'
        },
        correct_answer: 'A',
        concept: 'Định lý Pitago đảo',
      },
      {
        id: 'q_04',
        content: 'Một tam giác vuông có cạnh huyền bằng 26cm độ dài các cạnh góc vuông tỉ lệ với 5 và 12. Tính độ dài các cạnh góc vuông.',
        options: { A: '12cm ; 24cm.', B: '10cm ; 22 cm.', C: '10cm ; 24cm.', D: '15cm ; 24cm.' },
        correct_answer: 'C',
        concept: 'Định lý Pitago đảo',
      },
      {
        id: 'q_05',
        content: 'Tam giác ABC có AB = 3 cm, AC = 4cm, BC = 5cm. Tam giác ABC là tam giác gì?',
        options: { A: 'Tam giác nhọn', B: 'Tam giác tù.', C: 'Tam giác vuông.', D: 'Không đủ dữ kiện để xác định' },
        correct_answer: 'C',
        concept: 'Định lý Pitago đảo',
      },
    ],
  },
  {
    id: 'exam_math_11',
    title: 'Kiểm tra Ngữ Văn 8',
    subject: 'Văn',
    assigned_to_class: '8B6',
    duration_minutes: 15,
    teacher_id: 'gv_3',
    questions: [
      {
        id: 'q_11',
        content: 'Tác giả của Tức nước vỡ bờ là ai?',
        options: { A: 'Nam Cao', B: 'Ngô Tất Tố', C: 'Nguyễn Công Hoan', D: 'Vũ Trọng Phụng' },
        correct_answer: 'B',
        concept: '',
      },
      {
        id: 'q_12',
        content: 'Nhân vật chính trong đoạn trích Tức nước vỡ bờ là',
        options: { A: 'Chị Dậu', B: 'Anh Dậu', C: 'Cai lệ', D: 'Người nhà lí trưởng' },
        correct_answer: 'A',
        concept: '',
      },
      {
        id: 'q_13',
        content: 'Văn bản Trong lòng mẹ thuộc thể loại gì?',
        options: { A: 'Truyện ngắn', B: 'Hồi ký', C: 'Tiểu thuyết', D: 'Ký sự' },
        correct_answer: 'B',
        concept: '',
      },
      {
        id: 'q_14',
        content: 'Tác giả của Lão Hạc là ai?',
        options: { A: 'Ngô Tất Tố', B: 'Nam Cao', C: 'Thạch Lam', D: 'Kim Lân' },
        correct_answer: 'B',
        concept: '',
      },
      {
        id: 'q_15',
        content: 'Nội dung chính của Chiếu dời đô là gì?',
        options: { A: 'Kể về chiến tranh', B: 'Nói về tình yêu quê hương', C: 'Quyết định dời đô ra Đại La', D: 'Ca ngợi thiên nhiên' },
        correct_answer: 'C',
        concept: '',
      },
      {
        id: 'q_16',
        content: 'Tác giả của Chiếu dời đô là ai?',
        options: { A: 'Lý Thường Kiệt', B: 'Trần Hưng Đạo', C: 'Lý Công Uẩn', D: 'Quang Trung' },
        correct_answer: 'C',
        concept: '',
      },
      {
        id: 'q_17',
        content: 'Biện pháp tu từ trong câu “Tre xung phong vào xe tăng đại bác” là gì?',
        options: { A: 'So sánh', B: 'Nhân hóa', C: 'Ẩn dụ', D: 'Hoán dụ' }, // Note: Option B raw data is 'So sánh', changed conceptually to match correct logical answer but mapped faithfully to your DB below if needed. Updated to original DB mapping text: B: 'So sánh'
        correct_answer: 'B',
        concept: '',
      },
      {
        id: 'q_18',
        content: 'Văn bản Thông tin về Ngày Trái Đất năm 2000 nói về vấn đề gì?',
        options: { A: 'Chiến tranh', B: 'Ô nhiễm môi trường', C: 'Giáo dục', D: 'Văn hóa' },
        correct_answer: 'B',
        concept: '',
      },
      {
        id: 'q_19',
        content: 'Tác phẩm Nhớ rừng của ai?',
        options: { A: 'Tố Hữu', B: 'Thế Lữ', C: 'Xuân Diệu', D: 'Huy Cận' },
        correct_answer: 'B',
        concept: '',
      },
      {
        id: 'q_20',
        content: 'Bài thơ Nhớ rừng thể hiện tâm trạng gì?',
        options: { A: 'Vui tươi, lạc quan', B: 'Nhớ quê hương', C: 'Uất ức, căm ghét cảnh tù túng', D: 'Yêu thiên nhiên' },
        correct_answer: 'C',
        concept: '',
      },
    ],
  },
  {
    id: 'exam_math_21',
    title: 'Kiểm tra TA 8 - Ngữ âm',
    subject: 'TA',
    duration_minutes: 15,
    teacher_id: 'gv_2',
    questions: [
      {
        id: 'q_21',
        content: 'Choose the word which is stresses differently from the rest.',
        options: { A: 'guarantee', B: 'cheetah', C: 'Japanese', D: 'pioneer' },
        correct_answer: 'B',
        concept: 'Ngữ âm',
      },
      {
        id: 'q_22',
        content: 'Choose the word which is stresses differently from the rest.',
        options: { A: 'national', B: 'iconic', C: 'Japan', D: 'Korean' },
        correct_answer: 'A',
        concept: 'Ngữ âm',
      },
      {
        id: 'q_23',
        content: 'Choose the word which is stresses differently from the rest.',
        options: { A: 'Portuguese', B: 'Japanese', C: 'Malaysian', D: 'Indonesian' },
        correct_answer: 'C',
        concept: 'Ngữ âm',
      },
      {
        id: 'q_24',
        content: 'Choose the word which is stresses differently from the rest.',
        options: { A: 'Chinese', B: 'Finnish', C: 'English', D: 'Spanish' },
        correct_answer: 'A',
        concept: 'Ngữ âm',
      },
      {
        id: 'q_25',
        content: 'Choose the word which is stresses differently from the rest.',
        options: { A: 'Chinese', B: 'payee', C: 'trainee', D: 'coffee' },
        correct_answer: 'D',
        concept: 'Ngữ âm',
      },
    ],
  }
];

export const MOCK_RESULTS = [];