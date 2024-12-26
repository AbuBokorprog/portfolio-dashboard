import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaProjectDiagram,
  FaBlog,
  FaUserCircle,
  FaEnvelope,
  FaCertificate,
  FaTools,
  FaBriefcase,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { GiAchievement } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/Slice/AuthSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const menuItems = [
    { path: '/dashboard', icon: <FaHome />, title: 'Dashboard' },
    { path: '/dashboard/about', icon: <FaUserCircle />, title: 'About Me' },
    { path: '/dashboard/skills', icon: <GiAchievement />, title: 'Skills' },
    {
      path: '/dashboard/projects',
      icon: <FaProjectDiagram />,
      title: 'Projects',
    },
    {
      path: '/dashboard/education',
      icon: <FaGraduationCap />,
      title: 'Education',
    },
    {
      path: '/dashboard/experience',
      icon: <FaBriefcase />,
      title: 'Experience',
    },
    { path: '/dashboard/blogs', icon: <FaBlog />, title: 'Blogs' },
    {
      path: '/dashboard/certificates',
      icon: <FaCertificate />,
      title: 'Certificates',
    },
    { path: '/dashboard/messages', icon: <FaEnvelope />, title: 'Messages' },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    alert('Logout');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-gray-900 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transform fixed md:relative w-64 min-h-screen bg-white text-black transition-transform duration-200 ease-in-out z-50 md:translate-x-0`}
      >
        <div className="py-3.5 px-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-center">Portfolio Admin</h2>
        </div>

        <nav className="mt-6 h-[calc(100vh-180px)] overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)}
              className={`flex items-center px-6 py-3 hover:bg-gray-800 hover:text-white transition-colors duration-200
                ${
                  location.pathname === item.path
                    ? 'bg-gray-800 text-white border-l-4 border-blue-500'
                    : 'text-gray-900'
                }`}
            >
              <span className="text-xl mr-4">{item.icon}</span>
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Admin Profile Section */}
        <div className="absolute bottom-0 w-full p-4 bg-gray-900 text-white border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <img
              src="https://placeholder.com/40x40"
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Admin Name</p>
              <button
                onClick={logoutHandler}
                className="text-xs text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
