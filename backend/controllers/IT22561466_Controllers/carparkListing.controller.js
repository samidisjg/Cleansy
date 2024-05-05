import carparkListing from "../../models/IT22561466_Models/carparkListing.model.js";

export const createcarparkListing = async (req, res, next) => {
    
    try {
        const newCarparkListing = await carparkListing.create(req.body);

        const savedCarparkListingId = newCarparkListing._id;

        return res.status(201).json({
            success: true,
            message: "Carpark listing created successfully",
            carparkListingId: savedCarparkListingId 
        });
        
    } catch (error) {
        next(error);
    }
};



export const updatecarparkListing = async (req, res, next) => {
    try {
        const { carparkListingId, slotId } = req.body;

        if (!carparkListingId) {
            return res.status(400).json({
                success: false,
                message: "Carpark Listing ID is required for updating.",
            });
        }

        const existingCarparkListing = await carparkListing.findById(carparkListingId);

        if (!existingCarparkListing) {
            return res.status(404).json({
                success: false,
                message: "Carpark Listing not found.",
            });
        }

        existingCarparkListing.slotId = slotId;

        await existingCarparkListing.save();

        return res.status(200).json({
            success: true,
            message: "Carpark listing updated successfully",
            updatedCarparkListing: existingCarparkListing,
        });
    } catch (error) {
        next(error);
    }
};

export const getCarparkListings = async(req, res, next) => {
    try {
        const listing = await carparkListing.findById(req.params.id); 
        if (!listing) {
            return next(errorHandler(404, 'Details not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getAllBooked = async (req, res, next) => {
    try {
        const allCarparkListings = await carparkListing.find();

        const bookedSlots = allCarparkListings.map(listing => listing.slotId);

        return res.status(200).json({
            success: true,
            bookedSlots: bookedSlots
        });
    } catch (error) {
        next(error);
    }
};

export const getAllCarparkListings = async (req, res) => {
    try {
        const allCarparkListings = await carparkListing.find();
        res.status(200).json(allCarparkListings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletecarparkListing = async (req, res, next) => {
    const listing = await carparkListing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404, 'Carpark details not found!'));
    }
    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401,'You can only update your own listings!'));
    }

    try {
        await carparkListing.findByIdAndDelete(req.params.id);
        res.status(200).json('car park details has been deleted!');
    } catch (error) {
        next(error) }
};