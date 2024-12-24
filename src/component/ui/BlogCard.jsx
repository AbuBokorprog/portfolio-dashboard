import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  const { title, description, image, category, date } = blog;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <span className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
          {category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{date}</span>

          <div className="flex items-center space-x-3">
            <button
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
              title="View"
            >
              <FaEye />
            </button>
            <button
              className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
