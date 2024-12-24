import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateExperienceMutation } from '../../../redux/features/services/ExperienceApi';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Self-employed',
  'Freelance',
  'Internship',
  'Trainee',
];

const CreateExperience = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isPresent: false,
    },
  });

  const [createExperience] = useCreateExperienceMutation();
  const isPresent = watch('isPresent');

  const onSubmit = async (data) => {
    try {
      // Convert dates to ISO string format
      const formattedData = {
        ...data,
        startTime: data.startTime.toISOString(),
        endTime: data.isPresent ? null : data.endTime.toISOString(),
      };

      const res = await createExperience(formattedData).unwrap();
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
          Add New Experience
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Position */}
            <TextField
              label="Position"
              fullWidth
              {...register('position', {
                required: 'Position is required',
              })}
              error={!!errors.position}
              helperText={errors.position?.message}
            />

            {/* Employment Type */}
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel>Employment Type</InputLabel>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Employment type is required' }}
                render={({ field }) => (
                  <Select {...field} label="Employment Type">
                    {employmentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.type && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 2 }}
                >
                  {errors.type.message}
                </Typography>
              )}
            </FormControl>

            {/* Company Name */}
            <TextField
              label="Company Name"
              fullWidth
              {...register('company_name', {
                required: 'Company name is required',
              })}
              error={!!errors.company_name}
              helperText={errors.company_name?.message}
            />

            {/* Company Location */}
            <TextField
              label="Company Location"
              fullWidth
              {...register('company_location', {
                required: 'Company location is required',
              })}
              error={!!errors.company_location}
              helperText={errors.company_location?.message}
            />

            {/* Date Fields */}
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Box
                sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}
              >
                {/* Start Date */}
                <Controller
                  name="startTime"
                  control={control}
                  rules={{ required: 'Start date is required' }}
                  render={({ field }) => (
                    <DatePicker
                      label="Start Date"
                      {...field}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.startTime}
                          helperText={errors.startTime?.message}
                        />
                      )}
                    />
                  )}
                />

                {/* Currently Working Switch */}
                <FormControlLabel
                  control={
                    <Controller
                      name="isPresent"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label="Currently Working"
                />

                {/* End Date (if not currently working) */}
                {!isPresent && (
                  <Controller
                    name="endTime"
                    control={control}
                    rules={{ required: 'End date is required' }}
                    render={({ field }) => (
                      <DatePicker
                        label="End Date"
                        {...field}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.endTime}
                            helperText={errors.endTime?.message}
                          />
                        )}
                      />
                    )}
                  />
                )}
              </Box>
            </LocalizationProvider>

            {/* Short Description */}
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              {...register('short_description', {
                required: 'Description is required',
              })}
              error={!!errors.short_description}
              helperText={errors.short_description?.message}
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
                Add Experience
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateExperience;
