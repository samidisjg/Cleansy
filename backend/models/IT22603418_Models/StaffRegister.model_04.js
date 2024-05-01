import mongoose from "mongoose";

const StaffRegisterSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending review", "approved", "rejected"],
    default: "pending review",
  },
});

const StaffRegister = mongoose.model("StaffRegister", StaffRegisterSchema);

module.exports = StaffRegister;
