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
import { useCreateEducationMutation } from '../../../redux/features/services/EducationApi';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const degrees = [
  'SSC',
  'HSC',
  'Diploma',
  'Bachelor',
  "Master's",
  'Ph.D.',
  'Associate',
  'Certificate',
];

const CreateEducation = () => {
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

  const [createEducation] = useCreateEducationMutation();
  const isPresent = watch('isPresent');

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        startTime: data.startTime.toISOString(),
        endTime: data.isPresent ? null : data.endTime.toISOString(),
      };

      const res = await createEducation(formattedData).unwrap();
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
          Add Education
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Degree Selection */}
            <FormControl fullWidth error={!!errors.degree}>
              <InputLabel>Degree</InputLabel>
              <Controller
                name="degree"
                control={control}
                rules={{ required: 'Degree is required' }}
                render={({ field }) => (
                  <Select {...field} label="Degree">
                    {degrees.map((degree) => (
                      <MenuItem key={degree} value={degree}>
                        {degree}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.degree && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 2 }}
                >
                  {errors.degree.message}
                </Typography>
              )}
            </FormControl>

            {/* Grade Selection */}
            <TextField
              label="Grade"
              fullWidth
              {...register('grade', {
                required: 'Grade is required!',
              })}
              error={!!errors.grade}
              helperText={errors.grade?.message}
            />

            {/* Field of Study */}
            <TextField
              label="Field of Study"
              fullWidth
              {...register('field', {
                required: 'Field of study is required',
              })}
              error={!!errors.field}
              helperText={errors.field?.message}
            />

            {/* Institute Name */}
            <TextField
              label="Institute Name"
              fullWidth
              {...register('institute_name', {
                required: 'Institute name is required',
              })}
              error={!!errors.institute_name}
              helperText={errors.institute_name?.message}
            />

            {/* Institute Location */}
            <TextField
              label="Institute Location"
              fullWidth
              {...register('institute_location', {
                required: 'Institute location is required',
              })}
              error={!!errors.institute_location}
              helperText={errors.institute_location?.message}
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

                {/* Currently Studying Switch */}
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
                  label="Currently Studying"
                />

                {/* End Date (if not currently studying) */}
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

            {/* Short Description (Optional) */}
            <TextField
              label="Description (Optional)"
              multiline
              rows={4}
              fullWidth
              {...register('short_description')}
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
                Add Education
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateEducation;
