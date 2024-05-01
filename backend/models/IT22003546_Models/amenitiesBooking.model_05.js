import mongoose from "mongoose";

const AmenitiesBookingSchema = new mongoose.Schema({

    bookingID: {
        type: String,
        required: true
    },
    amenityId: {
        type: String,
        required: true
    },
    amenityTitle: {
        type: String,
        required: true
    },
    residentUsername: {
        type: String,
        required: true
    },
    residentName: {
        type: String,
        required: true
    },
    residentEmail: {
        type: String,
        required: true
    },
    residentContact: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    specialRequests: { 
        type: String,
        required: false
    },
    duration: {
        type: Number,
        required: true
    },
    bookingStatus: {
        type: String,
        required: true
    },
    bookingPrice: {
        type: String,
        required: true
    },
    imageUrls: {
        type: Array,
        required: true
    }

}, {timestamps: true});

const AmenitiesBooking = mongoose.model('AmenitiesBooking', AmenitiesBookingSchema);
export default AmenitiesBooking;