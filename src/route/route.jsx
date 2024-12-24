import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/main';
import Dashboard from '../layout/Dashboard';
import DashboardHome from '../pages/dashboard/home';
import Login from '../pages/auth/Login';
import PrivateRoute from '../private/PrivateRoute';
import AllSkills from '../pages/dashboard/skills/AllSkills';
import AllProjects from '../pages/dashboard/projects/AllProjects';
import AllBlogs from '../pages/dashboard/blogs/AllBlogs';
import Experiences from '../pages/dashboard/expeerience/Experiences';
import About from '../pages/dashboard/about/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
  },

  {
    path: '/dashboard',
    element: (
      // <PrivateRoute>
      <Dashboard />
      // </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'skills',
        element: <AllSkills />,
      },
      {
        path: 'projects',
        element: <AllProjects />,
      },
      {
        path: 'experience',
        element: <Experiences />,
      },
      {
        path: 'blogs',
        element: <AllBlogs />,
      },
      {
        path: 'certificates',
        element: <div>Certificates Section</div>,
      },
      {
        path: 'messages',
        element: <div>Messages Section</div>,
      },
    ],
  },
]);

export default router;
