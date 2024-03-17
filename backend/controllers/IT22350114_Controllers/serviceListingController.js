import ServiceListing from "../../models/IT22350114_Models/serviceListingModel.js";

export const createServiceListing = async (req, res, next) => {
  try {
    // Create a new service listing using the data from the request body
    const newServiceListing = await ServiceListing.create(req.body);

    // Send a success response with the newly created service listing
    return res.status(201).json({
      success: true,
      message: "Service listing created successfully",
      serviceListing: newServiceListing,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};
