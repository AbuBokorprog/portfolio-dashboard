import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ExperienceCard from '../../../component/ui/ExperienceCard';
import { Button, TextField } from '@mui/material';

const Experiences = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const experiences = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      duration: 'Jan 2023 - Present',
      type: 'Full-time',
      location: 'San Francisco, CA (Remote)',
      description:
        'Leading the frontend development team in building scalable web applications using React, Next.js, and TypeScript. Implementing responsive designs and optimizing application performance.',
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Digital Innovations Ltd',
      duration: 'Jun 2021 - Dec 2022',
      type: 'Full-time',
      location: 'New York, NY',
      description:
        'Developed and maintained full-stack web applications using MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    },
    {
      id: 3,
      position: 'Web Developer Intern',
      company: 'StartUp Hub',
      duration: 'Jan 2021 - May 2021',
      type: 'Internship',
      location: 'Boston, MA',
      description:
        'Assisted in developing web applications, learned modern development practices, and contributed to various client projects.',
    },
  ];

  const filteredExperiences = experiences.filter(
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
        <Button variant="contained" color="primary" startIcon={<FaPlus />}>
          Add New Experience
        </Button>
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
        {filteredExperiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      {/* Empty State */}
      {filteredExperiences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No experiences found</p>
        </div>
      )}
    </div>
  );
};

export default Experiences;
