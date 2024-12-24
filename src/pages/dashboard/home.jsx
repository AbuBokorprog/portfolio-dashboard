// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaProjectDiagram, FaBlog, FaUsers, FaEye } from 'react-icons/fa';
import StatsCard from '../../component/ui/StatsCard';
import ActivityItem from '../../component/ui/ActivityItem';

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value="12"
          icon={<FaProjectDiagram />}
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Blogs"
          value="24"
          icon={<FaBlog />}
          color="bg-green-500"
        />
        <StatsCard
          title="Total Users"
          value="1.2k"
          icon={<FaUsers />}
          color="bg-purple-500"
        />
        <StatsCard
          title="Total Views"
          value="50k"
          icon={<FaEye />}
          color="bg-yellow-500"
        />
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
