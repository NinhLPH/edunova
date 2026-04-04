import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Login from './components/Login';
import StudentDashboard from './components/student/StudentDashboard';
import QuizTaker from './components/student/QuizTaker';
import QuizResult from './components/student/QuizResult';
import AITutorChat from './components/student/AITutorChat';
import SubjectDetail from './components/student/SubjectDetail';
import SubjectExams from './components/student/SubjectExams';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ParentDashboard from './components/parent/ParentDashboard';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [wrongQuestionContext, setWrongQuestionContext] = useState(null);

  return (
    <AuthContext.Provider value={{
      user, setUser,
      currentQuiz, setCurrentQuiz,
      quizResult, setQuizResult,
      wrongQuestionContext, setWrongQuestionContext
    }}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />

            {/* Student Routes */}
            <Route path="/student-dash" element={user?.role === 'STUDENT' ? <StudentDashboard /> : <Navigate to="/login" />} />
            <Route path="/subject/:subjectId" element={user?.role === 'STUDENT' ? <SubjectDetail /> : <Navigate to="/login" />} />
            <Route path="/subject-exams/:subjectId" element={user?.role === 'STUDENT' ? <SubjectExams /> : <Navigate to="/login" />} />
            <Route path="/take-test" element={user?.role === 'STUDENT' ? <QuizTaker /> : <Navigate to="/login" />} />
            <Route path="/test-result" element={user?.role === 'STUDENT' ? <QuizResult /> : <Navigate to="/login" />} />
            <Route path="/ai-tutor" element={user?.role === 'STUDENT' ? <AITutorChat /> : <Navigate to="/login" />} />

            {/* Teacher Routes */}
            <Route path="/teacher-dash" element={user?.role === 'TEACHER' ? <TeacherDashboard /> : <Navigate to="/login" />} />

            {/* Parent Routes */}
            <Route path="/parent-dash" element={user?.role === 'PARENT' ? <ParentDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
