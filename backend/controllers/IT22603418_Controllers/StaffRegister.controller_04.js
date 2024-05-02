import StaffRegister from "../../models/IT22603418_Models/StaffRegister.model_04.js";
import { errorHandler } from "../../utils/error.js";

// Controller to handle staff registration
export const registerStaff = async (req, res, next) => {
  try {
    // Extract data from the request body
    const { staffID, staffName, email, phoneNo, nic, imageURL, status } =
      req.body;

    // Validate if all required fields are present
    if (!staffID || !staffName || !email || !phoneNo || !nic || !imageURL) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Create a new staff registration entry
    const newStaff = await StaffRegister.create({
      staffID,
      staffName,
      email,
      phoneNo,
      nic,
      imageURL,
      status: status || "pending review", // Use default value if status is not provided
    });

    return res.status(201).json(newStaff);
  } catch (error) {
    console.error("Error registering staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
