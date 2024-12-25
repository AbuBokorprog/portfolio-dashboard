import {
  FaProjectDiagram,
  FaBlog,
  FaUsers,
  FaEye,
  FaCertificate,
} from 'react-icons/fa';
import StatsCard from '../../component/ui/StatsCard';
import ActivityItem from '../../component/ui/ActivityItem';
import { useDashboardReportsQuery } from '../../redux/features/services/ReportsApi';
import { GiAchievement } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const { data } = useDashboardReportsQuery();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link to={'/dashboard/projects'}>
          <StatsCard
            title="Total Projects"
            value={data?.data?.totalProjects || 0}
            icon={<FaProjectDiagram />}
            color="bg-blue-500"
          />
        </Link>
        <Link to={'/dashboard/blogs'}>
          <StatsCard
            title="Total Blogs"
            value={data?.data?.totalBlogs || 0}
            icon={<FaBlog />}
            color="bg-green-500"
          />
        </Link>
        <Link to={'/dashboard/skills'}>
          <StatsCard
            title="Total Skills"
            value={data?.data?.totalSkills || 0}
            icon={<FaCertificate />}
            color="bg-cyan-500"
          />
        </Link>
        <Link to={'/dashboard/experience'}>
          <StatsCard
            title="Total Experiences"
            value={data?.data?.totalExperience || 0}
            icon={<FaUsers />}
            color="bg-purple-500"
          />
        </Link>
        <Link to={'/dashboard/education'}>
          <StatsCard
            title="Total Education"
            value={data?.data?.totalEducation || 0}
            icon={<FaEye />}
            color="bg-yellow-500"
          />
        </Link>
        <Link to={'/dashboard/certificates'}>
          <StatsCard
            title="Total Certificate"
            value={data?.data?.totalCertificate || 0}
            icon={<GiAchievement />}
            color="bg-red-500"
          />
        </Link>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            <ActivityItem
              title="New Project Added"
              description="E-commerce Website"
              time="2 hours ago"
            />
            <ActivityItem
              title="Blog Post Published"
              description="Getting Started with React"
              time="5 hours ago"
            />
            <ActivityItem
              title="New User Registered"
              description="John Doe"
              time="1 day ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
