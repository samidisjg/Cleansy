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
