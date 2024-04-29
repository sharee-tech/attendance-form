import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const { role } = useAuth();
  const location = useLocation();

  return role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AdminRoute;
