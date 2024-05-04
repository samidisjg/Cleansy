import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import RequestDetails_04 from "./RequestDetails_04";

const RequestLeave_04 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    staffName: currentUser.username,
    email: currentUser.email,
    phoneNo: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    comments: "",
    status: "pending review",
  });
  const {
    staffID,
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
  } = formData;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ShowRequestError, setShowRequestError] = useState(false);
  const [selectedOption, setSelectedOption] = useState("date"); // Initialize state for selected option
  const [LeaveRequestList, setLeaveRequestList] = useState([]);
  const [showRequests, setShowRequests] = useState(false); // State variable to track visibility of requests
  // Add state variables for edit mode and operation
  const [editMode, setEditMode] = useState(false);
  const [operation, setOperation] = useState("create");
  //count of request
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const fetchRequestCounts = async () => {
      try {
        const res = await fetch(
          `/api/RequestLeave/count_04/${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setRequestCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching request counts:", error);
      }
    };

    fetchRequestCounts();
  }, [currentUser._id]);

  //validation for date pick
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // If start date is being changed, update the minimum value for the end date
    if (id === "startDate") {
      setFormData({
        ...formData,
        [id]: value,
        endDate: value, // Reset end date to start date if end date is prior to start date
      });
    }
  };

  //date and time option change in request form
  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    if (selected === "date") {
      setFormData({
        ...formData,
      });
    } else {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

      setFormData({
        ...formData,
        startDate: formattedDate,
        endDate: formattedDate,
        startTime: "",
        endTime: "",
      });
    }
  };

  //function to View Details
  const handleViewRequests = async (e) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`/api/RequestLeave/get_04/${currentUser._id}`);
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      if (res.status === 200) {
        setLeaveRequestList(data); // Update LeaveRequestList state with fetched data
        setRequestCount(data.length); // Update request count
        toast.success("Requests loaded successfully.");
      } else if (res.status === 404) {
        setRequestCount(data.length); // Set request count to 0 if no requests found
        toast.error("No request leave entries found for this staffID");
      } else {
        toast.error("An error occurred while loading requests.");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  // Function to toggle visibility of requests
  const toggleShowRequests = () => {
    if (!showRequests) {
      handleViewRequests();
    }
    setShowRequests(!showRequests);
  };

  // Function to handle deletion of a leave request
  const handleDeleteRequest = async (requestId) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmDelete) {
      return; // If user cancels deletion, exit function
    }

    try {
      const res = await fetch(`/api/RequestLeave/delete_04/${requestId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Remove the deleted request from the list
        setLeaveRequestList((prevList) =>
          prevList.filter((request) => request._id !== requestId)
        );
        setRequestCount((prevCount) => prevCount - 1); // Update request count
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

  // handleSubmit to handle both create and update operations
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Fields validation
    if (!formData.phoneNo || !formData.leaveType) {
      toast.error("Please fill out all the fields");
      return;
    }
    // Phone number validation
    if (formData.phoneNo.length !== 10 || isNaN(formData.phoneNo)) {
      toast.error("Phone number should have 10 digits");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const url =
        operation === "create"
          ? "/api/RequestLeave/create_04"
          : `/api/RequestLeave/update_04/${formData._id}`;
      const method = operation === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          staffID: currentUser._id,
          staffName: currentUser.staffName,
          email: currentUser.email,
          ...formData,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      if (res.status === 201 || res.status === 200) {
        // Fetch the updated request count
        const countRes = await fetch(
          `/api/RequestLeave/count_04/${currentUser._id}`
        );
        const countData = await countRes.json();
        if (countRes.ok) {
          // Update the request count
          setRequestCount(countData.count);
        }

        toast.success(
          operation === "create"
            ? "Leave Request Created Successfully"
            : "Leave Request Updated Successfully"
        );
        // Clear the form data after successful submission
        setFormData({
          staffName: currentUser.username,
          email: currentUser.email,
          phoneNo: "",
          leaveType: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          comments: "",
        });
      }
      // Refresh the request list if updating a request
      if (operation !== "create") {
        handleViewRequests();
      } else {
        // Update the list of leave requests with the new data
        setLeaveRequestList((prevList) => {
          const index = prevList.findIndex((item) => item._id === formData._id);
          if (index !== -1) {
            const updatedList = [...prevList];
            updatedList[index] = { ...formData };
            return updatedList;
          } else {
            return prevList;
          }
        });
      }
      // Exit edit mode
      setEditMode(false);
      setOperation("create");
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  // handleEditAction to set the form data and switch to edit mode
  const handleEditAction = (requestData) => {
    setFormData({ ...requestData });
    setEditMode(true);
    setOperation("update");
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Leave Request Form
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label value="Staff ID" />
          <TextInput
            type="text"
            id="staffID"
            placeholder={currentUser._id}
            value={staffID}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <Label value="Staff Name" />
          <TextInput
            type="text"
            id="staffName"
            placeholder={currentUser.username}
            value={staffName}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <Label value="Email" />
          <TextInput
            type="email"
            id="email"
            placeholder={currentUser.email}
            disabled
            onChange={handleChange}
            value={email}
          />
        </div>
        <div>
          <Label value="Phone No" />
          <TextInput
            type="text"
            id="phoneNo"
            placeholder="Phone No"
            required
            onChange={handleChange}
            value={phoneNo}
          />
        </div>
        <div>
          <h2 className="text-2xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
            Details of Leave
          </h2>
        </div>
        <div>
          <Label value="Leave Type" />
          <Select
            id="leaveType"
            required
            onChange={handleChange}
            value={leaveType}
          >
            <option value="">Select</option>
            <option value="Sick">Sick</option>
            <option value="Vacation">Vacation</option>
            <option value="ShortLeave">Short Leave</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div className="flex gap-28">
          <div>
            <Label value="Leave Request For" />{" "}
          </div>
          <div>
            <Label value="Days" />
            <TextInput
              type="radio"
              id="dateOption"
              value="date"
              checked={selectedOption === "date"}
              onChange={handleOptionChange}
              required
            />
          </div>
          <div>
            <Label value="Hours" />
            <TextInput
              type="radio"
              id="timeOption"
              value="time"
              checked={selectedOption === "time"}
              onChange={handleOptionChange}
              required
            />
          </div>
        </div>
        {selectedOption === "date" ? (
          <>
            <div className="flex gap-32">
              <div>
                <Label value="Start Date" />
                <TextInput
                  type="date"
                  id="startDate"
                  required
                  onChange={handleChange}
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label value="End Date" />
                <TextInput
                  type="date"
                  id="endDate"
                  required
                  onChange={handleChange}
                  value={endDate}
                  min={startDate}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-44">
              <div>
                <Label value="Start Time" />
                <TextInput
                  type="time"
                  id="startTime"
                  required
                  onChange={handleChange}
                  value={startTime}
                />
              </div>
              <div>
                <Label value="End Time" />
                <TextInput
                  type="time"
                  id="endTime"
                  required
                  onChange={handleChange}
                  value={endTime}
                />
              </div>
            </div>
          </>
        )}
        <div>
          <Label value="Comments" />
          <Textarea
            id="comments"
            placeholder="Type here..."
            rows="3"
            maxLength="200"
            onChange={handleChange}
            value={comments}
          />
        </div>

        <Button
          type="submit"
          gradientDuoTone={editMode ? "pinkToOrange" : "purpleToBlue"}
        >
          {editMode ? "Update Request" : "Request Leave"}
        </Button>
        <Button gradientDuoTone="purpleToBlue" onClick={toggleShowRequests}>
          {showRequests
            ? `Hide Requests (${requestCount || 0})`
            : `View Requests (${requestCount || 0})`}
        </Button>

        {ShowRequestError && (
          <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">
            {errorMessageText}
          </Alert>
        )}
        {showRequests &&
          LeaveRequestList &&
          LeaveRequestList.length > 0 &&
          LeaveRequestList.map((request) => (
            <div key={request._id}>
              <RequestDetails_04
                request={request}
                showDetails={showRequests}
                onEditAction={handleEditAction}
                onDeleteRequest={handleDeleteRequest}
              />
            </div>
          ))}
      </form>
    </div>
  );
};

export default RequestLeave_04;
