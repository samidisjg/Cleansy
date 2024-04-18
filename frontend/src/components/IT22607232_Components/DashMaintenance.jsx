import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";

const DashMaintenance = () => {
  const { currentUser } = useSelector((state) => state.user);

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
          <br />

          <div className="flex flex-wrap gap-2"></div>
          <Button pill>
            <Link to="/tasks-table:taskid">Show Assigned Tasks</Link>
          </Button>
          <br />

          <div className="flex flex-wrap gap-2"></div>
          <Button pill>
            <Link to="/star-ratingWorkers">Rate the Work Groups</Link>
          </Button>
          <br />
        </div>

        

        

      )}
    </div>
  );
};

export default DashMaintenance;
