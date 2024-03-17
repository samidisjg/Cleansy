import AmenitiesListing from "../../models/IT22003546_Models/amenitiesListing.model.js";

export const createAmenityListing = async (req, res, next) => {
    try {
        const newAmenitiesListing = await AmenitiesListing.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Amenity Listing created successfully",
            amenitiesListing: newAmenitiesListing
        });
    } catch (error) {
        next(error);
    }
}
export const getAmenityListings = async (req, res, next) => {
    try {
        const allAmenitiesListings = await AmenitiesListing.find();
        return res.status(200).json(allAmenitiesListings);
    } catch (error) {
        next(error);
    }
}

export const updateAmenityListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateAmenityListing = await AmenitiesListing.findByIdAndUpdate(id, req.body, { new: true, upsert: true });
        return res.status(200).json(updateAmenityListing);
    }
    catch (error) {
        next(error);
    }
}


export const deleteAmenityListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        await AmenitiesListing.findByIdAndDelete(id);
        return res.status(200).json({ message: "Amenity Listing deleted successfully" });
    }
    catch (error) {
        next(error);
    }
}
