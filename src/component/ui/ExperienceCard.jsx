import { FaEdit, FaTrash, FaBriefcase } from 'react-icons/fa';

const ExperienceCard = ({ experience }) => {
  const { position, company, duration, description, type, location } =
    experience;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FaBriefcase className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{position}</h3>
            <p className="text-blue-600 font-medium">{company}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm text-gray-600">{duration}</span>
              <span className="text-sm text-gray-600">•</span>
              <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                {type}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{location}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
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

      <div className="mt-4">
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
