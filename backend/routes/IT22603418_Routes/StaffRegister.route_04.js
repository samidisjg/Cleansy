import express from "express";
import {
  registerStaff,
  getAllStaffRegisterRequests,
  acceptStaffRegisterRequest,
  denyStaffRegisterRequest,
} from "../../controllers/IT22603418_Controllers/StaffRegister.controller_04.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();
//Create Register
router.post("/register", verifyToken, registerStaff);

//Get All Staff Register
router.get("/getAll", verifyToken, getAllStaffRegisterRequests);

// Route to accept a leave request
router.put("/:requestId/approve", acceptStaffRegisterRequest);

// Route to deny a leave request
router.put("/:requestId/reject", denyStaffRegisterRequest);

export default router;
