import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/home/HomePage';
import NotFound from '@/pages/NotFound';
import RegisterPage from '@/pages/authentication/RegisterPage';
import LoginPage from '@/pages/authentication/LoginPage';
import GuestRoute from '@/routes/GuestRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
