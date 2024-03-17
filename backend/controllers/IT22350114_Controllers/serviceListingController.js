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

//Read for all service listings
export const getAllServiceListings = async (req, res, next) => {
  try {
    const serviceListings = await ServiceListing.find();
    return res.status(200).json({
      success: true,
      message: "Service listings retrieved successfully",
      serviceListings,
    });
  } catch (error) {
    next(error);
  }
};

//Update a service listing
export const updateServiceListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedServiceListing = await ServiceListing.findByIdAndUpdate(
      id,
      req.body,
      { new: true, upsert: true }
    );
    return res.status(200).json(updateServiceListing);
  } catch (error) {
    next(error);
  }
};

//Delete a service listing
export const deleteServiceListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ServiceListing.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Service listing deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
