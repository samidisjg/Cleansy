
import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const s1_UpdateTasks = () => {
  const [formData, setFormData] = useState({
    TaskID: "",
    Category: "",
    Name: "",
    Description: "",
    WorkGroupID: "",
    Location: "",
    DurationDays: "2",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const { TaskID } = useParams()
  const { currentUser} = useSelector((state) => state.user);


   useEffect(() => {
      try {
         const fetchtasks = async () => {
            const res = await fetch(`/api/update-tasks:taskid=${TaskID}`);
            const data = await res.json();
            if(!res.ok) {
               console.log(data.message);
               setError(data.message);
               return;
            }
            if(res.ok) {
               setError(null);
               setFormData(data.tasks[0]);
            }
         }
         fetchtasks();
      } catch (error) {
         console.log(error);
      }
   }, [resourceId])

   const handleChange = (e) => {
      let boolean = null;
      if(e.target.value === "true") {
         boolean = true;
      }
      if(e.target.value === "false") {
         boolean = false;
      }
      if(!e.target.files) {
         setFormData((prevState) => ({
            ...prevState, [e.target.id]: boolean ?? e.target.value
         }))
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await fetch(`/api/taskAssign/update/:taskid=/${formData._id}/${currentUser._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
         })
         const data = await res.json();
         if(!res.ok) {
            setError(data.message);
            return;
         }
         if(res.ok) {
            setError(null);
            navigate(`/dashboard?tab=maintenance`)
         }
      } catch (error) {
         setError('Failed to assign tasks. Please try again later.');
         console.log(error);
      }
   }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">Update Assigned Tasks</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
         <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type="text" onChange={handleChange}  value={formData.title} placeholder="Title" required id="title" className="flex-1"/>
            <Select className="" onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.Category}>
            <option value="Select">Select a Category</option>
              <option value="Elavator">Elavator</option>
              <option value="Pest Control">Pest Control</option>
              <option value="Janitorial">Janitorial</option>
            </Select>
         </div>
         
            
         <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type="text" onChange={handleChange} value={formData.TaskID} id="TaskID" placeholder="TaskID" className="w-[50%]" required />
            
         </div>
         <Textarea type="text" onChange={handleChange} value={formData.Description} placeholder='Add a Description...' rows='3' maxLength='500' id="description" required />
         
        
        
         <Button type="submit" gradientDuoTone='purpleToBlue' className="uppercase" >Update Assighned Tasks</Button>
         {
            error && (
               <Alert className='mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce'>{error}</Alert>
            )
         }
      </form>
    </div>
  )
}

export default s1_UpdateTasks