import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput, Textarea,Table } from "flowbite-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logo from "../../components/IT22607232_Components/images_01/cleansy.jpg"
const WorkEstimate_01 = () => {
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks] = useState([]);
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
      "DurationDays",
      "Category",
      "Size",
      "Complexity",
      "estimationCost",
      "estimatedManHours",
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
  
    // Create a preview modal
    const previewModal = document.createElement("div");
    previewModal.style.position = "fixed";
    previewModal.style.top = "0";
    previewModal.style.left = "0";
    previewModal.style.width = "100%";
    previewModal.style.height = "100%";
    previewModal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    previewModal.style.display = "flex";
    previewModal.style.justifyContent = "center";
    previewModal.style.alignItems = "center";
  
    const previewPDF = new jsPDF();
    previewPDF.addImage(logo, "JPEG", 0, 0, 210, 297); // Add the image
    previewPDF.autoTable(tableColumn, tableRows, { startY: 20 });
    previewPDF.text(
      "Cleansy Sustainable Community Management System Pvt Ltd",
      14,
      15
    );
    previewPDF.text(
      "Maintenance Work Estimation Report",
      14,
      25
    );
  
    // Create a preview iframe
    const previewIframe = document.createElement("iframe");
    previewIframe.src = URL.createObjectURL(
      new Blob([previewPDF.output("blob")], { type: "application/pdf" })
    );
    previewIframe.style.width = "80%";
    previewIframe.style.height = "80%";
    previewModal.appendChild(previewIframe);
  
    // Add the preview modal to the document body
    document.body.appendChild(previewModal);

   
  
    // Add a button to close the preview modal
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close Preview";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(previewModal);
    });
    previewModal.appendChild(closeButton);
  
    // Save the PDF file
    TaskAssign.addImage(logo, 'JPEG', 0, 0, 210, 297,'', 'FAST', 1); // Add the image with transparency
    TaskAssign.autoTable(tableColumn, tableRows, { startY: 20 });
    TaskAssign.text(
      "Cleansy Sustainable Community Management Sytstem Pvt Ltd",
      14,
      15
    );
    previewPDF.text(
        "", // Add a blank line
        14,
        30
      );
    TaskAssign.text(
      "Maintainance Work Estimation Report",
      14,
      15
    );
    TaskAssign.save(
      `WorkEstimation_Tasks_Report_${year + " " + month + " " + date}.pdf`
    );
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
          {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : ''}
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
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
          <p className="text-red-700 mt-5">
            {showTasksError ? "Error fetching tasks" : ""}
          </p>
        </>
      )}
    </div>
  );
};


export default WorkEstimate_01;