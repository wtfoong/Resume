import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isRestoring, restoreSession } = useAuthContext();

  useEffect(() => {
    restoreSession();
  }, []); // only runs once when hitting a protected route

  if (isRestoring) return null;

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;