import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTasks, FaStar } from "react-icons/fa";
import { Button, TextInput } from "flowbite-react";

const RatingWorkGroup_01 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks] = useState([]);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [ratedTasks, setRatedTasks] = useState([]); // Array to store rated task IDs

  useEffect(() => {
    handleShowAssignments(); 
  }, [currentUser._id]);

  const handleShowAssignments = async () => {
    try {
      const res = await fetch("/api/taskAssign/all");
      const data = await res.json();
      if (data.success === false) {
        setShowTasksError(true);
        return;
      }
      setShowTasks(data);
    } catch (error) {
      setShowTasksError(true);
    }
  };

  const handleClick = (value) => {
    if (rating === value) {
      // If the same star is clicked again, reset the rating
      setRating(null);
    } else {
      setRating(value);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleRating = async (taskId) => {
    try {
      // Perform rating logic here
      // After successful rating, add the taskId to the ratedTasks state
      setRatedTasks([...ratedTasks, taskId]);
    } catch (error) {
      console.error("Error rating task:", error);
    }
  };

  const filterAssignedTasks = showTasks.filter((task) => {
    return (
      task.TaskID.includes(searchInput) ||
      task.WorkGroupID.includes(searchInput)
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
      <h1 className="text-center mt-7 font-extrabold text-3xl underline">
        Completed Maintenance Tasks
      </h1>
      <div className="flex gap-4 mb-4 pt-4 pl-5">
        <TextInput
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleChange}
        />
      </div>
      {currentUser.isFacilityAdmin && (
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 mb-6 gap-10">
          {filterAssignedTasks.length > 0 &&
            filterAssignedTasks.map((task) => (
              <li
                key={task._id}
                className="group relative w-full border border-teal-500 overflow-hidden rounded-lg sm:w-[330px] transition-all"
              >
                <div className="flex flex-wrap gap-2">
                  <Button gradientDuoTone='purpleToBlue'  pill onClick={() => handleRating(task._id)}>
                    {/* Check if the task has been rated */}
                    {ratedTasks.includes(task._id) ? (
                      <span className="text-green-500">Rated</span>
                    ) : (
                      <Link
                        // className=" hover:underline"
                        to={`/rate-tasks/${task._id}`}
                      >
                        Go to Rate
                      </Link>
                    )}
                  </Button>
                </div>
                <Link
                  className="text-slate-700 font-semibold hover:underline truncate flex-1"
                  to={`/tasks-table/${task._id}`}
                >
                  <div className="w-full p-[10px]">
                    <div className="flex items-center space-x-1">
                      <FaTasks className="h-4 w-4 text-blue-500" />
                      <p>{task.TaskID}</p>
                    </div>
                    <p className="font-semibold text-xl text-slate-700 dark:text-slate-200 truncate">
                      {task.Category}
                    </p>
                    <p className="font-semibold text-sm text-slate-400">
                      {task.Name}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {task.Description}
                    </p>
                    <p className="text-[#457b9d] mt-2 font-semibold">
                      {task.WorkGroupID}
                    </p>
                    <div className="flex items-center mt-[10px] space-x-3">
                      <div className="font-bold text-xs">
                        <p>{task.Location}</p>
                      </div>
                      <div className="font-bold text-xs">
                        <p>{task.DurationDays}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default RatingWorkGroup_01;
