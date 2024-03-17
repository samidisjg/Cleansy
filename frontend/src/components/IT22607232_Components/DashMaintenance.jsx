import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const DashMaintenance = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div>
            {currentUser.isFacilityAdmin && (
                <div>
                    <h1>Tasks assign</h1>
                    <p>Manage Maintenance tasks</p>
                    <Link to="/task-assign">Go to Task Assign</Link>
                </div>
            )}
        </div>
    );
}

export default DashMaintenance;



