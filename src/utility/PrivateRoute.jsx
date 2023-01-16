import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  return currentUser !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
