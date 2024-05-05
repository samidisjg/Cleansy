import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import {
  getAllLeaveRequests,
  acceptLeaveRequest,
  denyLeaveRequest,
} from "./../../controllers/IT22603418_Controllers/StaffAdmin.controller_04.js";

const router = express.Router();

//View All Leave Requests
router.get("/get_04", verifyToken, getAllLeaveRequests);

// Route to accept a leave request
router.put("/:requestId/accept", acceptLeaveRequest);

// Route to deny a leave request
router.put("/:requestId/deny", denyLeaveRequest);

export default router;
