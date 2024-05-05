

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { FaTasks } from "react-icons/fa";
import manImage from "./images_01/maintain.jpg";
import { HiAnnotation, HiArrowNarrowUp } from "react-icons/hi";
//import { SiGoogletasks } from "react-icons/si";

const DashMaintenance = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks] = useState([]);

  useEffect(() => {
    handleShowAssignments();
  }, [currentUser._id]);

  const handleShowAssignments = async () => {
    try {
      const res = await fetch("/api/taskAssign/all");
      const data = await res.json();
      if (data.success === false) {
        setShowTasksError(true);
        return;
      }
      setShowTasks(data);
    } catch (error) {
      setShowTasksError(true);
    }
  };

  return (
    <div className="p-3 max-w-full mx-auto">
      {/* <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 rounded-md shadow-md w-full">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">
                Total Completed Tasks
              </h3>
              <p className="text-2xl">{}</p>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 rounded-md shadow-md w-full">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">
                Total Pending Tasks
              </h3>
              <p className="text-2xl">{}</p>
            </div>
          </div>
        </div>
      </div> */}

      <div style={{ position: "relative" }}>
        <img
          src={manImage}
          alt=""
          style={{
            position: "absolute",
            backgroundImage: "cover",
            opacity: 0.1,
            zIndex: -1,
          }}
        />
        <div
          className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1 className="text-center mt-7 font-extrabold text-3xl underline text-black dark:text-white">
            Maintenance Management
          </h1>

          <div className="flex gap-5 justify-between mt-5">
            <Button className="rounded-md" gradientDuoTone='purpleToBlue'>
              <Link to="/tasks-table:taskid">Show Assigned Tasks</Link>
            </Button>
            <Button className="rounded-md" gradientDuoTone='purpleToBlue'>
              <Link to="/star-ratingWorkers">Rate the Work Groups</Link>
            </Button>
            <Button className="rounded-md" gradientDuoTone='purpleToBlue'>
              <Link to="/task-tracker">Analyse the tasks</Link>
            </Button>

            <Button className="rounded-md" gradientDuoTone='purpleToBlue'>
              <Link to="/task-estimate">Work Estimation</Link>
            </Button>

            <Button className="rounded-md" gradientDuoTone='purpleToBlue'>
                <Link to="/task-assign" >Go to Task Assign</Link>
            </Button>
          </div>

          {/* <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 mb-6 gap-10">
            <li
              className="group relative w-full border border-teal-500 overflow-hidden rounded-lg sm:w-[330px] transition-all"
              style={{ backgroundColor: "rgba(255, 255, 255, 2.0)" }}
            >
              <Link className="text-slate-700 font-semibold hover:underline truncate flex-1">
                <div className="w-full p-[10px]">
                  <div className="flex items-center space-x-1">
                    <FaTasks className="h-4 w-4 text-blue-500" />
                    
                  </div>
                  <p className="font-semibold text-xl text-slate-700 dark:text-slate-200 truncate">
                    {}
                  </p>
                  <p className="font-semibold text-sm text-slate-400">{}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{}</p>
                  <p className="text-[#457b9d] mt-2 font-semibold">{}</p>
                  <div className="flex items-center mt-[10px] space-x-3">
                    <div className="font-bold text-xs">
                      <p>{}</p>
                    </div>
                    <div className="font-bold text-xs">
                      <p>{}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          </ul> */}
        </div>
      </div>
      
    </div>
  );
};

export default DashMaintenance;

