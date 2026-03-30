import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;