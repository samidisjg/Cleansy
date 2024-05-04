import mongoose from "mongoose";

const ServiceListingSchema = new mongoose.Schema(
  {
    serviceID: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceDescription: {
      type: String,
      required: true,
    },
    servicePrice: {
      type: Number,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    serviceAvailability: {
      type: String,
      required: true,
    },
    servicePhone: {
      type: String,
      required: true,
    },
    serviceEmail: {
      type: String,
      required: true,
    },
    serviceRequirements: {
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

const ServiceListing = mongoose.model("ServiceListing", ServiceListingSchema);
export default ServiceListing;
