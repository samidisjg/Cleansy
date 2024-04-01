import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { Navigate } from "react-router-dom";


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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.staffName || !formData.email || !formData.phoneNo || !formData.leaveType) {
            return setErrorMessage('Please fill out all the fields');
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

    const handleViewRequests = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch(`/api/RequestLeave/get_04/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setErrorMessage(data.message);
            }
            if (res.status === 200) {
                //  Navigate
                // Successful response
                toast.success("Requests loaded successfully.");
            } else if (res.status === 404) {
                toast.error("No request leave entries found for this staffID");
            } else {
                // Other error
                toast.error("An error occurred while loading requests.");
            }
        } catch (error) {
            // Network or other error
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

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
                                        <TextInput type="date" id="startDate" required onChange={handleChange} value={startDate} />
                                    </div>
                                    <div>
                                        <Label value="End Date" />
                                        <TextInput type="date" id="endDate" required onChange={handleChange} value={endDate} />
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
                        <Button type="button" gradientDuoTone='purpleToBlue' onClick={handleViewRequests}>
                            View Requests
                        </Button>

                        {ShowRequestError &&
                            <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">{errorMessageText}</Alert>}
                        {/* {LeaveRequestList && LeaveRequestList.length > 0 &&
                            LeaveRequestList.map((requestLeave) => (
                                <div key={requestLeave._id} className="">
                                    <link to={`RequestLeave/get_04/${currentUser._id}`}>
                                    6.53
                                    </link>
                                </div>
                            ))
                        } */}
                    </form>
                </div>
            )}
        </div>
    );
};

export default RequestLeave_04;
