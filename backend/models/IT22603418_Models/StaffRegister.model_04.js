import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
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
  nic: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending review", "approved", "rejected"],
    default: "pending review",
  },
});

const Staff = mongoose.model("StaffRegister", staffSchema);

module.exports = StaffRegister;
