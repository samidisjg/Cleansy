import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
("use client");

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
        </div>
      )}
    </div>
  );
};

export default DashMaintenance;
