import RequestLeave from "../../models/IT22603418_Models/RequestLeave.model_04.js";
import { errorHandler } from "../../utils/error.js";

export const createRequestLeave = async (req, res, next) => {
  try {
    // Create a new RequestLeave instance using the model
    const newRequestLeave = await RequestLeave.create(req.body);

    // Send a successful response with the newly created request leave entry
    return res.status(201).json(newRequestLeave);
  } catch (error) {
    // If an error occurs during the process, pass it to the error handling middleware
    next(error);
  }
};

export const getRequestLeave = async (req, res, next) => {
  try {
    // Find the request leave entries based on the staffID
    const requestLeave = await RequestLeave.find({
      staffID: req.params.staffID,
    });

    // Check if any request leave entries were found
    if (!requestLeave || requestLeave.length === 0) {
      return next(
        errorHandler(404, "No request leave entries found for this staffID")
      );
    }

    // Check if the staffID associated with the request leave entry matches the authenticated user's staffID
    if (requestLeave[0].staffID !== req.params.staffID) {
      return next(errorHandler(401, "You can only view your own requests!"));
    }

    // If authorized, return the request leave entries
    return res.status(200).json(requestLeave);
  } catch (error) {
    // If an error occurs during the process, pass it to the error handling middleware
    next(error);
  }
};

//Update Leave Request
export const updateRequestLeave = async (req, res) => {
  const requestId = req.body._id;
  const requestData = req.body; // Updated data sent from the frontend

  try {
    // Find the leave request by ID and update it in the database
    const updatedRequest = await RequestLeave.findByIdAndUpdate(
      requestId,
      requestData,
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
      message: "Leave request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    // If an error occurs during the update process, send an error response
    console.error("Error updating leave request:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating leave request",
    });
  }
};

//Delete Leave Request
export const deleteRequestLeave = async (req, res, next) => {
  try {
    const { _id } = req.params; // Correctly access _id from req.params
    await RequestLeave.findByIdAndDelete(_id);
    return res.status(200).json({
      success: true,
      message: "Leave Request deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to get the count of requests for a specific user
export const getRequestCount = async (req, res) => {
  try {
    // Fetch the count of requests for the specified user from the database
    const requestCount = await RequestLeave.countDocuments({
      staffID: req.params.staffID,
    });

    // Respond with the request count
    res.json({ count: requestCount });
  } catch (error) {
    console.error("Error fetching request count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
