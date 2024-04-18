import mongoose from "mongoose";

const StaffAdminSchema = new mongoose.Schema({
    staffID: {
        type: String,
        required: true,
    },
    reqType: {
        type: String,
    },
    duration: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "denied"], // Define possible values for the status
        default: "pending", // Set default status to "pending"
        required: true,
    },
}, { timestamps: true });

const StaffAdmin = mongoose.model('StaffAdmin', StaffAdminSchema);
export default StaffAdmin;