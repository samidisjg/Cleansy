import SharedResourcesListing from "../../models/IT22577160_Models/sharedResourcesListing.model_02.js";
import { errorHandler } from "../../utils/error.js"

export const createListing = async (req, res, next) => {
   if(!req.user.isPropertyAdmin) {
      return next(errorHandler(403, "You are not authorized to create a listing"))
   }
   if(!req.body.title || !req.body.description) {
      return next(errorHandler(400, "Please Provide all the required fields"))
   }
   const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");

   const newListing = new SharedResourcesListing({
      ...req.body,
      slug,
      userId: req.user.id
   });
   try {
      const savedListing = await newListing.save();
      res.status(201).json(savedListing);
   } catch (error) {
      next(error);
   }
}