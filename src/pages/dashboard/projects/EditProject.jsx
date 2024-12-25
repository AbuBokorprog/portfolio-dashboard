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
  Chip,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import {
  useAllProjectsCategoryQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
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
  } = useForm({
    defaultValues: {
      categoryId: data?.data?.categoryId?._id,
      projects_name: data?.data?.projects_name,
      github_url: data?.data?.github_url,
      short_description: data?.data?.short_description,
      skills: data?.data?.skills,
      view_url: data?.data?.view_url,
    },
  });

  const { data: categories } = useAllProjectsCategoryQuery();
  const { data: skills } = useAllSkillsQuery();
  const [updateProject] = useEditProjectMutation();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      if (data?.thumbnail) {
        formData.append('file', data.thumbnail[0]);
      }
      formData.append(
        'data',
        JSON.stringify({
          skills: data.skills,
          categoryId: data.categoryId || data?.data?.categoryId?._id,
          projects_name: data.projects_name,
          github_url: data.github_url,
          short_description: data.short_description,
          view_url: data.view_url,
        })
      );

      const res = await updateProject({ id: id, data: formData }).unwrap();
      if (res.success) {
        alert(res.message);
        reset();
      }
    } catch (error) {
      console.log(error);
      alert(error.data?.message || 'Something went wrong');
    }
  };

  const defaultSkills = skills?.data?.map((skill) => skill.technology_name);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Edit Project ({data?.data?.projects_name})
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Project Name */}
            <TextField
              label="Project Name"
              fullWidth
              defaultValue={data?.data?.projects_name}
              {...register('projects_name')}
              error={!!errors.projects_name}
              helperText={errors.projects_name?.message}
            />

            {/* Category Selection */}
            <FormControl fullWidth error={!!errors.categoryId}>
              <InputLabel>Category</InputLabel>
              <Controller
                name="categoryId"
                control={control}
                defaultValue={data?.data?.categoryId?._id}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <Select {...field} label="Category">
                    <MenuItem defaultValue={data?.data?.categoryId?._id}>
                      {data?.data?.categoryId?.category_name}
                    </MenuItem>
                    {categories?.data?.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            {/* Thumbnail Upload */}
            <img src={data?.data?.thumbnail} alt="" />
            <TextField
              type="file"
              fullWidth
              inputProps={{
                accept: 'image/*',
              }}
              {...register('thumbnail')}
            />

            {/* Short Description */}
            <TextField
              label="Short Description"
              multiline
              rows={4}
              defaultValue={data?.data?.short_description}
              fullWidth
              {...register('short_description')}
            />

            {/* Skills Selection */}
            <Controller
              name="skills"
              control={control}
              rules={{ required: 'At least one skill is required' }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={defaultSkills || []}
                  getOptionLabel={(option) => option || ''}
                  value={value || []}
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
              defaultValue={data?.data?.github_url}
              {...register('github_url')}
            />

            {/* View URL */}
            <TextField
              label="View URL"
              fullWidth
              defaultValue={data?.data?.view_url}
              {...register('view_url')}
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
                Update Project
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditProject;
