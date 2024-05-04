import React, { useState } from "react";
import { Button } from "flowbite-react";

const AdminStaffRegisterView_04 = ({ index, request, onApprove, onReject }) => {
  const { _id, staffID, staffName, email, phoneNo, nic, imageURL, status } =
    request;

  // Function to handle accepting a leave request
  const handleApprove = (id) => {
    console.log(id);
    onApprove(id);
  };

  // Function to handle denying a leave request
  const handleReject = (id) => {
    onReject(id);
  };

  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2">{index}</td>
      <td className="border border-gray-300 px-4 py-2">{_id}</td>
      <td className="border border-gray-300 px-4 py-2">{staffID}</td>
      <td className="border border-gray-300 px-4 py-2">{staffName}</td>
      <td className="border border-gray-300 px-4 py-2">{email}</td>
      <td className="border border-gray-300 px-4 py-2">{phoneNo}</td>
      <td className="border border-gray-300 px-4 py-2">{nic}</td>
      <td className="border border-gray-300 px-4 py-2">
        <img src={imageURL} alt="Staff Image" style={{ maxWidth: "100px" }} />
      </td>
      <td className="border border-gray-300 px-4 py-2">{status}</td>
      <td className="border border-gray-300 px-8 py-2">
        <div className="flex flex-row md-2">
          <Button
            className="text-sm m-2 bg-green-600"
            onClick={() => handleApprove(staffID)}
          >
            Approve
          </Button>
          <Button
            className="text-sm m-2 bg-red-800"
            onClick={() => handleReject(staffID)}
          >
            Reject
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default AdminStaffRegisterView_04;
