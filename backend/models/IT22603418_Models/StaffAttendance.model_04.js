import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
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
      required: true,
      default: () => new Date().toISOString(), // Convert local date and time to UTC string
    },
    logoutTime: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.loginTime = new Date(ret.loginTime).toLocaleString(); // Convert login time to local time string
        return ret;
      },
    },
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
