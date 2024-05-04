import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  staffID: {
    type: String,
    required: true,
  },
  staffName: {
    type: String,
    required: true,
  },
  loginTime: {
    type: String,
  },
  logoutTime: {
    type: String,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
