import { useFormContext } from 'react-hook-form';

const PTextarea = ({ label, name, require, placeHolder }) => {
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

      <textarea
        id={name}
        name={name}
        rows={5}
        required={require}
        placeholder={placeHolder}
        {...register(name, { required: require })}
        className="w-full border-2 rounded-md ps-2"
      />
    </div>
  );
};

export default PTextarea;
