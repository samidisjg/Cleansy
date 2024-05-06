import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const TasksTable_01 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks] = useState([]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState("");

  useEffect(() => {
    handleShowAssignments(); // Call the function directly when the component mounts
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

  /*const handleTasksDelete = async (_id) => {
    try {
      const res = await fetch(`/api/taskAssign/delete/${_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setShowTasks((prev) => prev.filter((task) => task._id !== _id));
    } catch (error) {
      console.log(error.message);
    }
  };*/

  const handleTasksDelete = async () => {
    try {
      const res = await fetch(`/api/taskAssign/delete/${taskIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      } else {
        setShowTasks((prev) =>
          prev.filter((task) => task._id !== taskIdToDelete)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDownloadPDF = () => {
    const TaskAssign = new jsPDF();
    const tableColumn = [
      "Date",
      "Task ID",
      "Category",
      "AssignDate",
      "Name",
      "Description",
      "WorkGroupID",
      "Location",
      "Duration(Days)",
      "Status",
    ];
    const tableRows = [];

    showTasks.forEach((task) => {
      const rowData = [
        new Date(task.updatedAt).toLocaleDateString(),
        task.TaskID,
        task.Category,
        task.AssignDate,
        task.type,
        task.Name,
        task.Description,
        task.WorkGroupID,
        task.Location,
        task.DurationDays,
        "Initial",
      ];
      tableRows.push(rowData);
    });

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    const logo = "/cleansyBG.png";

    const imgWidth = 120;
    const imgHeight = 80;

    const centerX = (TaskAssign.internal.pageSize.getWidth() - imgWidth) / 2;
    const centerY = (TaskAssign.internal.pageSize.getHeight() - imgHeight) / 2;

    // Add text
    TaskAssign.text(
      "Cleansy Sustainable Community Management System Pvt Ltd",
      14,
      15
    );

    // Add watermark function
    const addWatermark = () => {
      TaskAssign.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);
    };

    // Add watermark to each page
    TaskAssign.autoTable(tableColumn, tableRows, { 
      startY: 20,
      addPageContent: addWatermark
    });
    
    TaskAssign.save(
      `Assigned_Mainataianace_Tasks_Report_${
        year + " " + month + " " + date
      }.pdf`
    );
};


  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isFacilityAdmin && (
        <>
          Cleansy Assigned Maintainanace Tasks
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Task ID</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>AssignDate</Table.HeadCell>
              <Table.HeadCell>type</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>WorkGroupID</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Duration(Days)</Table.HeadCell>
              <Table.HeadCell onClick={() => handleTasksDelete(task._id)}>
                Delete
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {showTasks.map((task) => (
              <Table.Body key={task._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(task.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{task.TaskID}</Table.Cell>
                  <Table.Cell>{task.Category}</Table.Cell>
                  <Table.Cell>{task.AssignDate}</Table.Cell>
                  <Table.Cell>{task.type}</Table.Cell>
                  <Table.Cell>{task.Name}</Table.Cell>
                  <Table.Cell>{task.Description}</Table.Cell>
                  <Table.Cell>{task.WorkGroupID}</Table.Cell>
                  <Table.Cell>{task.Location}</Table.Cell>
                  <Table.Cell>{task.DurationDays}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setTaskIdToDelete(task._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-tasks/${task._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          <br></br>
          <Button className="rounded-md" gradientDuoTone='purpleToBlue' onClick={handleDownloadPDF}>Download PDF</Button>
          <p className="text-red-700 mt-5">
            {showTasksError ? "Error fetching tasks" : ""}
          </p>
          {showTasks &&
            showTasks.length > 0 &&
            showTasks.map((task) => (
              <Link
                key={task._id}
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                to={`/tasks-table/${task._id}`}
              ></Link>
            ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleTasksDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TasksTable_01;
