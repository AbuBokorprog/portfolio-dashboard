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
import {
  useSingleExperienceQuery,
  useUpdateExperienceMutation,
} from '../../../redux/features/services/ExperienceApi';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Self-employed',
  'Freelance',
  'Internship',
  'Trainee',
];

const EditExperience = () => {
  const { id } = useParams();
  const { data } = useSingleExperienceQuery(id);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      position: data?.data?.position,
      type: data?.data?.type,
      company_location: data?.data?.company_location,
      company_name: data?.data?.company_name,
      short_description: data?.data?.short_description,
      startTime: moment(data?.data?.startTime).toISOString(),
      endTime: moment(data?.data?.endTime).toISOString(),
      isPresent: data?.data?.isPresent,
    },
  });

  const [updateExperience] = useUpdateExperienceMutation();
  const isPresent = watch('isPresent');

  const onSubmit = async (data) => {
    try {
      // Convert dates to ISO string format
      const formattedData = {
        ...data,
        // startTime: data.startTime.toISOString(),
        // endTime: data.isPresent ? null : data.endTime.toISOString(),
      };

      const res = await updateExperience({
        id: id,
        data: formattedData,
      }).unwrap();
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
          Update Experience
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Position */}
            <TextField
              label="Position"
              fullWidth
              {...register('position')}
              defaultValue={data?.data?.position}
              error={!!errors.position}
              helperText={errors.position?.message}
            />

            {/* Employment Type */}
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel>Employment Type</InputLabel>
              <Controller
                name="type"
                control={control}
                defaultValue={data?.data?.type}
                rules={{}}
                render={({ field }) => (
                  <Select {...field} label="Employment Type">
                    <MenuItem defaultValue={data?.data?.type}>
                      {data?.data?.type}
                    </MenuItem>
                    {employmentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            {/* Company Name */}
            <TextField
              label="Company Name"
              fullWidth
              defaultValue={data?.data?.company_name}
              {...register('company_name')}
              error={!!errors.company_name}
              helperText={errors.company_name?.message}
            />

            {/* Company Location */}
            <TextField
              label="Company Location"
              fullWidth
              defaultValue={data?.data?.company_location}
              {...register('company_location')}
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
                  rules={{}}
                  render={({ field }) => (
                    <DatePicker
                      label="Start Date"
                      {...field}
                      value={field.value ? moment(field.value) : null}
                      onChange={(date) =>
                        field.onChange(date ? moment(date).toISOString() : null)
                      }
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
                      defaultValue={data?.data?.isPresent}
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
                    rules={{}}
                    render={({ field }) => (
                      <DatePicker
                        label="End Date"
                        {...field}
                        value={field.value ? moment(field.value) : null}
                        onChange={(date) =>
                          field.onChange(
                            date ? moment(date).toISOString() : null
                          )
                        }
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

export default EditExperience;
