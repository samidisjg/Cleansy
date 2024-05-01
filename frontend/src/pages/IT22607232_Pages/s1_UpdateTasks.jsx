import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
/*import TaskAssignRoute from "../../routes/IT22607232_Routes/s1_TaskAssignRoute";*/
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";

const S1_UpdateTasks = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    TaskID: "",
    Category: "",
    AssignDate: "",
    Name: "",
    Description: "",
    WorkGroupID: "",
    Location: "",
    DurationDays: "2",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const taskid = params.taskid;
      const res = await fetch(`/api/taskAssign/one/${taskid}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      const formattedDate = new Date(data.AssignDate).toISOString().split('T')[0];
      setFormData({
        TaskID: data.TaskID,
        Category: data.Category,
        AssignDate: formattedDate,
        Name: data.Name,
        Description: data.Description,
        WorkGroupID: data.WorkGroupID,
        Location: data.Location,
        DurationDays: data.DurationDays.toString(),
      });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.TaskID === currentUser.TaskID)
        return setError("TaskID already exists");
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/taskAssign/update/${params.taskid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
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

  return (
    <div className="min-h-screen mt-20">
      <main>
        <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
          Update Assigned Tasks
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
          
            <Label value="Category" />
            <Select
  className=""
  onChange={(e) =>
    setFormData({ ...formData, Category: e.target.value })
  }
  value={formData.Category || ""}
>
  <option value="">Select a Category</option>
  <option value="Elavator">Elavator</option>
  <option value="Pest Control">Pest Control</option>
  <option value="Janitorial">Janitorial</option>
</Select>

          

<div>
            <Label htmlFor="date">Date:</Label>
            <TextInput
              type="date"
              id="AssignDate"
              name="AssignDate"
              min={new Date().toISOString().split('T')[0]}
              value={formData.AssignDate || ""}
              onChange={handleChange}
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
              required
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
            {loading ? "updating..." : "Update task"}
          </Button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default S1_UpdateTasks;
