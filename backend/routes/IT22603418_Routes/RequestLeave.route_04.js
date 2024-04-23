import express from "express";
import {
  createRequestLeave,
  getRequestLeave,
  updateRequestLeave,
  deleteRequestLeave,
  getRequestCount,
} from "../../controllers/IT22603418_Controllers/RequestLeave.controller_04.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();
//Create Leave Request
router.post("/create_04", verifyToken, createRequestLeave);

//View Leave Requests
router.get("/get_04/:staffID", verifyToken, getRequestLeave);

//Update Leave Request
router.put("/update_04/:_id", verifyToken, updateRequestLeave);

//Delete Leave Request
router.delete("/delete_04/:_id", verifyToken, deleteRequestLeave);

//get User Request Count
router.get("/count_04/:staffID", verifyToken, getRequestCount);

export default router;
