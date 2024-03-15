import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
  Datepicker,
} from "flowbite-react";
import { Link } from "react-router-dom";
("use client");

const TaskAssign = () => {
  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
        Assign Tasks
      </h1>
      <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
        <form className="flex flex-col gap-4 w-full justify-center">
          <div>
            <Label value="TaskID" />
            <TextInput type="text" placeholder="TaskID" />
          </div>
          <div>
            <Label value="Category" />
            <Select>
              <option value="Select">Select a Category</option>
              <option value="Male">Elavator</option>
              <option value="Female">Pest Control</option>
              <option value="Female">Janitorial</option>
            </Select>
          </div>

          <div>
            <Label value="Name" />
            <TextInput type="Name" placeholder="Name" />
          </div>
          <div>
            <Label value="Description" />
            <Textarea
              placeholder="Add a Description..."
              rows="3"
              maxLength="200"
            />
          </div>
          <div>
            <div>
              <Label value="WorkGroupID" />
              <TextInput type="WorkGroupID" placeholder="WorkGroupID" />
            </div>
            <div>
            <Label value="Date" />
              <Datepicker
                minDate={new Date(2024, 0, 1)}
                maxDate={new Date(2024, 3, 30)}
              />
                <div>
            <Label value="Location" />
            <TextInput type="Location" placeholder="Location" />
          </div>
          <div>
            <Label value="Duration" />
            <TextInput type="Duration" placeholder="Duration" />
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
};

export default TaskAssign;
