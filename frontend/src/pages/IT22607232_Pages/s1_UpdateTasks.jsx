
import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react"
import { useEffect, useState } from "react"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
            <TextInput type="number" onChange={handleChange} value={formData.condition} id="condition" placeholder="Condition" min='1' max='100' className="w-[50%]" required />
         </div>
         <Textarea type="text" onChange={handleChange} value={formData.description} placeholder='Add a Description...' rows='3' maxLength='500' id="description" required />
         <p className='text-lg font-semibold'>Sell / Rent</p>
         <div className="flex">
            <button type='button' id='type'  onClick={handleChange} value="sale" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${formData.type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"}`}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
               Sell
            </button>
            <button type='button' id='type'  onClick={handleChange} value="rent" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${formData.type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"}`}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
               Rent
            </button>
         </div>
         <p className='text-lg font-semibold'>Offer</p>
         <div className="flex">
            <button type='button' id='offer'onClick={handleChange} value={true}  className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!formData.offer ? "bg-white text-black" : "bg-slate-600 text-white"} `}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  Yes
            </button>
            <button type='button' id='offer' onClick={handleChange} value={false} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${formData.offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  No
            </button>
         </div>
         <div className="flex items-center gap-2">
            <TextInput type="number" onChange={handleChange} value={formData.regularPrice} id="regularPrice" min='25' max='10000000' className="w-[50%]" required />
            <div>
               <p className="font-semibold">Regular Price</p>
               <span className="text-xs">($ / month)</span>
            </div>
         </div>
         {
            formData.offer && (
               <div className="flex items-center gap-2">
                  <TextInput type="number" onChange={handleChange} value={formData.discountPrice} id="discountPrice" min='0' max='10000000' className="w-[50%]" required />
                  <div>
                     <p className="font-semibold">Discount Price</p>
                     <span className="text-xs">($ / month)</span>
                  </div>
               </div>
            )
         }
         <Button type="submit" gradientDuoTone='purpleToBlue' className="uppercase" >Update Shared Resource Listing</Button>
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