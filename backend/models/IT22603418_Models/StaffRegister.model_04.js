import mongoose from "mongoose";

const StaffRegisterSchema = new mongoose.Schema({
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
  nic: {
    type: String,
    required: true,
  },
  imageURL: {
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

export default StaffRegister;
