import ApartmentListing from "../../models/IT22577160_Models/apartmentListing.model_02.js";
import { errorHandler } from "../../utils/error.js";

// create apartment listing
export const createListing = async (req, res, next) => {
   try {
      const newApartmentListing = await  ApartmentListing.create(req.body);
      return res.status(201).json(newApartmentListing);
   } catch (error) {
      next(error);
   }
}

// get apartment listing
export const getApartmentListing = async (req, res, next) => {
   if(req.user.id === req.params.id){
      try {
         const listing = await ApartmentListing.find({userRef: req.params.id});
         res.status(200).json(listing);
      } catch (error) {
         next(error);
      }
   } else {
      return next(errorHandler(401, "You can only view your own account"));
   }
}