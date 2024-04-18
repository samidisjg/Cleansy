import mongoose from 'mongoose';

const AmenitiesListingSchema = new mongoose.Schema({

    amenityTitle: {
        type: String,
        required: true
    },
    amenityDescription: {
        type: String,
        required: true
    },
    amenityImage: {
        type: String,
        required: true
    },
    amenityPrice: {
        type: Number,
        required: true
    },
    
    
}, {timestamps: true});

const AmenitiesListing = mongoose.model('AmenitiesListing', AmenitiesListingSchema);
export default AmenitiesListing;
    