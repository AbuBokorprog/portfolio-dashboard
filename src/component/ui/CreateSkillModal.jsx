import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  useCreateSkillMutation,
  useEditSkillMutation,
} from '../../redux/features/services/SkillsApi';

const CreateSkillModal = ({
  setOpen,
  open,
  defaultValue = null,
  setDefaultValue,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useEditSkillMutation();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('file', data.image[0]);
    formData.append('data', JSON.stringify(data));

    if (defaultValue?.technology_name) {
      try {
        const res = await updateSkill({
          id: defaultValue?._id,
          data: formData,
        }).unwrap();
        if (res?.success) {
          alert(res?.message);
          reset();
          handleClose();
          setDefaultValue(null);
        }
      } catch (error) {
        alert(error?.data?.message);
      }
    } else {
      try {
        const res = await createSkill(formData).unwrap();
        if (res?.success) {
          alert(res?.message);
          reset();
          handleClose();
        }
      } catch (error) {
        alert(error?.data?.message);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Create New Skill</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Skill Name"
            defaultValue={defaultValue?.technology_name}
            type="text"
            fullWidth
            {...register('technology_name', {
              required: 'Skill name is required',
              minLength: {
                value: 2,
                message: 'Skill name must be at least 2 characters',
              },
            })}
            error={!!errors.technology_name}
            helperText={errors.technology_name?.message}
          />
          <TextField
            margin="dense"
            type="file"
            fullWidth
            inputProps={{
              accept: 'image/*',
            }}
            {...register('image', {
              required: 'Skill image is required',
            })}
            error={!!errors.image}
            helperText={errors.image?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {defaultValue?._id ? 'Update' : ' Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateSkillModal;
