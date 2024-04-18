import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import LeaveRequestItem_04 from './LeaveRequestItem_04'; // Assuming you have a component to display individual leave requests

const StaffAdminDash_04 = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const res = await fetch(`/api/RequestLeave`);
                const data = await res.json();
                if (res.ok) {
                    setLeaveRequests(data);
                } else {
                    toast.error("Failed to fetch leave requests.");
                }
            } catch (error) {
                //toast.error("An error occurred while fetching leave requests.");
            }
        };

        fetchLeaveRequests();
    }, []);

    const handleApprove = async (requestId) => {
        // Send request to backend to approve the leave request
    };

    const handleDeny = async (requestId) => {
        // Send request to backend to deny the leave request
    };

    return (
        <div>
          <h1 className="text-3xl font-semibold mb-4">Staff Admin Dashboard</h1>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Request ID</th>
                <th className="border border-gray-300 px-4 py-2">Staff ID</th>
                <th className="border border-gray-300 px-4 py-2">Leave Type</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <LeaveRequestItem_04
                  key={request._id}
                  request={request}
                  onAccept={handleAccept}
                  onDeny={handleDeny}
                />
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default StaffAdminDash_04;
