import visitorListing from "../../models/IT22561466_Models/visitorListing.model.js";

export const createvisitorListing = async ( req, res, next) => {
    
    try {
        const newVisitorListing = await visitorListing.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Visitor listing created successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Function to get all visitor listings
export const getAllVisitorListings = async (req, res) => {
    try {
        const allVisitorListings = await visitorListing.find();
        res.status(200).json(allVisitorListings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getvisitors = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || '';
        const visitors = await visitorListing.find({ guestName: { $regex: searchTerm, $options: 'i' } }).skip(startIndex);
        return res.status(200).json(visitors);
    } catch (error) {
        next(error);
    }
};

