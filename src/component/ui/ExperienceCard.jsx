import moment from 'moment';
import { FaEdit, FaTrash, FaBriefcase } from 'react-icons/fa';
import { useDeleteExperienceMutation } from '../../redux/features/services/ExperienceApi';

const ExperienceCard = ({ experience }) => {
  const {
    position,
    company_name,
    startTime,
    short_description,
    type,
    _id,
    endTime,
    isPresent,
    company_location,
  } = experience;

  const [deleteExperience] = useDeleteExperienceMutation();
  const deleteExperienceHandler = async (id) => {
    try {
      const res = await deleteExperience(id).unwrap();
      if (res?.success) {
        alert(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FaBriefcase className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{position}</h3>
            <p className="text-blue-600 font-medium">{company_name}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">
                  {moment(startTime).format('MMMM YYYY')}
                </span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">
                  {isPresent ? 'Present' : moment(endTime).format('MMMM, YYYY')}
                </span>
              </div>
              <span className="text-sm text-gray-600">•</span>
              <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                {type}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{company_location}</p>
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
            onClick={() => deleteExperienceHandler(_id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600 text-sm line-clamp-3">
          {short_description}
        </p>
      </div>
    </div>
  );
};

export default ExperienceCard;
