import AmenitiesListing from "../../models/IT22003546_Models/amenitiesListing.model.js";

//Create Amenity Listing
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

//Get All Amenity Listings
export const getAmenityListings = async (req, res, next) => {
    try {
        const allAmenitiesListings = await AmenitiesListing.find();
        if (!allAmenitiesListings) {
            return res.status(404).json({ message: "Amenity Listings not found" });
        }
        return res.status(200).json(allAmenitiesListings);
    } catch (error) {
        next(error);
    }
}

//Get Amenity Listing by ID
export const getAmenityListingById = async (req, res, next) => {
    try {
        const { Amenityid } = req.params;
        const amenityListing = await AmenitiesListing.findById(Amenityid);
        if (!amenityListing) { 
            return res.status(404).json({ message: "Amenity Listing not found" });
        }
        return res.status(200).json(amenityListing);
    } catch (error) {
        next(error);
    }
}


//update amenity listing - Facility Admin
export const updateAmenityListing = async (req, res, next) => {
    try {
        const { Amenityid } = req.params;
        const updateAmenityListing = await AmenitiesListing.findByIdAndUpdate(Amenityid, req.body, { new: true, upsert: true });
        return res.status(200).json(updateAmenityListing);
    }
    catch (error) {
        next(error);
    }
}

//delete amenity listing - Facility Admin
export const deleteAmenityListing = async (req, res, next) => {
    try {
        const { Amenityid } = req.params;
        await AmenitiesListing.findByIdAndDelete(Amenityid);
        return res.status(200).json({ message: "Amenity Listing deleted successfully" });
    }
    catch (error) {
        next(error);
    }
}
