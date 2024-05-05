import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput, Textarea, Table } from "flowbite-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logo from "../../components/IT22607232_Components/images_01/cleansy.jpg";
const WorkEstimate_01 = () => {
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks,showEstimate] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    TaskID: "",
    DurationDays: "",
    Category: "",
    Size: "",
    Complexity: "",
    estimationCost: "",
    estimatedManHours: "2",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  useEffect(() => {
    const fetchTask = async () => {
      const taskid = params.taskid;
      const res = await fetch(`/api/workEstimation/getOne/${taskid}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData({
        TaskID: data.TaskID,
        DurationDays: data.DurationDays.toString(),
        Category: data.Category,
        Size: data.Size,
        Complexity: data.Complexity,
        estimationCost: data.estimationCost,
        estimatedManHours: data.estimatedManHours,
      });
      // Update showTasks with the fetched task data
      setShowTasks([data]);
    };
    fetchTask();
  }, []);

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: boolean !== null ? boolean : e.target.value,
      });
    }
  };

  const handleDownloadPDF = () => {
    const TaskAssign = new jsPDF();
    const tableColumn = [
      "Date",
      "TaskID",
      "Duration(Days)",
      "Category",
      "Size",
      "Complexity",
      "EstimationCost",
      "EstimatedManHours",
    ];
    const tableRows = [];

    showTasks.forEach((task) => {
      const rowData = [
        new Date(task.updatedAt).toLocaleDateString(),
        task.TaskID,
        task.DurationDays,
        task.Category,
        task.Size,
        task.Complexity,
        task.estimationCost,
        task.estimatedManHours,
      ];
      tableRows.push(rowData);
    });

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    const logo = "/cleansyBG.png";

    const imgWidth = 160;
    const imgHeight = 120;

    const centerX = TaskAssign.internal.pageSize.getWidth() - imgWidth / 0.9;
    const centerY = TaskAssign.internal.pageSize.getHeight() - imgHeight / 0.5;

    TaskAssign.text(
      "Cleansy Sustainable Community Management System Pvt Ltd",
      14,
      15
    );

    const addWatermark = () => {
      TaskAssign.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);
    };

    TaskAssign.text(
      `Work Estimation Report - ${year}/${month}/${date}`,
      14,
      25
    );
    TaskAssign.autoTable(tableColumn, tableRows, {
      startY: 40,
      addPageContent: addWatermark,
    });
    TaskAssign.save(`Work Estimation_${year}_${month}_${date}.pdf`);
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
              <Table.HeadCell>estimationCost</Table.HeadCell>
              <Table.HeadCell>estimatedManHours</Table.HeadCell>
            </Table.Head>
            {showTasks &&
              showTasks.length > 0 &&
              showTasks.map((task) => (
                <Table.Body key={task._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {task.updatedAt
                        ? new Date(task.updatedAt).toLocaleDateString()
                        : ""}
                    </Table.Cell>
                    <Table.Cell>{task.TaskID}</Table.Cell>
                    <Table.Cell>{task.DurationDays}</Table.Cell>
                    <Table.Cell>{task.Category}</Table.Cell>
                    <Table.Cell>{task.Size}</Table.Cell>
                    <Table.Cell>{task.Complexity}</Table.Cell>
                    <Table.Cell>{task.estimationCost}</Table.Cell>
                    <Table.Cell>{task.estimatedManHours}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            Created by: {currentUser.isFacilityAdmin ? currentUser.name : ""}
          </Table>
          <br></br>
          <Button
            className="rounded-md"
            gradientDuoTone="purpleToBlue"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
          <p className="text-red-700 mt-5">
            {showTasksError ? "Error fetching tasks" : ""}
          </p>
        </>
      )}
    </div>
  );
};

export default WorkEstimate_01;
