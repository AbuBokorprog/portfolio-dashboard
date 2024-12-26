import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ExperienceCard from '../../../component/ui/ExperienceCard';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAllExperiencesQuery } from '../../../redux/features/services/ExperienceApi';

const Experiences = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: experiences } = useAllExperiencesQuery();

  const filteredExperiences = experiences?.data?.filter(
    (exp) =>
      exp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Work Experience
        </h1>
        <Link to={'/dashboard/create-experience'}>
          <Button variant="contained" color="primary" startIcon={<FaPlus />}>
            Add New Experience
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <TextField
            type="text"
            placeholder="Search experiences..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Experience Cards */}
      <div className="grid gap-6">
        {filteredExperiences?.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>

      {/* Empty State */}
      {filteredExperiences?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No experiences found</p>
        </div>
      )}
    </div>
  );
};

export default Experiences;
