import StaffAdmin from './../../models/IT22603418_Models/StaffAdmin.model_04.js';

// Create Leave Request
export const createLeaveRequest = async (req, res) => {
    try {
        const { staffID, leaveType, startDate, endDate } = req.body;

        // Calculate the difference in days between startDate and endDate
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
        const diffInDays = Math.ceil(diffTime / oneDay) + 1; // Add 1 to include both start and end dates

        if (diffInDays <= 0) {
            return res.status(400).json({ success: false, message: "End date should be after start date" });
        }


        const newLeaveRequest = new StaffAdmin({
            staffID: staffID,
            reqType: leaveType, // Assigning leaveType directly from the request body
            duration: diffInDays.toString(),
            status: 'pending',
        });

        await newLeaveRequest.save();

        res.status(201).json({ success: true, message: "Leave request sent to admin successfully", data: newLeaveRequest });
    } catch (error) {
        console.error('Error creating leave request:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



// Accept Leave Request
export const acceptLeaveRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const leaveRequest = await StaffAdmin.findById(requestId);

        // Update leave balance and status
        // Implement your logic to update leave balance and status here

        // Update status to "accepted"
        leaveRequest.status = "accepted";
        await leaveRequest.save();

        res.status(200).json({ success: true, message: "Leave request accepted successfully", data: leaveRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Deny Leave Request
export const denyLeaveRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const leaveRequest = await StaffAdmin.findById(requestId);

        // Update status to "denied"
        leaveRequest.status = "denied";
        await leaveRequest.save();

        res.status(200).json({ success: true, message: "Leave request denied successfully", data: leaveRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
