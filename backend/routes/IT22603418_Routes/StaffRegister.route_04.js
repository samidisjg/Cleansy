import express from "express";
import { registerStaff } from "../../controllers/IT22603418_Controllers/StaffRegister.controller_04.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();
//Create Register
router.post("/register", verifyToken, registerStaff);


export default router;
