import mongoose from "mongoose";

const RequestLeaveSchema = new mongoose.Schema({
    staffName: {
        type: String,
        required: true,
    },
    staffID: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    leaveType: {
        type: String,
        required: true,
    },
    leaveRequestFor: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const RequestLeave = mongoose.model('RequestLeave', RequestLeaveSchema);
export default RequestLeave;