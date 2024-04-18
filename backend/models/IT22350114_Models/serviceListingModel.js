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
    serviceContactInfo: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    serviceRequirements: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const ServiceListing = mongoose.model("ServiceListing", ServiceListingSchema);
export default ServiceListing;
