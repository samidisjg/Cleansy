import express from "express";
import { createServiceListing } from "../../controllers/IT22350114_Controllers/serviceListingController.js";
import { getAllServiceListings } from "../../controllers/IT22350114_Controllers/serviceListingController.js";
import { updateServiceListing } from "../../controllers/IT22350114_Controllers/serviceListingController.js";
import { deleteServiceListing } from "../../controllers/IT22350114_Controllers/serviceListingController.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

// Create a new service listing
router.post("/create", verifyToken, createServiceListing);

// Read for all service listings
router.get("/read", verifyToken, getAllServiceListings);

// Update a service listing
router.put("/update/id", verifyToken, updateServiceListing);

// Delete a service listing
router.delete("/delete/id", verifyToken, deleteServiceListing);

//update a service


export default router;
