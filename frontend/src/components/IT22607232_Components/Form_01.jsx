import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Label, Select, TextInput } from "flowbite-react";
import List_01 from "./List_01";

export default function Form_01() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    TaskID: "",
    type: "",
    NumTasks: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.TaskID === currentUser.TaskID) {
        setError("TaskID already exists");
        return;
      }
      setLoading(true);
      setError(null);

      const res = await fetch("api/taskAnalysis/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const responseData = await res.json();
      setLoading(false);
      if (responseData.success === false) {
        setError(responseData.message);
        return;
      }
      //navigate(`/task-assign/${responseData._id}`);
      navigate("/dashboard?tab=maintenance");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Task Analysis</h1>
      <form id="form" onSubmit={handleSubmit}>
        <div className="grid gap-4">
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
              className="form-input"
              onChange={handleChange}
              name="type"
              value={formData.type}
            >
              <option value="Select">Select a Category</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Inprogress">Inprogress</option>
            </Select>
          </div>
          <div>
            <Label value="Number of Tasks" />
            <TextInput
              type="number"
              name="NumTasks"
              placeholder="# of Tasks"
              required
              onChange={handleChange}
              value={formData.NumTasks}
            />
          </div>
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            className="uppercase"
          >
            {loading ? "Analyzing..." : "Analyse tasks"}
          </Button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
      <List_01 />
    </div>
  );
}
