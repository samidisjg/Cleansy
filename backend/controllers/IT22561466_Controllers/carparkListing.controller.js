import carparkListing from "../../models/IT22561466_Models/carparkListing.model.js";

export const createcarparkListing = async ( req, res, next) => {
    
    try {
        const newCarparkListing = await carparkListing.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Carpark listing created successfully",
        });
    } catch (error) {
        next(error);
    }
};