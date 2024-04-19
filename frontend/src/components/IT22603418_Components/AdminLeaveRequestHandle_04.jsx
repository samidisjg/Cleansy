import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminLeaveRequests_04 from "./AdminLeaveRequests_04";

const AdminLeaveRequestHandle_04 = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch leave requests from the server
    const fetchLeaveRequests = async () => {
      try {
        const res = await fetch("/api/RequestLeave/get_04");
        if (res.ok) {
          const data = await res.json();
          setLeaveRequests(data);
        } else {
          toast.error("Failed to fetch leave requests");
        }
      } catch (error) {
        toast.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  // Function to handle accepting a leave request
  const handleAccept = async (requestId) => {
    try {
      const res = await fetch(`/api/RequestLeave/${requestId}/accept`, {
        method: "PUT",
      });
      if (res.ok) {
        // Update leave request status in the UI
        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "accepted" }
              : request
          )
        );
      } else {
        toast.error("Failed to accept leave request");
      }
    } catch (error) {
      toast.error("Error accepting leave request:", error);
    }
  };

  // Function to handle denying a leave request
  const handleDeny = async (requestId) => {
    try {
      const res = await fetch(`/api/RequestLeave/${requestId}/deny`, {
        method: "PUT",
      });
      if (res.ok) {
        // Update leave request status in the UI
        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "denied" }
              : request
          )
        );
      } else {
        toast.error("Failed to deny leave request");
      }
    } catch (error) {
      toast.error("Error denying leave request:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Leave Requests
      </h1>

      <table>
        <thead>
          <tr>
            <th className="py-2 px-4 font-semibold">#</th>
            <th className="py-2 px-4 font-semibold">Request ID</th>
            <th className="py-2 px-4 font-semibold">Staff ID</th>
            <th className="py-2 px-4 font-semibold">Leave Type</th>
            <td className="py-2 px-4 font-semibold">Duration</td>
            <th className="py-2 px-4 font-semibold">Status</th>
            <th className="py-2 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            <AdminLeaveRequests_04
              key={request._id}
              index={index + 1} // Add 1 to start numbering from 1
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

export default AdminLeaveRequestHandle_04;
