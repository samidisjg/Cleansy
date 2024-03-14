import React, { useState } from 'react'; // Import useState from React
import { useSelector } from "react-redux";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react"

const RequestLeave_04 = () => {
    const { currentUser } = useSelector((state) => state.user);

    // Define DateAndTimeForm component inside DashStaff_04
    const DateAndTimeForm = () => {
        const [selectedOption, setSelectedOption] = useState('date'); // Initialize state for selected option

        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value); // Update selected option based on radio button change
        };

        return (
            <div>
                {currentUser.isStaffAdmin && (
                    <div className="max-w-lg mx-auto p-3 w-full">
                        <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">Leave Request Form</h1>
                        <form className="flex flex-col gap-4">
                            <div >
                                <Label value="Staff Name" />
                                <TextInput type="text" placeholder="Staff Name" required />
                            </div>
                            <div>
                                <Label value="Staff ID" />
                                <TextInput type="text" placeholder="Staff ID" required />
                            </div>
                            <div>
                                <Label value="Email" />
                                <TextInput type="email" placeholder="example@gmail.com" required />
                            </div>
                            <div>
                                <Label value="Phone No" />
                                <TextInput type="text" placeholder="Phone No" required />
                            </div>
                            <div>
                                <h2 className="text-2xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">Details of Leave</h2>
                            </div>
                            <div>
                                <Label value="Leave Type" />
                                <Select required>
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
                                            <TextInput type="date" required />
                                        </div>
                                        <div>
                                            <Label value="End Date" />
                                            <TextInput type="date" required />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex gap-44">
                                        <div>
                                            <Label value="Start Time" />
                                            <TextInput type="time" required />
                                        </div>
                                        <div>
                                            <Label value="End Time" />
                                            <TextInput type="time" required />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div>
                                <Label value="Comments" />
                                <Textarea placeholder='Type here...' rows='3' maxLength='200' />
                            </div>

                            <Button type="submit" gradientDuoTone='purpleToBlue' >
                                Requet Leave
                            </Button>
                        </form>

                    </div>
                )}
            </div>
        );
    };

    return <DateAndTimeForm />; // Render the DateAndTimeForm component
};

export default RequestLeave_04;
