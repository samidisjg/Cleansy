import ApartmentListing from "../../models/IT22577160_Models/apartmentListing.model_02.js";
import User from "../../models/user.model.js";
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

// update apartment listing
export const updateListing = async (req, res, next) => {
   const listing = await ApartmentListing.findById(req.params.id);

   if(!listing) {
      return next(errorHandler(404, 'Apartment Listing not found'));
   }

   if(req.user.id !== listing.userRef){
      return next(errorHandler(401, 'You can only delete your own Apartment listings!'));
   }

   try {
      const updatedListing = await ApartmentListing.findByIdAndUpdate(
         req.params.id,
         req.body,
         {new: true}
      )
      res.status(200).json(updatedListing);
   } catch (error) {
      next(error);
   }
};

// get apartment listings for update
export const getListing = async (req, res, next) => {
   try {
      const listing = await ApartmentListing.findById(req.params.id);

      if(!listing) {
         return next(errorHandler(404, 'Apartment Listing not found'));
      }
      res.status(200).json(listing);
   } catch (error) {
      next(error);
   }
}

// get all apartment listings
export const getApartmentListings = async (req, res, next) => {
   try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;

      if(offer === undefined || offer === 'false') {
         offer = { $in: [false, true] };
      }

      let furnished = req.query.furnished;

      if(furnished === undefined || furnished === 'false') {
         furnished = { $in: [false, true] };
      }

      let parking = req.query.parking;

      if(parking === undefined || parking === 'false') {
         parking = { $in: [false, true] };
      }

      let type = req.query.type;

      if(type === undefined || type === 'all') {
         type = { $in: ['sale', 'rent'] };
      }

      const searchTerm = req.query.searchTerm || '';
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order || 'desc';

      const listings = await ApartmentListing.find({
         ...(req.query.searchTerm && {
            $or: [
               { ownerName: { $regex: req.query.searchTerm, $options: 'i' } },
               { description: { $regex: req.query.searchTerm, $options: 'i' }}
            ]
         }),
         // ownerName: { $regex: req.query.searchTerm, $options: 'i' },
         // description: { $regex: req.query.searchTerm, $options: 'i' },
         offer,
         furnished,
         parking,
         type
      }).sort({ [sort]: order }).limit(limit).skip(startIndex);

      return res.status(200).json(listings);
   } catch (error) {
      next(error);
   }
}