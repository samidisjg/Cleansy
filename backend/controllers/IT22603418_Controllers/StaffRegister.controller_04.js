import StaffRegister from "../../models/IT22603418_Models/StaffRegister.model_04.js";
import { errorHandler } from "../../utils/error.js";

// Controller to handle staff registration
export const registerStaff = async (req, res, next) => {
  try {
    // Create a new staff registration entry
    const newStaff = await StaffRegister.create(req.body);
    return res.status(201).json(newStaff);
  } catch (error) {
    console.error("Error registering staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
