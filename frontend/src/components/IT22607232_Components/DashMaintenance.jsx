import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';

const DashMaintenance = () => {
  const {currentUser } = useSelector((state) => state.user);
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleShowAssignments = async () => {
    try {
      setShowTasksError(false);
      const res = await fetch('/api/taskAssign/all');
      const data = await res.json();
      if (data.success === false) {
        setShowTasksError(true);
        return;
      }
      setShowTasks(data);
      // Navigate to tasks table page
      navigate('/tasks-table'); // Redirect to tasks table page
    } catch (error) {
      setShowTasksError(true);
    }
  };

  return (
    <div>
      {currentUser.isFacilityAdmin && (
        <div>
          <h1>Tasks assign</h1>
          <p>Manage Maintenance tasks</p>

          <div className="flex flex-wrap gap-2"></div>
          <Button pill>
            <Link to="/task-assign">Go to Task Assign</Link>
          </Button>
          <br/>
          
          <Button pill onClick={handleShowAssignments}>Show Task Assignments</Button>
          <p className='text-red-700 mt-5'>{showTasksError ? 'Error fetching tasks' : ''}</p>

          {showTasks && showTasks.length > 0 && 
            showTasks.map((tasks) => (
              <div key={tasks._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
                <Link className='text-slate-700 font-semibold hover:underline truncate flex-1' to={`/tasks-table/${tasks._id}`}>
                  <p>{tasks.TaskID}</p>
                </Link>

                <div className='flex flex-row items-center'>
                  <button className='bg-red-500 text-white px-2 py-0.5 rounded-lg'>Delete</button>
                  <button className='bg-green-500 text-white px-2 py-0.5 rounded-lg'>Update</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashMaintenance;
