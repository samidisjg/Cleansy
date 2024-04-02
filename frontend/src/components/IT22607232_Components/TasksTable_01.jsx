import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const TasksTable_01 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks] = useState([]);

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

  useEffect(() => {
    handleShowAssignments(); // Call the function directly when the component mounts
  }, [currentUser._id]);
  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isFacilityAdmin && (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Task ID</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>WorkGroupID</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Duration(Days)</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {showTasks.map((tasks) => (
              <>
                <Table.Body key={tasks._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(tasks.updatedAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>{tasks.TaskID}</Table.Cell>
                    <Table.Cell>{tasks.Category}</Table.Cell>
                    <Table.Cell>{tasks.Name}</Table.Cell>
                    <Table.Cell>{tasks.Description}</Table.Cell>
                    <Table.Cell>{tasks.WorkGroupID}</Table.Cell>
                    <Table.Cell>{tasks.Location}</Table.Cell>
                    <Table.Cell>{tasks.DurationDays}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {}}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-tasks:taskid/${tasks._id}`}
                      >
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </>
            ))}
          </Table>

          <p className="text-red-700 mt-5">
            {showTasksError ? "Error fetching tasks" : ""}
          </p>

          {showTasks &&
            showTasks.length > 0 &&
            showTasks.map((tasks) => (
              <Link
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                to={`/tasks-table/${tasks._id}`}
              ></Link>
            ))}
        </>
      )}
    </div>
  );
};

export default TasksTable_01;
