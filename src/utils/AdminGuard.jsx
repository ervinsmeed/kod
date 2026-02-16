import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminGuard = ({ children }) => {
  const { user, loading } = useAuth(); // Добавляем loading из контекста
  const location = useLocation();

  // Пока проверяем авторизацию — показываем пустоту или стильный лоадер
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Если не админ — отправляем на главную
  if (!user || user.role !== 'admin') {
    console.warn("Access denied: User is not an admin");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};