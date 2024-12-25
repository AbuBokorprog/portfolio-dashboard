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
import Education from '../pages/dashboard/educations/Education';
import CreateProject from '../pages/dashboard/projects/CreateProject';
import CreateExperience from '../pages/dashboard/expeerience/CreateExperience';
import CreateEducation from '../pages/dashboard/educations/CreateEducation';
import CreateBlog from '../pages/dashboard/blogs/CreateBlog';
import EditBlog from '../pages/dashboard/blogs/EditBlog';
import EditExperience from '../pages/dashboard/expeerience/EditExperience';
import EditEducation from '../pages/dashboard/educations/EditEducation';

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
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
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
        path: 'create-project',
        element: <CreateProject />,
      },
      {
        path: 'education',
        element: <Education />,
      },
      {
        path: 'create-education',
        element: <CreateEducation />,
      },
      {
        path: 'edit-education/:id',
        element: <EditEducation />,
      },
      {
        path: 'experience',
        element: <Experiences />,
      },
      {
        path: 'create-experience',
        element: <CreateExperience />,
      },
      {
        path: 'edit-experience/:id',
        element: <EditExperience />,
      },
      {
        path: 'blogs',
        element: <AllBlogs />,
      },
      {
        path: 'create-blogs',
        element: <CreateBlog />,
      },
      {
        path: 'edit-blogs/:id',
        element: <EditBlog />,
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
