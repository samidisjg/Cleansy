import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

const CreateServiceListing1 = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    serviceID: "",
      serviceName: "",
      serviceDescription: "",
      servicePrice: "",
      serviceType: "",
      serviceImageUrls: [],
      serviceAvailability: true,
      serviceContactInfo: {
        phone: "",
        email: "",
        address: "",
      },
      serviceRequirements: [],
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(formData.Serviceid === currentUser.Serviceid) return setError('TaskID already exists');
      setLoading(true);
      setError(false);

      const res = await fetch('/api/serviceListing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
      }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false){
        setError(data.message);
      }
        //navigate(`/task-assign/${data._id}`);
        navigate('/dashboard?tab=services');

        
    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <main>
        <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
          Assign Tasks
        </h1>
      </main>
      <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
        <form  onSubmit = {handleSubmit} className="flex flex-col gap-4 w-full justify-center">
          <div>
            <Label value="TaskID" />
            <TextInput
              type="text"
              name="TaskID"
              placeholder="TaskID"
              required
              onChange={handleChange}
              value={formData.TaskID}
            />
          </div>
          <div>
            <Label value="Category" />
            <Select 
             className="" onChange={(e) => setFormData({...formData, Category: e.target.value})}
            >
              <option value="Select">Select a Category</option>
              <option value="Elavator">Elavator</option>
              <option value="Pest Control">Pest Control</option>
              <option value="Janitorial">Janitorial</option>
            </Select>
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
          >{loading ? 'Assigning...' : 'Assign task'}</Button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default CreateServiceListing1;
