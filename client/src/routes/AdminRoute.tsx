import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
