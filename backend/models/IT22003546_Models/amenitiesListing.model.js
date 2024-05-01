import mongoose from 'mongoose';

const AmenitiesListingSchema = new mongoose.Schema({

    amenityID: {
        type: String,
        required: true,
        unique: true
    },

    amenityTitle: {
        type: String,
        required: true
    },
    amenityDescription: {
        type: String,
        required: true
    },
    imageURLs: {
        type: Array,
        required: true
    },
    amenityLocation: {
        type: String,
        required: true
    },
    amenityCapacity: {
        type: Number,
        required: true
    },
    amenityAvailableTimes: {
        type: String,
        required: true
    },
    amenityPrice: {
        type: Number,
        required: true
    },
    amenityStatus: {
        type: String,
        required: true
    },
    
    
}, {timestamps: true});

const AmenitiesListing = mongoose.model('AmenitiesListing', AmenitiesListingSchema);
export default AmenitiesListing;
    