import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const EstimationOne_01 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    handleShowAssignments(); // Call the function directly when the component mounts
  }, [currentUser._id]);

  const handleShowAssignments = async () => {
    try {
      const res = await fetch("/api/workEstimation/all");
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

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isFacilityAdmin && (
        <>
          Estimations Created
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>TaskID</Table.HeadCell>
              <Table.HeadCell>DurationDays</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Size</Table.HeadCell>
              <Table.HeadCell>Complexity</Table.HeadCell>
              <Table.HeadCell>View Estimation</Table.HeadCell>
            </Table.Head>
            {showTasks &&
              showTasks.length > 0 &&
              showTasks.map((task) => (
                <Table.Body key={task._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(task.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{task.TaskID}</Table.Cell>
                    <Table.Cell>{task.DurationDays}</Table.Cell>
                    <Table.Cell>{task.Category}</Table.Cell>
                    <Table.Cell>{task.Size}</Table.Cell>
                    <Table.Cell>{task.Complexity}</Table.Cell>
                    <Table.Cell>
                      <Link
                        key={task._id}
                        className="text-red-700 font-semibold hover:underline truncate flex-1 dark:text-red-700"
                        to={`/get-estimation/${task._id}`}
                      >
                        View
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
          <br></br>
        </>
      )}
    </div>
  );
};

export default EstimationOne_01;
