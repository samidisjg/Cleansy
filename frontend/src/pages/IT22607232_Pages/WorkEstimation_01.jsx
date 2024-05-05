import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const generateTaskID = () => `TID-${Math.floor(10000 + Math.random() * 90000)}`;

const WorkEstimation_01 = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
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
      if (e.target.type === "number" || e.target.type === "text") {
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

      const res = await fetch("/api/workEstimation/estimate", {
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
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        toast.error("Error generating estimation")
      }else {
        toast.success("Work estimation generated successfully")
        // Reset form state
        setFormData({
          TaskID: generateTaskID(),
          DurationDays: "2",
          Category: "",
          Size: "",
          Complexity: "",
        });
      }
      navigate("/task-estimate");
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

  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
        Work Estimation Generation
      </h1>
      <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full justify-center"
        >
          <div>
            <Label value="TaskID" />

            <TextInput
              name="TaskID"
              type="text"
              placeholder="TaskID"
              required
              onChange={handleChange}
              value={formData.TaskID}
              readOnly
            />
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
            <Select
              name="Category"
              onChange={(e) =>
                setFormData({ ...formData, Category: e.target.value })
              }
            >
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
            <Select
              name="Complexity"
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
          <Button type="submit"
            gradientDuoTone="purpleToBlue"
            className="uppercase">
              <Link to="/estimation">View Estimation</Link>
            </Button>
        </form>
      </div>
    </div>
  );
};

export default WorkEstimation_01;