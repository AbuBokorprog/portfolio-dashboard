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
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  useAllProjectsCategoryQuery,
  useCreateProjectMutation,
} from '../../../redux/features/services/ProjectsApi';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useAllSkillsQuery } from '../../../redux/features/services/SkillsApi';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const CreateProject = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      key_features: [{}],
      challenges: [{}],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'key_features', // unique name for your Field Array
  });
  const {
    fields: challengesFields,
    append: challengesAppend,
    prepend: challengesPrepend,
    remove: challengesRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'challenges', // unique name for your Field Array
  });

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
          completion_date: data.completion_date.toISOString(),
          key_features: data?.key_features?.map((key) => key.value),
          challenges: data?.key_features?.map((challenge) => challenge.value),
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
            {/* Key features */}
            <div className="space-y-5">
              {fields.map((item, index) => (
                <FormControl
                  key={item.id}
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: '3fr 1fr',
                  }}
                >
                  <Controller
                    render={({ field }) => (
                      <TextField {...field} placeholder="Key Feature" />
                    )}
                    name={`key_features.${index}.value`}
                    control={control}
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </FormControl>
              ))}
              <Button
                className="my-5"
                variant="contained"
                type="button"
                onClick={() => append({})}
              >
                append
              </Button>
            </div>
            {/* challenges */}
            <div className="space-y-5">
              {challengesFields.map((item, index) => (
                <FormControl
                  key={item.id}
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: '3fr 1fr',
                  }}
                >
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Challenges & Solution"
                      />
                    )}
                    name={`challenges.${index}.value`}
                    control={control}
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => challengesRemove(index)}
                  >
                    Delete
                  </Button>
                </FormControl>
              ))}
              <Button
                className="my-5"
                variant="contained"
                type="button"
                onClick={() => challengesAppend({})}
              >
                append
              </Button>
            </div>

            {/* Date Fields */}
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Box
                sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}
              >
                {/* completion Date */}
                <Controller
                  name="completion_date"
                  control={control}
                  rules={{ required: 'Completion Date is required' }}
                  render={({ field }) => (
                    <DatePicker
                      label="Completion Date"
                      {...field}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.completion_date}
                          helperText={errors.completion_date?.message}
                        />
                      )}
                    />
                  )}
                />
                <TextField
                  label="Duration"
                  fullWidth
                  {...register('duration', {
                    required: 'Duration is required',
                  })}
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                />
              </Box>
            </LocalizationProvider>

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

export default CreateProject;
