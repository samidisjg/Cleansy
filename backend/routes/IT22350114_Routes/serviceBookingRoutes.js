import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import {
  createServiceBooking,
  getAllServiceBookings,
  getServiceBookingById,
  updateServiceBooking,
  deleteServiceBooking,
} from "../../controllers/IT22350114_Controllers/serviceBookingContoller.js";

const router = express.Router();

// Create a new service booking
router.post("/create", verifyToken, createServiceBooking);

// Read for all service booking
router.get("/getAll", verifyToken, getAllServiceBookings);

// fetch a specific service booking
router.get("/get/:BookingId", verifyToken, getServiceBookingById);

// Update a service booking
router.put("/update/:BookingId", verifyToken, updateServiceBooking);

// Delete a service booking
router.delete("/delete/:BookingId", verifyToken, deleteServiceBooking);

export default router;
