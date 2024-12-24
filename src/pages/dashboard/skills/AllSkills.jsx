import { useState } from 'react';
import { useAllSkillsQuery } from '../../../redux/features/services/SkillsApi';
import { Box, Button, TextField, Typography } from '@mui/material';
import SkillCard from '../../../component/ui/SkillCard';
import { FaPlus, FaSearch } from 'react-icons/fa';
import CreateSkillModal from '../../../component/ui/CreateSkillModal';

const AllSkills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: allSkills, isLoading } = useAllSkillsQuery();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const filteredData = allSkills?.data?.filter((skill) =>
    skill?.technology_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4" component={'h4'}>
          All Skills ({allSkills?.data?.length})
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={handleClickOpen}
        >
          Add New Skill
        </Button>
      </Box>
      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm my-7">
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
      <div className="px-2 lg:px-4 py-8 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
        {filteredData?.map((skill) => (
          <SkillCard skill={skill} key={skill?._id} />
        ))}
      </div>

      <CreateSkillModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default AllSkills;
