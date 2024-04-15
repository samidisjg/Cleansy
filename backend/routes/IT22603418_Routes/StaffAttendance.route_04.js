import express from "express";
import {
  createAttendance,
  updateAttendance,
  getAllAttendance,
} from "../../controllers/IT22603418_Controllers/StaffAttendance.controller_04.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();
// Route to create a new attendance record
router.post("/attendance", verifyToken, createAttendance);

// Route to update attendance record with logout time
router.put("/attendance/:id", verifyToken, updateAttendance);

// Route to get all attendance records
router.get("/getAttendance/:staffID", verifyToken, getAllAttendance);

export default router;
