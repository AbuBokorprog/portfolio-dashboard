const SkillCard = ({ skill }) => {
  return (
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
    </div>
  );
};

export default SkillCard;
