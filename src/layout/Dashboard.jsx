import { Outlet } from 'react-router-dom';
import Sidebar from '../component/navbar-footer/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 md:ml-0 ml-16">
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome to Portfolio Dashboard
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-2 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
