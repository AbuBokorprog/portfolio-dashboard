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
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  useSingleEducationsQuery,
  useUpdateEducationMutation,
} from '../../../redux/features/services/EducationApi';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import moment from 'moment';

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

const EditEducation = () => {
  const { id } = useParams();
  const { data } = useSingleEducationsQuery(id);
  const achievementsDefaultValues = data?.data?.achievements?.map((key) => ({
    value: key,
  }));
  const coursesDefaultValues = data?.data?.courses?.map((challenge) => ({
    value: challenge,
  }));
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      degree: data?.data?.degree,
      field: data?.data?.field,
      grade: data?.data?.grade,
      institute_location: data?.data?.institute_location,
      institute_name: data?.data?.institute_name,
      short_description: data?.data?.short_description,
      startTime: moment(data?.data?.startTime).toISOString(),
      endTime: moment(data?.data?.endTime).toISOString(),
      isPresent: data?.data?.isPresent,
      achievements: achievementsDefaultValues || [{}],
      courses: coursesDefaultValues || [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'achievements', // unique name for your Field Array
  });
  const {
    fields: coursesFields,
    append: coursesAppend,
    remove: coursesRemove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'courses', // unique name for your Field Array
  });

  const [updateEducation] = useUpdateEducationMutation();
  const isPresent = watch('isPresent');

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formattedData = {
        ...data,
        // startTime: data.startTime.toISOString(),
        // endTime: data.isPresent ? null : data.endTime.toISOString(),
        achievements:
          data?.achievements?.map((achievement) => achievement.value) || [],
        courses: data?.courses?.map((courses) => courses.value) || [],
      };

      const res = await updateEducation({
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
          Edit Education
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Degree Selection */}
            <FormControl fullWidth error={!!errors.degree}>
              <InputLabel>Degree</InputLabel>
              <Controller
                name="degree"
                defaultValue={data?.data?.degree}
                control={control}
                rules={{}}
                render={({ field }) => (
                  <Select {...field} label="Degree">
                    <MenuItem
                      key={data?.data?.degree}
                      value={data?.data?.degree}
                    >
                      {data?.data?.degree}
                    </MenuItem>
                    {degrees.map((degree) => (
                      <MenuItem key={degree} value={degree}>
                        {degree}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            {/* Grade Selection */}
            <TextField
              label="Grade"
              fullWidth
              defaultValue={data?.data?.grade}
              {...register('grade')}
              error={!!errors.grade}
              helperText={errors.grade?.message}
            />

            {/* Field of Study */}
            <TextField
              label="Field of Study"
              fullWidth
              defaultValue={data?.data?.field}
              {...register('field')}
              error={!!errors.field}
              helperText={errors.field?.message}
            />

            {/* Institute Name */}
            <TextField
              label="Institute Name"
              fullWidth
              defaultValue={data?.data?.institute_name}
              {...register('institute_name')}
              error={!!errors.institute_name}
              helperText={errors.institute_name?.message}
            />

            {/* Institute Location */}
            <TextField
              label="Institute Location"
              fullWidth
              defaultValue={data?.data?.institute_location}
              {...register('institute_location')}
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
            {/* achievements */}
            <div className="space-y-5">
              <InputLabel>Achievements:</InputLabel>
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
                      <TextField {...field} placeholder="Achievements" />
                    )}
                    name={`achievements.${index}.value`}
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
            {/* courses */}
            <div className="space-y-5">
              <InputLabel>Courses:</InputLabel>
              {coursesFields.map((item, index) => (
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
                      <TextField {...field} placeholder="Courses" />
                    )}
                    name={`courses.${index}.value`}
                    control={control}
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => coursesRemove(index)}
                  >
                    Delete
                  </Button>
                </FormControl>
              ))}
              <Button
                className="my-5"
                variant="contained"
                type="button"
                onClick={() => coursesAppend({})}
              >
                append
              </Button>
            </div>
            {/* Short Description (Optional) */}
            <TextField
              label="Description (Optional)"
              multiline
              defaultValue={data?.data?.short_description}
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
                Update Education
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditEducation;
