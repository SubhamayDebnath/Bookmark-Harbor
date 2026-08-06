import { Outlet } from 'react-router';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="flex w-full max-w-4xl flex-1 flex-col px-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
