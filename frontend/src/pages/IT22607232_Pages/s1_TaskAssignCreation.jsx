import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/*import TaskAssignRoute from "../../routes/IT22607232_Routes/s1_TaskAssignRoute";*/
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { toast } from "react-toastify";

const generateTaskID = () => `TID-${Math.floor(10000 + Math.random() * 90000)}`;

const TaskAssign = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [taskID, setTaskID] = useState("");
  const [formData, setFormData] = useState({
    TaskID: "",
    Category: "",
    AssignDate: "",
    type: "",
    email: "",
    Name: "",
    Description: "",
    WorkGroupID: "",
    Location: "",
    DurationDays: "2",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleChange = (e) => {
    let boolean = null; // Declare boolean variable here

    if (e.target.name === "Date") {
      setFormData({
        ...formData,
        date: formattedDate,
      });
    } else {
      if (e.target.value === "true") {
        boolean = true;
      }
      if (e.target.value === "false") {
        boolean = false;
      }
      if (
        e.target.type === "number" ||
        e.target.type === "text" ||
        e.target.type === "textarea" ||
        e.target.type === "date"
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.TaskID === currentUser.TaskID)
        return setError("TaskID already exists");
      setLoading(true);
      setError(false);

      const res = await fetch("/api/taskAssign/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      if (data.success === true) {
        const subject = data.TaskID;

        const text = `TaskID: ${data.TaskID} \'n Category: ${data.Category} \n AssignDate: ${data.AssignDate} \n Name: ${data.Name} \n Description: ${data.Description} \n WorkGroupID: ${data.WorkGroupID} \n Location: ${data.Location} \n DurationDays: ${data.DurationDays} \n type: ${data.type}`;
        handleTasksEmailSending(data.Email, subject, text);
        toast.success("Task assigned successfully! Email sent");
      } else {
        toast.error(data.message || "Failed to assign task!");
      }

      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      //navigate(`/task-assign/${data._id}`);
      navigate("/dashboard?tab=maintenance");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const generatedID = generateTaskID();
    setFormData((prevFormData) => ({
      ...prevFormData,
      TaskID: generatedID,
    }));
  }, []);

  const handleTasksEmailSending = async (to, subject, text) => {
    try {
      const res = await fetch(
        `/api/taskAssign/sendEmail/${to}/${subject}/${text}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      } /*else {
        setShowTasks((prev) =>
          prev.filter((task) => task._id !== taskIdToDelete)
        );
        setShowModal(false);
      }*/
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <main>
        <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
          Assign Tasks
        </h1>
      </main>
      <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full justify-center"
        >
          <div>
            <Label value="TaskID" />
            <TextInput
              type="text"
              name="TaskID"
              placeholder="TaskID"
              required
              onChange={handleChange}
              value={formData.TaskID}
              readOnly
            />
          </div>
          <div>
            <Label value="Category" />
            <Select
              className=""
              onChange={(e) =>
                setFormData({ ...formData, Category: e.target.value })
              }
            >
              <option value="Select">Select a Category</option>
              <option value="Elavator">Elavator</option>
              <option value="Pest Control">Pest Control</option>
              <option value="Janitorial">Janitorial</option>
            </Select>
          </div>

          <div>
            <Label value="Date" />
            <TextInput
              type="date"
              id="AssignDate"
              min={new Date().toISOString().split("T")[0]}
              name="AssignDate"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label value="type" />
            <Select
              className=""
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="Select">Select a Category</option>
              <option value="Pending">Pending</option>
              <option value="Inprogress">Inprogress</option>
              <option value="Completed">Completed</option>
            </Select>
          </div>

          <div>
            <Label value="Email Address" />
            <TextInput
              type="text"
              name="email"
              placeholder="email"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div>
            <Label value="Name" />
            <TextInput
              type="text"
              name="Name"
              placeholder="Name"
              required
              onChange={handleChange}
              value={formData.Name}
            />
          </div>
          <div>
            <Label value="Description" />
            <Textarea
              type="textarea"
              name="Description"
              placeholder="Add a Description..."
              rows="3"
              maxLength="200"
              onChange={handleChange}
              value={formData.Description}
            />
          </div>
          <div>
            <div>
              <Label value="WorkGroupID" />
              <TextInput
                type="text"
                name="WorkGroupID"
                placeholder="WorkGroupID"
                required
                onChange={handleChange}
                value={formData.WorkGroupID}
              />
            </div>
            <div>
              <div>
                <Label value="Location" />
                <TextInput
                  type="text"
                  name="Location"
                  onChange={handleChange}
                  placeholder="Location"
                  value={formData.Location}
                  required
                />
              </div>
              <div>
                <Label value="Duration" />
                <TextInput
                  type="number"
                  name="DurationDays"
                  placeholder="Duration"
                  required
                  onChange={handleChange}
                  value={formData.DurationDays}
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            className="uppercase"
          >
            {loading ? "Assigning..." : "Assign task"}
          </Button>
          {error && (
            <Alert
              className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center
           text-red-600 text-base tracking-wide animate-bounce"
            >
              {error}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskAssign;
