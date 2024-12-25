import moment from 'moment';
import { FaEdit, FaTrash, FaGraduationCap } from 'react-icons/fa';
import { useDeleteEducationMutation } from '../../redux/features/services/EducationApi';
import { Link } from 'react-router-dom';

const EducationCard = ({ education }) => {
  const {
    degree,
    institute_name,
    startTime,
    endTime,
    grade,
    _id,
    field,
    institute_location,
    isPresent,
    short_description,
  } = education;

  const [deleteEducation] = useDeleteEducationMutation();
  const deleteEducationHandler = async (id) => {
    try {
      const res = await deleteEducation(id).unwrap();
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
          <div className="p-3 bg-purple-100 rounded-lg">
            <FaGraduationCap className="text-purple-600 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{degree}</h3>
            <p className="text-purple-600 font-medium">{institute_name}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">
                  {moment(startTime).format('MMMM YYYY')}
                </span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">
                  {isPresent ? 'Present' : moment(endTime).format('MMMM, YYYY')}
                </span>
              </div>
              {grade && (
                <>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
                    Grade: {grade}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">{institute_location}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link to={`/dashboard/edit-education/${_id}`}>
            <button
              className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
              title="Edit"
            >
              <FaEdit className="size-6" />
            </button>
          </Link>
          <button
            onClick={() => deleteEducationHandler(_id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Delete"
          >
            <FaTrash className="size-6" />
          </button>
        </div>
      </div>

      {field && (
        <div className="mt-4">
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Field of Study:</span> {field}
          </p>
        </div>
      )}
      <p className="text-sm text-gray-500 mt-2">{short_description}</p>
    </div>
  );
};

export default EducationCard;
