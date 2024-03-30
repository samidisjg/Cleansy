import SharedResourcesListing from "../../models/IT22577160_Models/sharedResourcesListing.model_02.js";
import { errorHandler } from "../../utils/error.js"

// Create a new shared Resource listing
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

// Get all shared resources
export const getSharedResources = async (req, res, next) => {
   try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const resources = await SharedResourcesListing.find({
         ...(req.query.userId && { userId: req.query.userId }),
         ...(req.query.category && { category: req.query.category }),
         ...(req.query.slug && { slug: req.query.slug }),
         ...(req.query.quantity && { quantity: req.query.quantity }),
         ...(req.query.type && { type: req.query.type }),
         ...(req.query.resourceId && { _id: req.query.resourceId }),
         ...(req.query.searchTerm && {
            $or: [
               { title: { $regex: req.query.searchTerm, $options: "i" } },
               { description: { $regex: req.query.searchTerm, $options: "i" } },
            ],
         }),
      }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

      const totalResources = await SharedResourcesListing.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
         now.getFullYear(),
         now.getMonth() - 1,
         now.getDate()
      );
      const lastMonthResources = await SharedResourcesListing.countDocuments({
         createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({ resources, totalResources, lastMonthResources });
   } catch (error) {
      next(error);  
   }
}