import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import EducationCard from '../../../component/ui/EducationCard';
import { Button, TextField } from '@mui/material';

const Education = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data - replace with your actual data
  const educations = [
    {
      id: 1,
      degree: "Master's in Computer Science",
      institution: 'Stanford University',
      duration: '2020 - 2022',
      grade: '3.8 GPA',
      field: 'Artificial Intelligence and Machine Learning',
      location: 'Stanford, CA',
    },
    {
      id: 2,
      degree: "Bachelor's in Computer Science",
      institution: 'MIT',
      duration: '2016 - 2020',
      grade: '3.9 GPA',
      field: 'Software Engineering',
      location: 'Cambridge, MA',
    },
    {
      id: 3,
      degree: 'High School Diploma',
      institution: 'Tech High School',
      duration: '2012 - 2016',
      grade: '4.0 GPA',
      field: 'Science and Mathematics',
      location: 'Boston, MA',
    },
  ];

  const filteredEducations = educations.filter(
    (edu) =>
      edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edu.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Education</h1>
        <Button variant="contained" color="primary" startIcon={<FaPlus />}>
          Add New Education
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search education..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Education Cards */}
      <div className="grid gap-6">
        {filteredEducations.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))}
      </div>

      {/* Empty State */}
      {filteredEducations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No education records found</p>
        </div>
      )}
    </div>
  );
};

export default Education;
