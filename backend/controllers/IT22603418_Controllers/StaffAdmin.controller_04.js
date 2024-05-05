import RequestLeave from "../../models/IT22603418_Models/RequestLeave.model_04.js";
import { errorHandler } from "../../utils/error.js";

// Controller function to get all leave requests
export const getAllLeaveRequests = async (req, res, next) => {
  try {
    // Fetch all leave requests from the database
    const allLeaveRequests = await RequestLeave.find();

    // Check if any leave requests were found
    if (!allLeaveRequests || allLeaveRequests.length === 0) {
      return next(errorHandler(404, "No leave requests found"));
    }

    // If leave requests are found, return them
    return res.status(200).json(allLeaveRequests);
  } catch (error) {
    // If an error occurs during the process, pass it to the error handling middleware
    next(error);
  }
};

// Accept Leave Request
export const acceptLeaveRequest = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    // Find the leave request by ID and update its status to "accepted" in the database
    const updatedRequest = await RequestLeave.findByIdAndUpdate(
      requestId,
      { status: "accepted" },
      { new: true }
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }

    // If the request was successfully updated, send a success response
    res.status(200).json({
      success: true,
      message: "Leave request accepted successfully",
      data: updatedRequest,
    });
  } catch (error) {
    // If an error occurs during the update process, send an error response
    console.error("Error accepting leave request:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while accepting leave request",
    });
  }
};

// Deny Leave Request
export const denyLeaveRequest = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    // Find the leave request by ID and update its status to "denied" in the database
    const updatedRequest = await RequestLeave.findByIdAndUpdate(
      requestId,
      { status: "denied" },
      { new: true }
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }

    // If the request was successfully updated, send a success response
    res.status(200).json({
      success: true,
      message: "Leave request denied successfully",
      data: updatedRequest,
    });
  } catch (error) {
    // If an error occurs during the update process, send an error response
    console.error("Error denying leave request:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while denying leave request",
    });
  }
};
