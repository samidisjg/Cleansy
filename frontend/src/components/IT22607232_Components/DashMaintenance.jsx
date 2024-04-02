import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
("use client");

import { Button } from "flowbite-react";
//import { set } from "mongoose";

const DashMaintenance = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showTasksError, setShowTasksError] = useState(false);


  setShowTasksError(false);
  const handleShowAssignments = async() => {
    try{
      const res = await fetch('/api/taskAssign/all');
      const data = await res.json();
      if (data.success === false){
        setShowTasksError(true);
        return;
      }

    }catch(error){
      setShowTasksError(true);
    }
  }
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

          <button onClick={handleShowAssignments} className='text-green-700 w-full'>Show Task Assignments</button>
          <p className='text-red-700-mt-5'>{showTasksError ? 'Error fetching tasks' : ''}</p>
        </div>
      )}
    </div>
  );
};

export default DashMaintenance;
