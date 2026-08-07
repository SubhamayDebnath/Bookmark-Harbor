import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import HomePage from '@/pages/home/HomePage';
import NotFound from '@/pages/NotFound';
import RegisterPage from '@/pages/authentication/RegisterPage';
import LoginPage from '@/pages/authentication/LoginPage';
import GuestRoute from '@/routes/GuestRoute';
import ProtectedRoute from '@/routes/ProtectedRoute';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import AccountPage from '@/pages/dashboard/AccountPage';
import ForgotPassword from '@/pages/authentication/ForgotPassword';
import ResetPassword from '@/pages/authentication/ResetPassword';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
