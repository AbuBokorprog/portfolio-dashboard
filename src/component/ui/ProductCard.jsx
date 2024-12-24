import sanitizeHtml from 'sanitize-html';
import { FaEdit, FaTrash } from 'react-icons/fa';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDeleteProjectMutation } from '../../redux/features/services/ProjectsApi';

const ProductCard = ({ p }) => {
  const [deleteSkill] = useDeleteProjectMutation();

  const deleteSkillHandler = async (id) => {
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
          const res = await deleteSkill(id).unwrap();
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
    <div
      key={p?._id}
      className="portfolio-item mb-6 border border-gray-200  bg-white  text-black  p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
    >
      {/* Thumbnail Image */}
      <img
        src={p?.thumbnail}
        alt={p?.projects_name}
        width={500}
        height={500}
        className="w-full h-64 object-cover mb-4 rounded-lg shadow-md"
      />

      {/* Project Title */}
      <h3 className="text-2xl font-semibold uppercase mb-3 tracking-wide">
        {p?.projects_name}
      </h3>

      {/* Short Description */}
      <div className="hidden lg:block mb-4">
        <div
          className="text-sm text-gray-800 "
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(p?.short_description, {
              allowedTags: ['p'],
              allowedAttributes: {},
            }),
          }}
        />
      </div>

      {/* Technologies Used */}
      <div className="my-4">
        <h3 className="text-lg font-semibold mb-2">Technologies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-2 text-center">
          {p?.skills?.map((i) => (
            <div
              key={i}
              className="py-1 px-2 bg-gray-100 rounded-full text-sm font-medium"
            >
              {i}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {moment(p?.createdAt).format('MMM Do YY')}
        </span>

        <div className="flex items-center space-x-3">
          <button
            className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteSkillHandler(p?._id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
