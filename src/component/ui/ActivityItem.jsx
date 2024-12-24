// Activity Item Component
const ActivityItem = ({ title, description, time }) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h4 className="text-gray-800 font-medium">{title}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <span className="text-gray-400 text-sm">{time}</span>
    </div>
  );
};

export default ActivityItem;
