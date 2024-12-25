import { useState } from 'react';
import BlogCard from '../../../component/ui/BlogCard';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAllBlogsQuery } from '../../../redux/features/services/BlogsApi';

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: blogs, isLoading } = useAllBlogsQuery();

  const filteredBlogs = blogs?.data?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">All Blogs</h1>
        <Link to={'/dashboard/create-blogs'}>
          <Button variant="contained" color="primary" startIcon={<FaPlus />}>
            Add New Blog
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found</p>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
