import mongoose from "mongoose";

const visitorListingSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },
    guestName: {
      type: String,
      required: true,
    },
    telNo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const visitorListing = mongoose.model("visitorListing", visitorListingSchema);

export default visitorListing;
