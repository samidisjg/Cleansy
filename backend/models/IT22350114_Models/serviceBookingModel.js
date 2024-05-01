import mongoose from "mongoose";

const ServiceBookingSchema = new mongoose.Schema(
  {
    serviceID: {
      type: String,
      required: true,
    },
    serviceBookingID: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    residentName: {
      type: String,
      required: true,
    },
    residentPhone: {
      type: String,
      required: true,
    },
    residentEmail: {
      type: String,
      required: true,
    },
    residentNIC: {
      type: String,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const ServiceBooking = mongoose.model("ServiceBooking", ServiceBookingSchema);
export default ServiceBooking;
