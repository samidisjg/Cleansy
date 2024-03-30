import e from "express";
import mongoose from "mongoose";

const SharedResourcesListingSchema = new mongoose.Schema({
   userId: {
      type: String,
      required: true
   },
   title: {
      type: String,
      required: true,
      unique: true
   },
   category: {
      type: String,
      default: 'Uncategorized'
   },
   image: {
      type: String,
      default: 'https://media.istockphoto.com/id/1196974664/photo/set-of-home-kitchen-appliances-in-the-room-on-the-wall-background.jpg?s=612x612&w=0&k=20&c=dUSAMg-LUh6j-4437kz30w8k7KgJiR8yrTTXhGiFh0s='
   },
   quantity: {
      type: Number,
      required: true
   },
   condition: {
      type: Number,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   type: {
      type: String,
      required: true,
   },
   offer: {
      type: Boolean,
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
   slug: {
      type: String,
      required: true,
      unique: true
   },
}, {timestamps:true});

const SharedResourcesListing = mongoose.model('SharedResourcesListing', SharedResourcesListingSchema);
export default SharedResourcesListing;