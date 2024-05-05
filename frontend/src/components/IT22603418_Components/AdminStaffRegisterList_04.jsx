import React, { useState, useEffect } from "react";
import AdminStaffRegisterView_04 from "./AdminStaffRegisterView_04";
import { toast } from "react-toastify";

const AdminStaffRegisterList_04 = () => {
  const [staffRegisters, setStaffRegisters] = useState([]);

  useEffect(() => {
    // Fetch StaffRegister data from the backend when the component mounts
    const fetchStaffRegisters = async () => {
      try {
        const response = await fetch("/api/StaffRegister/getAll");
        if (response.ok) {
          const data = await response.json();
          setStaffRegisters(data);
        } else {
          console.error("Failed to fetch staff registers");
        }
      } catch (error) {
        console.error("Error fetching staff registers:", error);
      }
    };

    fetchStaffRegisters();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const response = await fetch(`/api/StaffRegister/${requestId}/approve`, {
        method: "PUT",
      });
      if (response.ok) {
        // Update Staff Register request status in the UI
        setStaffRegisters((prevRequests) =>
          prevRequests.map((request) =>
            request.staffID === requestId
              ? { ...request, status: "approved" }
              : request
          )
        );

        console.log(staffRegisters[0].staffID);
        // Update user collection's isStaff field
        const userResponse = await fetch(`/api/user/${requestId}/makeStaff`, {
          method: "PUT",
        });
        if (!userResponse.ok) {
          console.error("Failed to update user collection");
        }
      } else {
        toast.error("Failed to accept Staff Register request");
      }
    } catch (error) {
      toast.error("Error accepting Staff Register request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      console.log(requestId);
      const response = await fetch(`/api/StaffRegister/${requestId}/reject`, {
        method: "PUT",
      });
      console.log(requestId);
      if (response.ok) {
        // Update Staff Register request status in the UI
        setStaffRegisters((prevRequests) =>
          prevRequests.map((request) =>
            request.staffID === requestId
              ? { ...request, status: "rejected" }
              : request
          )
        );

        // Update user collection's isStaff field
        const userResponse = await fetch(`/api/user/${requestId}/removeStaff`, {
          method: "PUT",
        });
        if (!userResponse.ok) {
          console.error("Failed to update user collection");
        }
      } else {
        toast.error("Failed to deny Staff Register request");
      }
    } catch (error) {
      toast.error("Error denying Staff Register request:", error);
    }
  };

  return (
    <div className="mx-auto p-3 w-full overflow-x-auto">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Staff Registration Requests
      </h1>
      <div className="w-full mx-auto" style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th className="font-semibold">#</th>
              <th className="font-semibold">Register ID</th>
              <th className="font-semibold">Staff ID</th>
              <th className="font-semibold">Staff Name</th>
              <th className="font-semibold">Email</th>
              <th className="font-semibold">Phone No</th>
              <th className="font-semibold">NIC</th>
              <th className="font-semibold">Staff Image</th>
              <th className="font-semibold">Status</th>
              <th className="font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffRegisters.map((request, index) => (
              <AdminStaffRegisterView_04
                key={request._id}
                index={index + 1}
                request={request}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStaffRegisterList_04;
