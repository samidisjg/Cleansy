import express from "express";
import dotenv from "dotenv";
import dbConnection from "./dbConfig/dbConnection.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import apartmentListingRoutes from "./routes/IT22577160_Routes/apartmentListing.route_02.js";
import RequestLeaveRoutes from './routes/IT22603418_Routes/RequestLeave.route_04.js';
import cookieParser from "cookie-parser";
//import serviceListingRoutes from "./routes/IT22350114_Routes/serviceListingRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

dbConnection();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// IT22577160 Routes
app.use("/api/apartmentListing", apartmentListingRoutes);
// IT22603418 Routes
app.use("/api/RequestLeave", RequestLeaveRoutes);

// IT22350114 Routes
//app.use("/api/serviceListing", serviceListingRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
