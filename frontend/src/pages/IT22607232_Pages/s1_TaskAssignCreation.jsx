import  { useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  Datepicker,
} from "flowbite-react";



const TaskAssign = () => {

  const {currentUser} = useSelector(state => state.user);
  const [formData, setFormData] = useState({

    taskId: "",
    category: "",
    name: "",
    description: "",
    workGroupId: "",
    date: "",
    location: "",
    duration: ""
  });
  const [setLoading] = useState(false);
  const [setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/taskassign/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
         //currentUser holds task data
          id: currentUser._id,
        })
      })
      
      navigate(`/dashboard?tab=maintenance`)

      const data = await res.json();

      setLoading(false);
      if (!data.success) {
        setError(data.message);
      } else {
        setFormData({
          taskId: "",
          category: "",
          name: "",
          description: "",
          workGroupId: "",
          date: "",
          location: "",
          duration: ""
        });
        alert("Task assigned successfully!");
        // Navigate or handle success appropriately
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error("Error:", error);
      alert("Error assigning task. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
        Assign Tasks
      </h1>
      <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full justify-center">
          <div>
            <Label value="TaskID" />
            <TextInput type="text" name="taskId"  onChange = {handleChange}  value={formData.taskId} placeholder="TaskID" />
          </div>
          <div>
            <Label value="category"/>
            <Select  onChange = {handleChange} value={formData.category}>
              <option value="Select">Select a Category</option>
              <option value="Male">Elavator</option>
              <option value="Female">Pest Control</option>
              <option value="Female">Janitorial</option>
            </Select>
          </div>

          <div>
            <Label value="Name" />
            <TextInput type="name" name= "name" onChange = {handleChange} value={formData.name}placeholder="Name" />
          </div>
          <div>
            <Label value="Description"/>
            <Textarea name = "description"  onChange = {handleChange} value={formData.description} 
              placeholder="Add a Description..."
              rows="3"
              maxLength="200"
            />
          </div>
          <div>
            <div>
              <Label value="WorkGroupID" />
              <TextInput  ype="WorkGroupID" name ="workGroupId" onChange = {handleChange}  value={formData.workGroupId}  placeholder="WorkGroupID" />
            </div>
            <div>
            <Label value="Date" />
              <Datepicker name = "date" value={formData.date} onChange = {handleChange} 
                minDate={new Date(2024, 0, 1)}
                maxDate={new Date(2024, 3, 30)}
              />
                <div>
            <Label value="Location"   />
            <TextInput type="location" name = "location" onChange = {handleChange}  placeholder="Location"  value={formData.location} />
          </div>
          <div>
            <Label value="Duration" />
            <TextInput type="Duration"  name = "duration" onChange = {handleChange}   value={formData.duration}  placeholder="Duration" />
          </div>

            </div>
          </div>

         
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Assign
          </Button>
        </form>
      </div>
    </div>
  );
  }

export default TaskAssign;
