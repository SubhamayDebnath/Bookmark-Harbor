import Navbar from '@/components/dashboard/Navbar';
import { Outlet } from 'react-router';

function DashboardLayout() {
  return (
    <>
      <Navbar />
      <main className="flex w-full max-w-4xl flex-1 flex-col px-5">
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
