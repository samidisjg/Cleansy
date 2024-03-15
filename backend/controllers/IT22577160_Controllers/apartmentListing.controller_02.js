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

// delete apartment listing
export const deleteListing = async (req, res, next) => {
   const listing = await ApartmentListing.findById(req.params.id);

   if(!listing) {
      return next(errorHandler(404, 'Apartment Listing not found'));
   }

   if(req.user.id !== listing.userRef){
      return next(errorHandler(401, 'You can only delete your own Apartment listings!'));
   }

   try {
      await ApartmentListing.findByIdAndDelete(req.params.id);
      res.status(200).json("Apartment Listing Deleted Successfully");
   } catch (error) {
      next(error);
   }
}