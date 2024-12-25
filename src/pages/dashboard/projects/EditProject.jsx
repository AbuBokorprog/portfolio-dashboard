import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import {
  useAllProjectsCategoryQuery,
  useCreateProjectMutation,
  useSingleProjectsQuery,
} from '../../../redux/features/services/ProjectsApi';
import { useAllSkillsQuery } from '../../../redux/features/services/SkillsApi';
import { useParams } from 'react-router-dom';

const EditProject = () => {
  const { id } = useParams();
  const { data } = useSingleProjectsQuery(id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { data: categories } = useAllProjectsCategoryQuery();
  const { data: skills } = useAllSkillsQuery();
  const [createProject] = useCreateProjectMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.thumbnail[0]);
      formData.append(
        'data',
        JSON.stringify({
          ...data,
          skills: data.skills.map((skill) => skill.technology_name),
        })
      );

      const res = await createProject(formData).unwrap();
      if (res.success) {
        alert(res.message);
        reset();
      }
    } catch (error) {
      alert(error.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Create New Project
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Project Name */}
            <TextField
              label="Project Name"
              fullWidth
              {...register('projects_name', {
                required: 'Project name is required',
              })}
              error={!!errors.projects_name}
              helperText={errors.projects_name?.message}
            />

            {/* Category Selection */}
            <FormControl fullWidth error={!!errors.categoryId}>
              <InputLabel>Category</InputLabel>
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <Select {...field} label="Category">
                    {categories?.data?.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.categoryId && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 2 }}
                >
                  {errors.categoryId.message}
                </Typography>
              )}
            </FormControl>

            {/* Thumbnail Upload */}
            <TextField
              type="file"
              fullWidth
              inputProps={{
                accept: 'image/*',
              }}
              {...register('thumbnail', {
                required: 'Thumbnail is required',
              })}
              error={!!errors.thumbnail}
              helperText={errors.thumbnail?.message}
            />

            {/* Short Description */}
            <TextField
              label="Short Description"
              multiline
              rows={4}
              fullWidth
              {...register('short_description', {
                required: 'Short description is required',
                minLength: {
                  value: 200,
                  message: 'Short description must be at least 200 characters',
                },
                maxLength: {
                  value: 450,
                  message: 'Short description must not exceed 450 characters',
                },
              })}
              error={!!errors.short_description}
              helperText={
                errors.short_description?.message ||
                'Description should be between 200-450 characters'
              }
            />

            {/* Skills Selection */}
            <Controller
              name="skills"
              control={control}
              rules={{ required: 'At least one skill is required' }}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={skills?.data || []}
                  getOptionLabel={(option) => option.technology_name}
                  value={value}
                  onChange={(_, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills"
                      error={!!errors.skills}
                      helperText={errors.skills?.message}
                    />
                  )}
                />
              )}
            />

            {/* GitHub URL */}
            <TextField
              label="GitHub URL"
              fullWidth
              {...register('github_url')}
            />

            {/* View URL */}
            <TextField
              label="View URL"
              fullWidth
              {...register('view_url', {
                required: 'View URL is required',
              })}
              error={!!errors.view_url}
              helperText={errors.view_url?.message}
            />

            {/* Submit Button */}
            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Create Project
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditProject;
