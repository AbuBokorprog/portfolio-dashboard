import { FaEdit, FaTrash, FaGraduationCap } from 'react-icons/fa';

const EducationCard = ({ education }) => {
  const { degree, institution, duration, grade, field, location } = education;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <FaGraduationCap className="text-purple-600 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{degree}</h3>
            <p className="text-purple-600 font-medium">{institution}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm text-gray-600">{duration}</span>
              {grade && (
                <>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
                    Grade: {grade}
                  </span>
                </>
              )}
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

      {field && (
        <div className="mt-4">
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Field of Study:</span> {field}
          </p>
        </div>
      )}
    </div>
  );
};

export default EducationCard;
