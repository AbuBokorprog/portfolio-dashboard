import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useDeleteBlogMutation } from '../../redux/features/services/BlogsApi';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, description, thumbnail, category, createdAt } = blog;

  const [deleteBlog] = useDeleteBlogMutation();

  const deleteBlogHandler = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteBlog(id).unwrap();
          if (res?.delete) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <span className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
          {category[0]}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {description.slice(0, 100)}...
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {moment(createdAt).format('MM DD YYYY')}
          </span>

          <div className="flex items-center space-x-3">
            <Link to={`/dashboard/edit-blogs/${blog?._id}`}>
              <button
                className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                title="Edit"
              >
                <FaEdit />
              </button>
            </Link>
            <button
              onClick={() => deleteBlogHandler(blog?._id)}
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
