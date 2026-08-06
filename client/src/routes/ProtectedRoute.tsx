import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/store/auth.store';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function ProtectedRoute() {
  const { user, loading } = useAuthStore();
  if (loading) {
    return <LoadingScreen />;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
