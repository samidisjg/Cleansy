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
    const allServiceListings = await ServiceListing.find();
    if (!allServiceListings) {
      return res.status(404).json({ message: "Service listings not found" });
    }
    return res.status(200).json(allServiceListings);
  } catch (error) {
    next(error);
  }
};

//Fetch a specific service listing
export const getServiceListing = async (req, res, next) => {
  try {
    const { Serviceid } = req.params;
    const serviceListing = await ServiceListing.findById(Serviceid);
    if (!serviceListing) {
      return res.status(404).json({ message: "Service listing not found" });
    }
    return res.status(200).json(serviceListing);
  }
  catch (error) {
    next(error);
  }
};

//Update a service listing
export const updateServiceListing = async (req, res, next) => {
  try {
    const { Serviceid } = req.params;
    const updateServiceListing = await ServiceListing.findByIdAndUpdate(
      Serviceid,
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
    const { Serviceid } = req.params;
    await ServiceListing.findByIdAndDelete(Serviceid);
    return res.status(200).json({
      success: true,
      message: "Service listing deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
