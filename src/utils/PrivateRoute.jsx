import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 bg-amber-500/5 blur-xl rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
