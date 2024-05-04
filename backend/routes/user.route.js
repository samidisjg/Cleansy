import express from "express";
import {
  deleteUser,
  getUserDetails,
  getUsers,
  signout,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getVisitorListings } from "../controllers/IT22561466_Controllers/visitorListing.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserDetails);
router.get("/visitorListings/:id", verifyToken, getVisitorListings);

export default router;
