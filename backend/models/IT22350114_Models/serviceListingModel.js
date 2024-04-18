import mongoose from "mongoose";

const ServiceListingSchema = new mongoose.Schema(
  {
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
    serviceImageUrls: {
      type: Array,
      required: true,
    },
    serviceAvailability: {
      type: Boolean,
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
    imageUrls: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const ServiceListing = mongoose.model("ServiceListing", ServiceListingSchema);
export default ServiceListing;
