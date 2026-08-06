import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/home/HomePage';
import NotFound from '@/pages/NotFound';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
