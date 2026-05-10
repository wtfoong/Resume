import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ResumePage from './pages/ResumePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LoginPage from './components/admin/LoginPage';
import Dashboard from './components/admin/Dashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<ResumePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;