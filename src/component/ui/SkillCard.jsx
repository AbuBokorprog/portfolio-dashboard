import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CreateSkillModal from './CreateSkillModal';
import Swal from 'sweetalert2';
import { useDeleteSkillMutation } from '../../redux/features/services/SkillsApi';

const SkillCard = ({ skill }) => {
  const [editSkill, setEditSkill] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setEditSkill(skill);
    setOpen(true);
  };

  const [deleteSkill] = useDeleteSkillMutation();
  const deleteSkillHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteSkill(id).unwrap();
          if (res?.delete) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <div key={skill?._id} className="flex flex-col items-center">
        <div className="bg-gray-300 p-4 rounded-full mb-2">
          <img
            src={skill?.icon}
            alt={`${skill?.technology_name} icon`}
            className="w-12 h-12" // Adjust size as needed
          />
        </div>
        <span className=" text-black  flex items-center justify-center px-4 rounded-3xl border border-black  py-2  shadow-md">
          {skill?.technology_name}
        </span>
        {/* Action Buttons */}
        <div className="">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleClickOpen}
              className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
              title="Edit"
            >
              <FaEdit className="size-6" />
            </button>
            <button
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Delete"
              onClick={() => deleteSkillHandler(skill?._id)}
            >
              <FaTrash className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <CreateSkillModal
        open={open}
        setOpen={setOpen}
        defaultValue={editSkill}
        setDefaultValue={setEditSkill}
      />
    </>
  );
};

export default SkillCard;
