import React from 'react';
import { Button } from "flowbite-react";
import { toast } from 'react-toastify';

const RequestDetails_04 = ({ request, showDetails, onDeleteRequest }) => {
    if (!request || !showDetails) {
        return null; // Return null to hide the component when showDetails is false
    }
    // Destructure request details from props
    const { _id, staffName, email, phoneNo, leaveType, startDate, endDate, startTime, endTime, comments, status } = request;
    
    //function to delete a leave request
    const handleDeleteRequest = async (requestId) => {
        // Display confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this request?");
        if (!confirmDelete) {
            return; // If user cancels deletion, exit function
        }
    
        try {
            const res = await fetch(`/api/RequestLeave/delete_04/${requestId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                // Update UI to remove the deleted request from the list
                setLeaveRequestList(prevList => prevList.filter(request => request._id !== requestId));
                toast.success("Request deleted successfully.");
            } else {
                // Handle error response
                const errorData = await res.json();
                toast.error(errorData.message || "Failed to delete request.");
            }
        } catch (error) {
            // Handle network or other errors
            toast.error("An error occurred while deleting request.");
        }
    };
    

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
                <tbody>
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
                        <td className="py-2 px-4">{status}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4">
                            <Button gradientDuoTone='purpleToBlue' className="mr-2" style={{ width: "100px" }}>
                                Edit
                            </Button>
                        </td>
                        <td>
                            <Button gradientDuoTone='purpleToBlue' style={{ width: "100px" }} onClick={() => handleDeleteRequest(_id)}>
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
