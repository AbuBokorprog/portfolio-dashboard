import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const PInput = ({
  label = '',
  name,
  required,
  type = 'text',
  placeHolder,
  defaultValue = '',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      {/* Outside Label */}
      <label
        htmlFor={name}
        className="mb-2 block text-sm text-left font-medium text-gray-700"
      >
        {label}
      </label>

      <TextField
        id={name}
        name={name}
        required={required}
        type={type}
        defaultValue={defaultValue}
        variant="outlined"
        placeholder={placeHolder}
        size="medium"
        {...register(name, { required: required, message: 'Required' })}
        className="w-full"
      />
      {errors.name && errors.name.type === 'required' && (
        <span>This is required</span>
      )}
    </div>
  );
};

export default PInput;
