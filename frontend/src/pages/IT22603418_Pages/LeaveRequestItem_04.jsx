import React from 'react';

const LeaveRequestItem_04 = ({ request, onAccept, onDeny }) => {
  const { _id, staffID, leaveType, status } = request; // Destructure properties from request object

  // Function to handle accepting a leave request
  const handleAccept = () => {
    onAccept(_id);
  };

  // Function to handle denying a leave request
  const handleDeny = () => {
    onDeny(_id);
  };

  // Function to handle viewing more details of a leave request
  const handleViewMore = () => {
    // Implement logic to view more details of the leave request
    console.log('View more clicked');
  };

  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2">{_id}</td>
      <td className="border border-gray-300 px-4 py-2">{staffID}</td>
      <td className="border border-gray-300 px-4 py-2">{leaveType}</td>
      <td className="border border-gray-300 px-4 py-2">{status}</td>
      <td className="border border-gray-300 px-4 py-2">
        <button className="mr-2" onClick={handleViewMore}>View More</button>
        <button className="mr-2" onClick={handleAccept}>Accept</button>
        <button onClick={handleDeny}>Deny</button>
      </td>
    </tr>
  );
};

export default LeaveRequestItem_04;
