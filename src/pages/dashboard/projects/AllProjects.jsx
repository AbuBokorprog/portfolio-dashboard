import { useState } from 'react';
import {
  useAllProjectsCategoryQuery,
  useAllProjectsQuery,
} from '../../../redux/features/services/ProjectsApi';
import ProductCard from '../../../component/ui/ProductCard';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FaPlus, FaSearch } from 'react-icons/fa';

const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const { data: allCategories } = useAllProjectsCategoryQuery();
  const { data: allProducts, isLoading } = useAllProjectsQuery();

  const filteredData = allProducts?.data?.filter((product) => {
    const searchProject = product?.projects_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatched =
      category === 'all' || product?.categoryId?.category_name === category;

    return searchProject && categoryMatched;
  });

  // handle category
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const categoryOptions = allCategories?.data?.map((category) => ({
    label: category.category_name,
    value: category?.category_name,
  }));

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
          All Projects ({allProducts?.data?.length})
        </Typography>
        <Button variant="contained" color="primary" startIcon={<FaPlus />}>
          Add New Project
        </Button>
      </Box>
      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm my-5">
        <div>
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid item xs={6} className="w-1/2">
              <TextField
                type="text"
                placeholder="Search experiences..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={searchTerm}
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} className="w-1/2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem key={'all'} value="all">
                    All
                  </MenuItem>
                  {categoryOptions?.map((option) => (
                    <MenuItem key={option?._id} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="px-2 lg:px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredData?.map((product) => (
          <ProductCard p={product} key={product?._id} />
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
