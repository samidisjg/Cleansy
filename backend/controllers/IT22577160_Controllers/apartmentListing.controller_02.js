import ApartmentListing from "../../models/IT22577160_Models/apartmentListing.model_02.js";

export const createListing = async (req, res, next) => {
   try {
      const newApartmentListing = await  ApartmentListing.create(req.body);
      return res.status(201).json(newApartmentListing);
   } catch (error) {
      next(error);
   }
}