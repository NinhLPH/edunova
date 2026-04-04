import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Home, FileText } from 'lucide-react';

export default function Toolbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  // Render the toolbar depending on the role
  // For STUDENT, there are two tabs which toggle between DASHBOARD and EXAMS views
  // Since we don't have separate routes yet, we manage this by injecting the role.
  // Actually, we can use location hash or query param, or just pass it differently.
  
  // Wait, if we use a global Toolbar, how does it communicate with StudentDashboard's bottomTab state?
  // We can just rely on navigation.
  
  return null; // Will refine below...
}
