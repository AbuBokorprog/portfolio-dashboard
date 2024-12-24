import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import EducationCard from '../../../component/ui/EducationCard';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAllEducationsQuery } from '../../../redux/features/services/EducationApi';

const Education = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: educations } = useAllEducationsQuery();

  const filteredEducations = educations?.data?.filter(
    (edu) =>
      edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edu.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Education</h1>
        <Link to={'/dashboard/create-education'}>
          <Button variant="contained" color="primary" startIcon={<FaPlus />}>
            Add New Education
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

      {/* Education Cards */}
      <div className="grid gap-6">
        {filteredEducations?.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))}
      </div>

      {/* Empty State */}
      {filteredEducations?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No education records found</p>
        </div>
      )}
    </div>
  );
};

export default Education;
