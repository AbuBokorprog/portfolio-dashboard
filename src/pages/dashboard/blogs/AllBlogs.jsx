import { useState } from 'react';
import BlogCard from '../../../component/ui/BlogCard';
import { FaPlus, FaSearch } from 'react-icons/fa';

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data - replace with your actual data
  const blogs = [
    {
      id: 1,
      title: 'Getting Started with React',
      description:
        'Learn the basics of React and how to create your first React application. This comprehensive guide will walk you through the essential concepts.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      category: 'React',
      date: '2024-03-15',
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      description:
        'Explore advanced TypeScript patterns and best practices for large-scale applications. Learn about generics, utility types, and more.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
      category: 'TypeScript',
      date: '2024-03-10',
    },
    // Add more blog posts as needed
  ];

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">All Blogs</h1>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <FaPlus />
          Add New Blog
        </button>
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
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found</p>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
