import mongoose from "mongoose";

const ApartmentListingSchema = new mongoose.Schema({
   ownerName: {
      type: String,
      required: true,
   },
   ownerContactNumber: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   blockNumber: {
      type: String,
      required: true,
   },
   regularPrice: {
      type: Number,
      required: true,
   },
   discountPrice: {
      type: Number,
      required: true,
   },
   bathrooms: {
      type: Number,
      required: true,
   },
   bedrooms: {
      type: Number,
      required: true,
   },
   furnished: {
      type: Boolean,
      required: true,
   },
   parking: {
      type: Boolean,
      required: true,
   },
   type: {
      type: String,
      required: true,
   },
   offer: {
      type: Boolean,
      required: true,
   },
   imageUrls: {
      type: Array,
      required: true,
   },
   userRef: {
      type: String,
      required: true,
   },
}, {timestamps:true});

const ApartmentListing = mongoose.model('ApartmentListing', ApartmentListingSchema);
export default ApartmentListing;