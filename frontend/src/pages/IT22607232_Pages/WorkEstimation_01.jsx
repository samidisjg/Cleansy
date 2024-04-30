import React, { useState } from "react";
import { Button, Checkbox, FileInput, Label, Select, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const generateTaskID = () => `TID-${Math.floor(10000 + Math.random() * 90000)}`;

const WorkEstimation_01 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    TaskID: generateTaskID(),
    DurationDays: "2",
    Category: "",
    Size: "",
    Complexity: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      // Calculate total cost based on formData
      const { DurationDays, Complexity } = formData;
      const size = DurationDays * Complexity; // Adjust this calculation according to your requirement
      const totalCost = size * 100; // Assuming $100 per unit of size

      // Send the form data along with the generated TaskID and calculated totalCost to the backend
      const res = await fetch("/api/workEstimation/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalCost,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      // Navigate based on the response from the backend
      navigate("/dashboard?tab=maintenance");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
        Work Estimation Generation
      </h1>
      <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full justify-center">
          <div>
            <Label value="TaskID" />

            <TextInput name="TaskID" type="text" placeholder="TaskID" 
             required
             onChange={handleChange}
             value={formData.TaskID}
             readOnly/>
          </div>
          <div>
            <Label value="Duration" />
            <TextInput
              name="DurationDays"
              type="number"
              placeholder="Duration"
              required
                  onChange={handleChange}
                  value={formData.DurationDays}
            />
          </div>
          <div>
            <Label value="Category" />
            <Select name="Category"
             onChange={(e) =>
              setFormData({ ...formData, Category: e.target.value })
            }>
              <option value="Select">Select a Category</option>
              <option value="Pest-control">Pest-control</option>
              <option value="Elevator">Elevator</option>
              <option value="Janitorial">Janitorial</option>
            </Select>
          </div>

          <div>
            <Label value="size of the ground if need" />
            <TextInput
              name="Size"
              type="number"
              placeholder="Size in sq feet"
                  onChange={handleChange}
                  value={formData.Size}
            />
          </div>

          <div>
            <Label value="Complexity" />
            <Select name="complexity"
             onChange={(e) =>
              setFormData({ ...formData, Complexity: e.target.value })
            }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </div>

          <div>
            <Label value="Upload a Documnet" />
            <FileInput type="file" accept="image/*" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link
                href="#"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            className="uppercase"
          >
            {loading ? "Generating..." : "Generate Estimation"}
          </Button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default WorkEstimation_01;
