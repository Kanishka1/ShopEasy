import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { token, role: userRole } = useAuth(); // ✅ FIX

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch (admin protection)
  if (role && userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;