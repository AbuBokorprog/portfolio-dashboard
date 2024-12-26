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
  useEditProjectMutation,
  useSingleProjectsQuery,
} from '../../../redux/features/services/ProjectsApi';
import { useAllSkillsQuery } from '../../../redux/features/services/SkillsApi';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const EditProject = () => {
  const { id } = useParams();
  const { data } = useSingleProjectsQuery(id);

  const keyFeaturesDefaultValues = data?.data?.key_features?.map((key) => ({
    value: key,
  }));
  const challengesDefaultValues = data?.data?.challenges?.map((challenge) => ({
    value: challenge,
  }));

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
      duration: data?.data?.duration,
      completion_date: moment(data?.data?.completion_date).toISOString(),
      short_description: data?.data?.short_description,
      skills: data?.data?.skills,
      view_url: data?.data?.view_url,
      key_features: keyFeaturesDefaultValues || [{}],
      challenges: challengesDefaultValues || [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'key_features', // unique name for your Field Array
  });
  const {
    fields: challengesFields,
    append: challengesAppend,
    remove: challengesRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'challenges', // unique name for your Field Array
  });

  const { data: categories } = useAllProjectsCategoryQuery();
  const { data: skills } = useAllSkillsQuery();
  const [updateProject] = useEditProjectMutation();

  const onSubmit = async (data) => {
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
          duration: data?.duration,
          completion_date: moment(data?.data?.completion_date).toISOString(),
          key_features: data?.key_features?.map((key) => key.value),
          challenges: data?.challenges?.map((challenge) => challenge.value),
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

            {/* Key features */}
            <div className="space-y-5">
              <InputLabel>Key Features:</InputLabel>
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
              <InputLabel>Challenges:</InputLabel>
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
                      value={field.value ? moment(field.value) : null}
                      onChange={(date) =>
                        field.onChange(date ? moment(date).toISOString() : null)
                      }
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
