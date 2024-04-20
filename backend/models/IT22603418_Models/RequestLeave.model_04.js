import mongoose from "mongoose";

const RequestLeaveSchema = new mongoose.Schema(
  {
    staffID: {
      type: String,
      required: true,
    },
    staffName: {
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
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    comments: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const RequestLeave = mongoose.model("RequestLeave", RequestLeaveSchema);
export default RequestLeave;
