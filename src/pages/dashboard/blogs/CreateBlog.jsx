import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Autocomplete,
  Chip,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateBlogMutation } from '../../../redux/features/services/BlogsApi';

// Predefined categories for blogs
const blogCategories = [
  'Web Development',
  'Programming',
  'JavaScript',
  'React',
  'Node.js',
  'Frontend',
  'Backend',
  'Full Stack',
  'Database',
  'DevOps',
  'Career',
  'Technology',
];

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [createBlog] = useCreateBlogMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.thumbnail[0]);
      formData.append(
        'data',
        JSON.stringify({
          title: data.title,
          category: data.category,
          description: data.description,
        })
      );

      const res = await createBlog(formData).unwrap();
      if (res.success) {
        alert(res.message);
        reset();
      }
    } catch (error) {
      console.log(error);
      alert(error.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Create New Blog
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Blog Title */}
            <TextField
              label="Blog Title"
              fullWidth
              {...register('title', {
                required: 'Blog title is required',
                minLength: {
                  value: 10,
                  message: 'Title must be at least 10 characters',
                },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            {/* Blog Thumbnail */}
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

            {/* Blog Categories */}
            <Controller
              name="category"
              control={control}
              rules={{ required: 'At least one category is required' }}
              defaultValue={[]}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Autocomplete
                  multiple
                  options={blogCategories}
                  value={value}
                  onChange={(_, newValue) => onChange(newValue)}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categories"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />

            {/* Blog Description */}
            <TextField
              label="Blog Description"
              multiline
              rows={8}
              fullWidth
              {...register('description', {
                required: 'Blog description is required',
                minLength: {
                  value: 100,
                  message: 'Description must be at least 100 characters',
                },
              })}
              error={!!errors.description}
              helperText={
                errors.description?.message ||
                'Write your blog content here (minimum 100 characters)'
              }
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
                Publish Blog
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateBlog;
