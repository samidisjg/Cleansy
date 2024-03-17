import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import RequestDetails_04 from './RequestDetails_04';


const RequestLeave_04 = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        staffName: '',
        email: '',
        phoneNo: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        comments: '',
    });
    const { staffName, email, phoneNo, leaveType, startDate, endDate, startTime, endTime, comments } = formData;
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ShowRequestError, setShowRequestError] = useState(false);
    const [selectedOption, setSelectedOption] = useState('date'); // Initialize state for selected option
    const [LeaveRequestList, setLeaveRequestList] = useState([]);
    const [showRequests, setShowRequests] = useState(false); // State variable to track visibility of requests
    //validation for date pick
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        // If start date is being changed, update the minimum value for the end date
        if (id === 'startDate') {
            setFormData({
                ...formData,
                [id]: value,
                endDate: value // Reset end date to start date if end date is prior to start date
            });
        }
        // Check form validity after each change
        validateForm();
    };
    //date and time option change in request form
    const handleOptionChange = (event) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        if (selected === 'date') {
            setFormData({
                ...formData,
            });
        } else {
            const today = new Date();
            const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

            setFormData({
                ...formData,
                startDate: formattedDate,
                endDate: formattedDate,
                startTime: '',
                endTime: ''
            });
        }

    };
    //request leave form validation
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form Fields validation
        if (!formData.staffName || !formData.email || !formData.phoneNo || !formData.leaveType) {
            toast.error('Please fill out all the fields');
            return;
        }
        // Phone number validation
        if (formData.phoneNo.length !== 10 || isNaN(formData.phoneNo)) {
            toast.error('Phone number should have 10 digits');
            return;
        }
        try {

            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/RequestLeave/create_04', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    staffID: `${currentUser._id}`,
                    ...formData,
                })
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setErrorMessage(data.message);
            }
            if (res.status === 201) {
                toast.success("Leave Request Created Successfully");
            }

        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
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
                toast.success("Requests loaded successfully.");
            } else if (res.status === 404) {
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
        const confirmDelete = window.confirm("Are you sure you want to delete this request?");
        if (!confirmDelete) {
            return; // If user cancels deletion, exit function
        }
    
        try {
            const res = await fetch(`/api/RequestLeave/delete_04/${requestId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                // Remove the deleted request from the list
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
        <div>
            {currentUser.isStaffAdmin && (
                <div className="max-w-lg mx-auto p-3 w-full">
                    <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">Leave Request Form</h1>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Label value="Staff Name" />
                            <TextInput type="text" id="staffName" placeholder="Staff Name" value={staffName} required onChange={handleChange} />
                        </div>
                        <div>
                            <Label value="Email" />
                            <TextInput type="email" id="email" placeholder="example@gmail.com" required onChange={handleChange} value={email} />
                        </div>
                        <div>
                            <Label value="Phone No" />
                            <TextInput type="text" id="phoneNo" placeholder="Phone No" required onChange={handleChange} value={phoneNo} />
                        </div>
                        <div>
                            <h2 className="text-2xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">Details of Leave</h2>
                        </div>
                        <div>
                            <Label value="Leave Type" />
                            <Select id="leaveType" required onChange={handleChange} value={leaveType}>
                                <option value="">Select</option>
                                <option value="Sick">Sick</option>
                                <option value="Vacation">Vacation</option>
                                <option value="ShortLeave">Short Leave</option>
                                <option value="Other">Other</option>
                            </Select>
                        </div>

                        <div className="flex gap-28">
                            <div><Label value="Leave Request For" /> </div>
                            <div>
                                <Label value="Days" />
                                <TextInput
                                    type="radio"
                                    id="dateOption"
                                    value="date"
                                    checked={selectedOption === 'date'}
                                    onChange={handleOptionChange}
                                    required />
                            </div>
                            <div>
                                <Label value="Hours" />
                                <TextInput
                                    type="radio"
                                    id="timeOption"
                                    value="time"
                                    checked={selectedOption === 'time'}
                                    onChange={handleOptionChange}
                                    required />
                            </div>
                        </div>
                        {selectedOption === 'date' ? (
                            <>
                                <div className="flex gap-32">
                                    <div>
                                        <Label value="Start Date" />
                                        <TextInput type="date" id="startDate" required onChange={handleChange} value={startDate} min={new Date().toISOString().split('T')[0]} />
                                    </div>
                                    <div>
                                        <Label value="End Date" />
                                        <TextInput type="date" id="endDate" required onChange={handleChange} value={endDate} min={startDate} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-44">
                                    <div>
                                        <Label value="Start Time" />
                                        <TextInput type="time" id="startTime" required onChange={handleChange} value={startTime} />
                                    </div>
                                    <div>
                                        <Label value="End Time" />
                                        <TextInput type="time" id="endTime" required onChange={handleChange} value={endTime} />
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <Label value="Comments" />
                            <Textarea id="comments" placeholder='Type here...' rows='3' maxLength='200' onChange={handleChange} value={comments} />
                        </div>

                        <Button type="submit" gradientDuoTone='purpleToBlue' >
                            Request Leave
                        </Button>
                        <Button gradientDuoTone='purpleToBlue' onClick={toggleShowRequests}>
                            {showRequests ? "Hide Requests" : "View Requests"}
                        </Button>

                        {ShowRequestError &&
                            <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">{errorMessageText}</Alert>}
                        {showRequests && LeaveRequestList && LeaveRequestList.length > 0 && LeaveRequestList.map((request) => (
                            <div key={request._id}>
                                <RequestDetails_04 request={request} showDetails={showRequests} onDeleteRequest={handleDeleteRequest}/> {/* Pass down showDetails prop */}
                            </div>
                        ))}
                    </form>
                </div>
            )}
        </div>
    );
};

export default RequestLeave_04;
