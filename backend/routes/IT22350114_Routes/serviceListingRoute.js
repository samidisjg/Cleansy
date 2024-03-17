import express from "express";
import { createServiceListing } from "../../controllers/IT22350114_Controllers/serviceListingController.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createServiceListing);

export default router;
