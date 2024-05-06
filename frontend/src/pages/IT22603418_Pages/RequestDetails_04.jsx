import React from "react";
import { Button } from "flowbite-react";

const RequestDetails_04 = ({
  request,
  showDetails,
  onDeleteRequest,
  onEditAction,
}) => {
  if (!request || !showDetails) {
    return null; // Return null to hide the component when showDetails is false
  }

  // Destructure request details from props
  const {
    staffID,
    _id,
    staffName,
    email,
    phoneNo,
    leaveType,
    startDate,
    endDate,
    startTime,
    endTime,
    comments,
    status,
  } = request;

  // Function to delete a leave request
  const handleDeleteRequest = async () => {
    onDeleteRequest(_id); // Invoke onDeleteRequest with the request ID
  };

  // Define CSS classes based on the status
  const statusClass =
    status === "accepted"
      ? "text-green-700 font-bold"
      : status === "denied"
      ? "text-red-700 font-bold"
      : "";

  // Define whether edit and delete buttons should be disabled
  const isDisabled = status === "accepted" || status === "denied";

  return (
    <div className="max-w-md mx-auto border border-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Staff ID:</td>
            <td className="py-2 px-4">{staffID}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Request ID:</td>
            <td className="py-2 px-4">{_id}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Staff Name:</td>
            <td className="py-2 px-4">{staffName}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Email:</td>
            <td className="py-2 px-4">{email}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Phone No:</td>
            <td className="py-2 px-4">{phoneNo}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Leave Type:</td>
            <td className="py-2 px-4">{leaveType}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Start Date:</td>
            <td className="py-2 px-4">{startDate}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">End Date:</td>
            <td className="py-2 px-4">{endDate}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Start Time:</td>
            <td className="py-2 px-4">{startTime}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">End Time:</td>
            <td className="py-2 px-4">{endTime}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Comments:</td>
            <td className="py-2 px-4">{comments}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-semibold">Status:</td>
            <td className={`py-2 px-4 ${statusClass}`}>{status}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">
              <Button
                gradientDuoTone="purpleToBlue"
                className="mr-2"
                style={{ width: "100px" }}
                onClick={() => onEditAction(request)}
                disabled={isDisabled} // Disable the button based on status
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                gradientDuoTone="pinkToOrange"
                style={{ width: "100px" }}
                onClick={() => handleDeleteRequest(_id)}
                disabled={isDisabled} // Disable the button based on status
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RequestDetails_04;
